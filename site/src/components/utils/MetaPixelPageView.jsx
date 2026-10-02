import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Перший PageView відправляється з index.html, тут — лише переходи всередині SPA
function MetaPixelPageView() {
  const { pathname } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [pathname]);

  return null;
}

export default MetaPixelPageView;
