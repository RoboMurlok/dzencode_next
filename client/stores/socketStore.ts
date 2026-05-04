import { create } from "zustand";
import { io, Socket } from "socket.io-client";
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

let socket: Socket | null = null;

export const useWS = create<{
  count: number;
  connect: () => void;
}>((set) => ({
  count: 0,

  connect: () => {

    if (socket?.connected) return;

// io(process.env.NEXT_PUBLIC_BACKEND_URL);
    socket = io(baseUrl);

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