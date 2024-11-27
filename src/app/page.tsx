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
        <h1 className="text-5xl ml-4 font-extrabold text-neutral-800 drop-shadow-md mb-8">
          Welcome to Your Dashboard
        </h1>

        {page[0] === "" ? "" : <Terminal terminal={page} />}
      </div>
    </div>
  );
}
