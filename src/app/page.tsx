"use client";
import { Sidebar } from "@/components/ui/sidebar";
import { QRCode } from "@/components/ui/qr-code";
import { useState } from "react";
import Terminal from "./pages/Terminal";

export default function Home() {
  const [page, setPage] = useState<[string, Record<string, any>[]]>(["", []]);

  console.log(page);

  return (
    <div className="flex h-screen">
      <Sidebar setPage={setPage} />
      <div className="flex flex-col">
        <h1 className=" text-3xl font-bold mb-6 mt-5">
          Welcome to Your Dashboard
        </h1>
        {page[0] === "" ? "" : <Terminal terminal={page} />}
      </div>
    </div>
  );
}
