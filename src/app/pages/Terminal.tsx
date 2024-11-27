"use client";
import { QRCode } from "@/components/ui/qr-code";
import React, { useState } from "react";
import Card from "../manualComponents/Card";

interface TerminalProps {
  terminal: [string, Record<string, any>[]];
}

const Terminal: React.FC<TerminalProps> = ({ terminal }) => {
  function terminalChange(keyTerminal: string) {
    if (keyTerminal.startsWith("Terminal")) {
      return keyTerminal.replace("Terminal", "Terminal ");
    }
  }
  const replaceName = terminalChange(terminal[0]);

  const findIndexTerminal = terminal[0].match(/\d+/);
  const calcul = findIndexTerminal ? findIndexTerminal[0] : "0";
  console.log(terminal[0], calcul);
  return (
    <div className="flex gap-6">
      <div className="flex flex-col">
        <h2 className="ml-4 font-bold">You are now on the {replaceName}</h2>
        <div className="flex-1 gap-6">
          <Card
            infosCards={terminal[1]}
            indexCards={parseInt(calcul ? calcul : "0")}
            terminalName={terminal[0]}
          />
        </div>
      </div>

      <div className="w-1/4 flex flex-col items-center justify-start border-l border-gray-300 pl-6 mr-4">
        <QRCode value={`https://example.com/${replaceName}`} size={200} />
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Scan to view on mobile
        </p>
      </div>
    </div>
  );
};

export default Terminal;
