import { QRCode } from "@/components/ui/qr-code";

interface QRCodeCardProps {
  terminalId: string;
  storeSource: string;
}

export function QRCodeCard({ terminalId, storeSource }: QRCodeCardProps) {
  const url = `https://extime-sweettime-preprod.netlify.app/?utm_source=${terminalId}&utm_medium=qr&utm_campaign=SweetTime&utm_term=${storeSource}`;

  console.log(url);
  return (
    <div className="bg-white p-6  border border-gray-300 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Scanner pour participer</h3>
      <div className="flex flex-col items-center">
        <QRCode
          value={`https://extime-sweettime-preprod.netlify.app/?utm_source=${storeSource}&utm_medium=qr&utm_campaign=SweetTime&utm_term=${terminalId}`}
          size={200}
        />
        <p className="mt-4 text-sm text-gray-500 text-center">
          Scannez ce QR code pour participer à la chasse aux trésors dans ce
          terminal
        </p>
      </div>
    </div>
  );
}
