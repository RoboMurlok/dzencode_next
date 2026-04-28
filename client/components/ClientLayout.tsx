"use client";

import Aside from "./Aside";
import Header from "./Header";
import Modal from "./Modal";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container-fluid px-0 min-vh-100">
      <Header />
      <div className="row">
        <div className="col-md-2 p-0">
          <Aside />
        </div>
        <div className="col-md-10 p-0">
          <main
            className="d-flex flex-column bg-light min-vh-100 position-relative"
            style={{ padding: `3rem 4rem` }}
          >
            <Modal />
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
