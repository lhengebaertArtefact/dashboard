"use client";
import Card from "@/app/manualComponents/Card";
import { QRCode } from "@/components/ui/qr-code";
import { useInfoCards } from "@/context/InfoCardsContext";

interface TerminalPageProps {
  params: { slug: string };
}

export default function TerminalPage({ params }: TerminalPageProps) {
  const { infoCards } = useInfoCards();
  const replaceName =
    params.slug.charAt(0).toUpperCase() +
    params.slug.slice(1).replace(/([a-zA-Z]+)(\d+)/, "$1 $2");

  const currentTerminal = infoCards.find(
    (item) => item.terminal.name === replaceName
  );
  if (!currentTerminal) {
    <div>no terminal</div>;
  }

  const valuesCards = Object.values(currentTerminal!.terminal).filter(
    (value) => !value.startsWith("Terminal")
  );

  return (
    <div className="flex gap-6">
      <div className="flex flex-col">
        <h2 className="ml-4 font-bold">You are now on the {params.slug}</h2>
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-6">
          {valuesCards.map((item) => (
            <Card terminal={item} />
          ))}
        </div>
      </div>

      <div className="w-1/4 flex flex-col items-center justify-start border-l border-gray-300 pl-6 mr-4">
        <QRCode value={`https://example.com/${params.slug}`} size={200} />
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Scan to view on mobile
        </p>
      </div>
    </div>
  );
}
