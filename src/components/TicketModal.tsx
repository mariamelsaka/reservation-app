import Button from "@components/Ui/Button";

interface Ticket {
  id: string;
  zoneId: string;
  checkinAt: string;
}

interface TicketModalProps {
  ticket: Ticket;
  onClose: () => void;
}

/**
 * TicketModal
 * - Displays ticket details
 * - Can print the ticket
 */
const TicketModal = ({ ticket, onClose }:TicketModalProps) => {

   const handlePrint = () => {
  const printContent = `
    <html>
      <head>
        <title>Ticket</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            color: #333;
          }
          .ticket-container {
            max-width: 400px;
            margin: auto;
            border: 2px solid #333;
            padding: 20px;
            border-radius: 10px;
            background: #fff;
          }
          .ticket-header {
            text-align: center;
            margin-bottom: 20px;
          }
          .ticket-header h2 {
            margin: 0;
            font-size: 24px;
          }
          .ticket-details p {
            margin: 8px 0;
            font-size: 16px;
          }
          .ticket-footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #666;
          }
          hr {
            border: none;
            border-top: 1px dashed #333;
            margin: 10px 0;
          }
        </style>
      </head>
      <body>
        <div class="ticket-container">
          <div class="ticket-header">
            <h2>Ticket Confirmed</h2>
          </div>
          <div class="ticket-details">
            <p><strong>Ticket ID:</strong> ${ticket.id}</p>
            <p><strong>Zone:</strong> ${ticket.zoneId}</p>
            <p><strong>Check-in:</strong> ${new Date(ticket.checkinAt).toLocaleString()}</p>
          </div>
          <hr />
          <div class="ticket-footer">
            Thank you for visiting!<br />
            Have a great day!
          </div>
        </div>
      </body>
    </html>`;
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  return (
    <div className="fixed inset-0 bg-[#F3F4F6] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-96">
        <h3 className="text-xl font-semibold mb-2">Ticket Confirmed</h3>
        <p>Ticket ID: {ticket.id}</p>
        <p>Zone: {ticket.zoneId}</p>
        <p>Check-in: {new Date(ticket.checkinAt).toLocaleString()}</p>

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={handlePrint} className="bg-blue-500 text-white">
            Print
          </Button>
          <Button onClick={onClose} className="bg-gray-300">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;
