import { create } from "zustand";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const useWS = create<{
  count: number;
  connect: () => void;
}>((set) => ({
  count: 0,

  connect: () => {

    if (socket?.connected) return;

// io(process.env.NEXT_PUBLIC_BACKEND_URL);
    socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log("connected:", socket?.id);
    });

    socket.on("activeUsers", (data) => {
      set({ count: data });
    });

    socket.on("disconnect", () => {
      socket = null;
    });
  },
}));