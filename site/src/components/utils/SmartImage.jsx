import React, { useEffect, useRef, useState } from "react";
import { optimizedSources } from "../../utils/images";

/**
 * Зображення з оптимізованими WebP-версіями (srcset), лінивим завантаженням
 * і плавною появою. Батьківський блок варто мати з фоном-заглушкою (bg-gray-200).
 *
 * priority — для першого екрана: завантажується одразу з високим пріоритетом.
 * sizes    — яку ширину займає фото на екрані, щоб браузер обрав потрібний файл.
 */
export default function SmartImage({
  src,
  alt = "",
  sizes = "100vw",
  className = "",
  priority = false,
  fallback,
  width,
  height,
  ...rest
}) {
  const ref = useRef(null);
  const [failedOptimized, setFailedOptimized] = useState(false);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const optimized = !failedOptimized && optimizedSources(src);
  const finalSrc = failed && fallback ? fallback : optimized ? optimized.src : src;

  // нове фото — нова анімація появи
  useEffect(() => {
    setFailedOptimized(false);
    setFailed(false);
    setLoaded(false);
  }, [src]);

  // фото з кешу браузера могло завантажитись до підписки на onLoad
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth > 0) setLoaded(true);
  }, [finalSrc]);

  const handleError = () => {
    if (optimized) setFailedOptimized(true);
    else if (fallback && !failed) setFailed(true);
    else setLoaded(true);
  };

  return (
    <img
      ref={ref}
      src={finalSrc}
      srcSet={optimized ? optimized.srcSet : undefined}
      sizes={optimized ? sizes : undefined}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchpriority={priority ? "high" : undefined}
      onLoad={() => setLoaded(true)}
      onError={handleError}
      className={`smart-img ${loaded ? "is-loaded" : ""} ${className}`}
      {...rest}
    />
  );
}
