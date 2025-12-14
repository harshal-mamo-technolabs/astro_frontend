import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function BeaconRouteSync() {
  const loc = useLocation();
  useEffect(() => {
    if (!window.Beacon) return;
    window.Beacon("event", {
      type: "page-viewed",
      url: window.location.href,
      title: document.title,
    });
    window.Beacon("suggest");
  }, [loc]);
  return null;
}
