import { QRCode } from "@/components/ui/qr-code";

interface QRCodeCardProps {
  terminalId: string;
  storeSource: string;
}

export function QRCodeCard({ terminalId, storeSource }: QRCodeCardProps) {
  const url = `https://extime-sweettime-preprod.netlify.app/?utm_source=${terminalId}&utm_medium=qr&utm_campaign=SweetTime&utm_term=${storeSource}`;

  console.log(url);
  return (
    <div className="group relative h-full">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl blur transition-all duration-300 group-hover:scale-105"></div>
      <div className="relative h-full backdrop-blur-xl bg-white/10 rounded-2xl p-4 md:p-6 border border-white/10 overflow-hidden">
        {/* Decorative orb */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-xl"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-6">
            Scanner pour participer
          </h3>

          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
            <div className="p-1 bg-white rounded-lg">
              <QRCode
                value={`https://extime-sweettime-preprod.netlify.app/?utm_source=${storeSource}&utm_medium=qr&utm_campaign=SweetTime&utm_term=${terminalId}`}
                size={200}
              />
            </div>
          </div>

          <p className="mt-6 text-sm text-gray-400 text-center leading-relaxed">
            Scannez ce QR code pour participer à la
            <br />
            chasse aux trésors dans ce terminal
          </p>
        </div>
      </div>
    </div>
  );
}
