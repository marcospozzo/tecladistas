import Image, { ImageProps } from "next/image";

const DEFAULT_FALLBACK_SRC = "/placeholder-600x400.png";

function isRemoteImageSource(src: string) {
  return src.startsWith("http://") || src.startsWith("https://");
}

function getSafeImageSource(src?: string | null, fallbackSrc = DEFAULT_FALLBACK_SRC) {
  if (!src || !src.trim()) {
    return fallbackSrc;
  }

  return src;
}

type DefensiveImageProps = Omit<ImageProps, "alt" | "src"> & {
  alt: string;
  fallbackSrc?: string;
  src?: string | null;
};

export default function DefensiveImage({
  alt,
  fallbackSrc = DEFAULT_FALLBACK_SRC,
  src,
  ...props
}: DefensiveImageProps) {
  const safeFallbackSrc = getSafeImageSource(fallbackSrc);
  const safeImageSource = getSafeImageSource(src, safeFallbackSrc);

  return (
    <Image
      {...props}
      alt={alt}
      src={safeImageSource}
      unoptimized={isRemoteImageSource(safeImageSource)}
    />
  );
}
