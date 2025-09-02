import { useEffect, useMemo, useState } from "react";
import AxiosInstance from "@config/axios.config";
import { isAxiosError } from "axios";

type WsStatus = "connecting" | "connected" | "disconnected";

interface Gate {
  id: string;
  name: string;
  location?: string;
  zoneIds: string[];
}

interface GateHeaderProps {
  wsStatus: WsStatus;
  onReconnect?: () => void;
  rightActions?: React.ReactNode;
  gateIdOverride?: string;
  gateId?: string; // add this line
}

/**
 * GateHeader
 * - Reads gateId 
 * - Fetches the gate name for display
 * - Shows WebSocket connection status
 * - Shows a ticking clock (device local time)
 */

const GateHeader =  ({
  wsStatus,
  onReconnect,
  rightActions,
  gateId}: GateHeaderProps) => {

  const [gate, setGate] = useState<Gate | null>(null);
  const [loadingGate, setLoadingGate] = useState<boolean>(true);
  const [gateError, setGateError] = useState<string | null>(null);

  const [now, setNow] = useState<Date>(new Date());

  // Ticking clock
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Fetch gate meta (name/location) from master list and pick this gate
  useEffect(() => {
    let mounted = true;
    const run = async () => {
      if (!gateId) {
        setGateError("Missing gate id");
        setLoadingGate(false);
        return;
      }
      try {
        setLoadingGate(true);
        setGateError(null);
        const res = await AxiosInstance.get("/master/gates");
        const found = (res.data as Gate[]).find((g) => g.id === gateId) ?? null;
        if (!mounted) return;
        if (!found) {
          setGateError(`Gate "${gateId}" not found`);
          setGate(null);
        } else {
          setGate(found);
        }
      } catch (e: unknown) {
  if (!mounted) return;

  if (isAxiosError(e)) {
    // Axios-specific error
    setGateError(e.response?.data?.message || "Failed to load gate");
  } else if (e instanceof Error) {
    // Generic JS error
    setGateError(e.message);
  } else {
    setGateError("Failed to load gate");
  }

  setGate(null);
} finally {
        if (mounted) setLoadingGate(false);
      }
    };
    run();
    return () => {
      mounted = false;
    };
  }, [gateId]);

  const wsColor = useMemo(() => {
    switch (wsStatus) {
      case "connected":
        return "bg-green-500";
      case "connecting":
        return "bg-yellow-500";
      default:
        return "bg-red-500";
    }
  }, [wsStatus]);

  const wsLabel = useMemo(() => {
    switch (wsStatus) {
      case "connected":
        return "Connected";
      case "connecting":
        return "Connecting…";
      default:
        return "Disconnected";
    }
  }, [wsStatus]);

  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-4 md:px-6">
      {/* Left: Gate info */}
      <h2 className="text-2xl font-semibold">Gate: {gateId}</h2>
      <div className="flex items-center gap-4 min-w-0">
        <div className={`w-2.5 h-2.5 rounded-full ${wsColor}`} aria-hidden />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-lg md:text-xl font-semibold truncate">
              {loadingGate
                ? "Loading gate…"
                : gate
                ? `${gate.name} (${gate.id})`
                : gateError || "Gate"}
            </h1>
            <span
              className={`text-xs px-2 py-0.5 rounded-full border ${
                wsStatus === "connected"
                  ? "border-green-200 text-green-700"
                  : wsStatus === "connecting"
                  ? "border-yellow-200 text-yellow-700"
                  : "border-red-200 text-red-700"
              }`}
              role="status"
              aria-live="polite"
            >
              {wsLabel}
            </span>
            {wsStatus === "disconnected" && onReconnect && (
              <button
                onClick={onReconnect}
                className="text-xs px-2 py-0.5 rounded border border-gray-300 hover:bg-gray-50"
              >
                Reconnect
              </button>
            )}
          </div>
          {gate?.location && (
            <p className="text-xs text-gray-500">Location: {gate.location}</p>
          )}
        </div>
      </div>

      {/* Right: time + custom actions */}
      <div className="flex items-center gap-3">
        <time
          className="font-mono text-sm md:text-base tabular-nums"
          dateTime={now.toISOString()}
          aria-label="Current time"
          title={now.toLocaleString()}
        >
          {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}{" "}
          | {now.toLocaleDateString()}
        </time>
        {rightActions}
      </div>
    </header>
  );
};

export default GateHeader;
