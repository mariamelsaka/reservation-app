import React, { useState } from "react";
import CheckoutPanel from "@components/CheckoutPanel";
import GateHeader from "@components/GateHeader";

const CheckpointPage: React.FC = () => {
  const [showPanel, setShowPanel] = useState(true);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <GateHeader wsStatus="connected" />
      <main className="flex-1 p-6 overflow-auto">
        {showPanel && (
          <CheckoutPanel onClose={() => setShowPanel(false)} />
        )}
      </main>
    </div>
  );
};

export default CheckpointPage;
