import { useState } from "react";
import Button from "@components/Ui/Button";
import AxiosInstance from "@config/axios.config";
import { isAxiosError } from "axios";

interface BreakdownItem {
  from: string;
  to: string;
  hours: number;
  rateMode: string;
  rate: number;
  amount: number;
}

interface CheckoutData {
  breakdown: BreakdownItem[];
  durationHours: number;
  amount: number;
}

interface CheckoutPanelProps {
  onClose: () => void;
}


const CheckoutPanel = ({ onClose }: CheckoutPanelProps) => {
  const [ticketId, setTicketId] = useState("");
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (!ticketId) {
      setError("Please enter a ticket ID");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await AxiosInstance.post(`/tickets/checkout`, { ticketId });
      setCheckoutData(res.data);
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        setError(e.response?.data?.message || "Checkout failed");
      } else if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Checkout failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    if (!checkoutData) return;
    const printContent = `
      <div style="font-family:sans-serif; padding:20px; max-width:400px; border:1px solid #ccc;">
        <h2 style="text-align:center;">Ticket Checkout</h2>
        <hr />
        ${checkoutData.breakdown
          .map(
            (item) => `
          <div style="margin-bottom:10px;">
            <p><strong>From:</strong> ${item.from}</p>
            <p><strong>To:</strong> ${item.to}</p>
            <p><strong>Hours:</strong> ${item.hours}</p>
            <p><strong>Rate Mode:</strong> ${item.rateMode}</p>
            <p><strong>Rate:</strong> $${item.rate}</p>
            <p><strong>Amount:</strong> $${item.amount}</p>
          </div>
        `
          )
          .join("")}
        <hr />
        <p><strong>Total Duration:</strong> ${checkoutData.durationHours} hrs</p>
        <p><strong>Total Amount:</strong> $${checkoutData.amount}</p>
      </div>
    `;
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-md mx-auto">
      {!checkoutData ? (
        <>
          <h3 className="text-xl font-semibold mb-4">Checkout Ticket</h3>
          <input
            type="text"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            placeholder="Enter ticket ID"
            className="border p-2 rounded w-full mb-4"
          />
          <Button onClick={handleCheckout} disabled={loading}>
            {loading ? "Checking out..." : "Checkout"}
          </Button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </>
      ) : (
        <>
          <h3 className="text-xl font-semibold mb-4">Ticket Checkout Complete</h3>
          <div className="border p-4 rounded mb-4">
            {checkoutData.breakdown.map((item, idx) => (
              <div key={idx} className="mb-3 border-b pb-2">
                <p>
                  <strong>From:</strong> {item.from} | <strong>To:</strong> {item.to}
                </p>
                <p>
                  <strong>Hours:</strong> {item.hours} | <strong>Rate Mode:</strong> {item.rateMode}
                </p>
                <p>
                  <strong>Rate:</strong> ${item.rate} | <strong>Amount:</strong> ${item.amount}
                </p>
              </div>
            ))}
            <p className="font-semibold">Total Duration: {checkoutData.durationHours} hrs</p>
            <p className="font-semibold">Total Amount: ${checkoutData.amount}</p>
          </div>
          <div className="flex space-x-2">
            <Button onClick={handlePrint}>Print</Button>
            <Button onClick={onClose}>Close</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutPanel;
