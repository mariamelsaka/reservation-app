import { useEffect, useRef, useState, useCallback } from "react";

export type WsStatus = "connecting" | "connected" | "disconnected";

export interface WsMessage<T> {
  type: string;
  payload: T;
}

export interface UseWsOptions<T> {
  gateId: string;
  onMessage?: (msg: WsMessage<T>) => void;
  reconnectInterval?: number; // ms to retry if disconnected
}

export const useWs = <T>({
  gateId,
  onMessage,
  reconnectInterval = 5000,
}: UseWsOptions<T>) => {
  const [status, setStatus] = useState<WsStatus>("connecting");
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);

  const clearConnection = () => {
    if (wsRef.current) {
      wsRef.current.onopen = null;
      wsRef.current.onclose = null;
      wsRef.current.onerror = null;
      wsRef.current.onmessage = null;
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  const connectWs = useCallback(() => {
    // Close any existing connection
    clearConnection();

    setStatus("connecting");
    const ws = new WebSocket("ws://localhost:3000/api/v1/ws");

    ws.onopen = () => {
      setStatus("connected");
      ws.send(JSON.stringify({ type: "subscribe", payload: { gateId } }));
    };

    ws.onmessage = (evt) => {
      try {
        const msg: WsMessage<T> = JSON.parse(evt.data);
        onMessage?.(msg); // direct UI update from payload
      } catch (err) {
        console.error("Invalid WS message:", err);
      }
    };

    ws.onerror = () => setStatus("disconnected");

    ws.onclose = () => {
      setStatus("disconnected");
      // Auto-reconnect
      if (reconnectInterval > 0) {
        reconnectTimeout.current = setTimeout(() => connectWs(), reconnectInterval);
      }
    };

    wsRef.current = ws;
  }, [gateId, onMessage, reconnectInterval]);

  const disconnect = useCallback(() => {
    clearTimeout(reconnectTimeout.current!);
    clearConnection();
    setStatus("disconnected");
  }, []);

  // Initial connection
  useEffect(() => {
    connectWs();
    return () => {
      clearTimeout(reconnectTimeout.current!);
      clearConnection();
    };
  }, [connectWs]);

  return { status, connectWs, disconnect, wsRef };
};
