import { useState, useEffect, useCallback, useRef } from "react";
import Button from "@components/Ui/Button";
import { IMAGES } from "@config/assets";
import AxiosInstance from "@config/axios.config";
import { useParams } from "react-router-dom";
import GateHeader from "@components/GateHeader";

type WsStatus = "connecting" | "connected" | "disconnected";

interface Zone {
  id: string;
  name: string;
  categoryId: string;
  totalSlots: number;
  occupied: number;
  open: boolean;
  rateNormal: number;
  rateSpecial: number;
}

interface Ticket {
  id: string;
  zoneId: string;
  gateId: string;
  checkinAt: string;
}

const GatePage = () => {
  const { gateId } = useParams<{ gateId: string }>();
  const [activeTab, setActiveTab] = useState<"visitor" | "subscriber">("visitor");
  const [zones, setZones] = useState<Zone[]>([]);
  const [subscriptionId, setSubscriptionId] = useState<string>("");
  const [subscriptionZones, setSubscriptionZones] = useState<Zone[]>([]);
  const [ticket, setTicket] = useState<Ticket | null>(null);

  const [wsStatus, setWsStatus] = useState<WsStatus>("connecting");
  const wsRef = useRef<WebSocket | null>(null);

  // Fetch all zones for the gate
  const fetchZones = useCallback(async () => {
    try {
      const res = await AxiosInstance.get(`master/zones?gateId=${gateId}`);
      setZones(res.data);
    } catch (err) {
      console.error("Failed to fetch zones:", err);
    }
  }, [gateId]);

  // Fetch subscription zones based on subscriptionId
  const fetchSubscription = useCallback(async () => {
    if (!subscriptionId) return;
    try {
      const res = await AxiosInstance.get(`subscriptions/${subscriptionId}`);
      const subCategory = res.data.category;
      const allowedZones = zones.filter(z => z.categoryId === subCategory && z.open);
      setSubscriptionZones(allowedZones);
    } catch (err) {
      console.error("Failed to fetch subscription:", err);
      setSubscriptionZones([]);
    }
  }, [subscriptionId, zones]);

  // Handle zone check-in
  const handleCheckin = async (zoneId: string) => {
    try {
      const res = await AxiosInstance.post("tickets/checkin", {
        gateId,
        zoneId,
        type: activeTab,
        subscriptionId: activeTab === "subscriber" ? subscriptionId : undefined,
      });
      setTicket(res.data.ticket);
      fetchZones(); // refresh zones after check-in
    } catch (err) {
      console.error("Check-in failed:", err);
    }
  };

  // WebSocket connection
  const connectWs = useCallback(() => {
  setWsStatus("connecting");
  const ws = new WebSocket("ws://localhost:3000/api/v1/ws");
  ws.onopen = () => {
    setWsStatus("connected");
    ws.send(JSON.stringify({ type: "subscribe", payload: { gateId } }));
  };
  ws.onclose = () => setWsStatus("disconnected");
  ws.onerror = () => setWsStatus("disconnected");
  ws.onmessage = evt => {
    const msg = JSON.parse(evt.data);
    if (msg.type === "zone-update" || msg.type === "admin-update") {
      setZones(prev => prev.map(z => (z.id === msg.payload.id ? { ...z, ...msg.payload } : z)));
    }
  };
  wsRef.current = ws;
}, [gateId]); // <- dependency on gateId

useEffect(() => {
  connectWs();
  return () => {
    wsRef.current?.close();
  };
}, [connectWs]);

  // Initialize WS on mount
  useEffect(() => {
    connectWs();
    return () => wsRef.current?.close();
  }, [gateId, connectWs]);

  // Fetch zones on mount
  useEffect(() => {
    fetchZones();
  }, [fetchZones]);

  // Fetch subscription zones whenever subscriptionId changes
  useEffect(() => {
    if (activeTab === "subscriber" && subscriptionId) {
      fetchSubscription();
    }
  }, [subscriptionId, activeTab, fetchSubscription]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="h-16 flex items-center justify-center border-b">
          <img src={IMAGES.Logo} alt="logo" className="w-fit h-[80px]" />
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-200">Dashboard</button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-200">Gates</button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-200">Zones</button>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <GateHeader
          gateId={gateId}
          wsStatus={wsStatus}
          onReconnect={() => {
            wsRef.current?.close();
            connectWs();
          }}
        />

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Tabs */}
          <div className="flex space-x-4 mb-4">
            <Button onClick={() => setActiveTab("visitor")} className={activeTab === "visitor" ? "bg-blue-500 text-white" : ""}>Visitor</Button>
            <Button onClick={() => setActiveTab("subscriber")} className={activeTab === "subscriber" ? "bg-blue-500 text-white" : ""}>Subscriber</Button>
          </div>

          {/* Subscriber input */}
          {activeTab === "subscriber" && (
            <div className="mb-4">
              <input
                type="text"
                value={subscriptionId}
                onChange={e => setSubscriptionId(e.target.value)}
                placeholder="Enter subscription ID"
                className="border p-2 rounded w-full"
              />
            </div>
          )}

          {/* Zones grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(activeTab === "visitor" ? zones : subscriptionZones).map(zone => (
              <div key={zone.id} className="bg-white p-4 rounded shadow flex flex-col">
                <h3 className="text-lg font-semibold">{zone.name}</h3>
                <p>Category: {zone.categoryId}</p>
                <p>Slots: {zone.occupied}/{zone.totalSlots} {zone.open ? "(Open)" : "(Closed)"}</p>
                <p>Rate: ${zone.rateNormal} / ${zone.rateSpecial} special</p>
                <Button
                  onClick={() => handleCheckin(zone.id)}
                  disabled={!zone.open || zone.occupied >= zone.totalSlots}
                  className="mt-2"
                >
                  Check In
                </Button>
              </div>
            ))}
          </div>

          {/* Ticket modal */}
          {ticket && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded shadow w-96">
                <h3 className="text-xl font-semibold mb-2">Ticket Confirmed</h3>
                <p>Ticket ID: {ticket.id}</p>
                <p>Zone: {ticket.zoneId}</p>
                <p>Check-in: {new Date(ticket.checkinAt).toLocaleString()}</p>
                <Button onClick={() => setTicket(null)} className="mt-4">Close</Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default GatePage;
