import React, { useEffect, useRef } from "react";
import QRCodeStyling, {
  type Options as QRCodeOptions,
} from "qr-code-styling";

interface StyledQrCodeProps {
  value: string;
  size?: number;
  className?: string;
  variant?: "rounded" | "classic";
}

export const StyledQrCode: React.FC<StyledQrCodeProps> = ({
  value,
  size = 184,
  className,
  variant = "rounded",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const isClassic = variant === "classic";

    const options: QRCodeOptions = {
      width: size,
      height: size,
      margin: 0,
      type: "svg",
      data: value,
      image: "/favicon.png",
      dotsOptions: {
        type: "square",
        color: "#0F172A",
        roundSize: false,
      },
      cornersSquareOptions: {
        type: isClassic ? "square" : "extra-rounded",
        color: "#0F172A",
      },
      cornersDotOptions: {
        type: isClassic ? "square" : "extra-rounded",
        color: "#0F172A",
      },
      backgroundOptions: {
        color: "transparent",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 3,
        imageSize: 0.32,
        hideBackgroundDots: true,
      },
      qrOptions: {
        errorCorrectionLevel: "H",
      },
    };

    containerRef.current.innerHTML = "";
    const qrCode = new QRCodeStyling(options);
    qrCode.append(containerRef.current);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [value, size, variant]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: size, height: size }}
      aria-label="QR-код для перехода к форме заказа"
    />
  );
};
