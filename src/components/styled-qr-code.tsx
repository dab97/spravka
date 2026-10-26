import React, { useEffect, useRef } from "react";
import QRCodeStyling, {
  type Options as QRCodeOptions,
} from "qr-code-styling";
import { BRAND } from "@/lib/brand";

interface StyledQrCodeProps {
  value: string;
  size?: number;
  className?: string;
  variant?: "rounded" | "classic";
}

function buildOptions(value: string, size: number, variant: StyledQrCodeProps["variant"]): QRCodeOptions {
  const isClassic = variant === "classic";
  return {
    width: size,
    height: size,
    margin: 0,
    type: "svg",
    data: value,
    image: "/favicon.png",
    dotsOptions: {
      type: "square",
      color: BRAND.navy,
      roundSize: false,
    },
    cornersSquareOptions: {
      type: isClassic ? "square" : "extra-rounded",
      color: BRAND.navy,
    },
    cornersDotOptions: {
      type: isClassic ? "square" : "extra-rounded",
      color: BRAND.navy,
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
}

export const StyledQrCode: React.FC<StyledQrCodeProps> = ({
  value,
  size = 184,
  className,
  variant = "rounded",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);

  // Первый рендер — создание и append; повторные — qr.update() без пересоздания (P3-3)
  useEffect(() => {
    if (!containerRef.current) return;
    const options = buildOptions(value, size, variant);

    if (!qrRef.current) {
      qrRef.current = new QRCodeStyling(options);
      qrRef.current.append(containerRef.current);
    } else {
      qrRef.current.update(options);
    }
  }, [value, size, variant]);

  // Разовый cleanup при размонтировании
  useEffect(() => {
    const el = containerRef.current;
    return () => {
      if (el) el.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: size, height: size }}
      aria-label="QR-код для перехода к форме заказа"
    />
  );
};
