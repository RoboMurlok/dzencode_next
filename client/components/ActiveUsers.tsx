"use client";

import { useEffect } from "react";
import { useWS } from "./../stores/socketStore";

export default function ActiveUsers() {
  const count = useWS((s) => s.count);
  const connect = useWS((s) => s.connect);

  useEffect(() => {
    connect();
  }, [connect]);



  return (
    <div className="p-1 bg-dark text-white rounded">
      Вкладки: {count}
    </div>
  );
}