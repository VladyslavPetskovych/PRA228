import React, { useEffect, useRef } from "react";

// Один спільний IntersectionObserver на всю сторінку — дешевше, ніж окремий на кожен блок
let observer;
function getObserver() {
  if (observer || typeof IntersectionObserver === "undefined") return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );
  return observer;
}

/**
 * Плавна поява блоку під час прокрутки.
 *
 * <Reveal>…</Reveal>                       — знизу вгору
 * <Reveal from="left" delay={150}>…</Reveal>
 * <Reveal as="li" from="zoom">…</Reveal>
 *
 * from: "up" | "down" | "left" | "right" | "zoom" | "fade"
 */
export default function Reveal({
  as: Tag = "div",
  from = "up",
  delay = 0,
  className = "",
  style,
  children,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const io = getObserver();
    if (!el) return;
    if (!io) {
      el.classList.add("is-visible");
      return;
    }
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${from} ${className}`}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
