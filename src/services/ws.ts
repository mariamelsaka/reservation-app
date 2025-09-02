// /src/services/ws.ts
let socket: WebSocket | null = null;

export function connectWS(gateId: string) {
  socket = new WebSocket("ws://api.parking-system.test/api/v1/ws");

socket.onopen = () => {
  console.log("✅ Connected to WebSocket");

  // Guard the send call
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(
      JSON.stringify({
        type: "subscribe",
        payload: { gateId },
      })
    );
  } else {
    console.warn("WebSocket not open yet, cannot subscribe");
  }
};


  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("📩 Message from server:", data);

    // هنا تقدر تبعتي الـ data دي للـ state management (Redux, Zustand ..)
  };

  socket.onerror = (error) => {
    console.error("❌ WebSocket error:", error);
  };

  socket.onclose = () => {
    console.log("🔌 Connection closed");
  };
}

export function disconnectWS(gateId: string) {
  if (!socket) return;

  try {
    // Only send unsubscribe if socket is OPEN
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: "unsubscribe",
          payload: { gateId },
        })
      );
    }

    // Close socket if it's OPEN or CONNECTING
    if (
      socket.readyState === WebSocket.OPEN ||
      socket.readyState === WebSocket.CONNECTING
    ) {
      socket.close();
    }
  } catch (err) {
    console.warn("WebSocket disconnect failed (likely not open yet):", err);
  }
}
