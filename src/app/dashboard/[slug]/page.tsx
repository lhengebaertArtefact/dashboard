import Card from "@/app/manualComponents/Card";
import { QRCode } from "@/components/ui/qr-code";

interface TerminalPageProps {
  params: { slug: string };
}

export default function TerminalPage({ params }: TerminalPageProps) {
  return (
    <div className="flex gap-6">
      <div className="flex flex-col">
        <h2 className="ml-4 font-bold">You are now on the {params.slug}</h2>
        <div className="flex-1 gap-6">
          <Card terminal={params.slug} />
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
