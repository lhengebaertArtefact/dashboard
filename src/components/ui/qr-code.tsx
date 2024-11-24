import { QRCodeSVG } from "qrcode.react";

interface QRCodeProps {
  value: string;
  size?: number;
}

export function QRCode({ value, size = 128 }: QRCodeProps) {
  return <QRCodeSVG value={value} size={size} />;
}
