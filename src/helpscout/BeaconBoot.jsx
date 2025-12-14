import { useEffect } from "react";

let __beaconInjected = false;

export default function BeaconBoot() {
  useEffect(() => {
    const BEACON_ID = import.meta.env.VITE_HELPSCOUT_BEACON_ID;
    if (!BEACON_ID) {
      console.warn("[BeaconBoot] Missing VITE_HELPSCOUT_BEACON_ID env.");
      return;
    }

    // --- preconnects (optional perf) ---
    const pre1 = document.createElement("link");
    pre1.rel = "preconnect";
    pre1.href = "https://beacon-v2.helpscout.net";
    document.head.appendChild(pre1);

    const pre2 = document.createElement("link");
    pre2.rel = "preconnect";
    pre2.href = "https://beaconapi.helpscout.net";
    document.head.appendChild(pre2);

    // --- boot (only for this page) ---
    const boot = () => {
      if (__beaconInjected) return;

      // queue stub BEFORE script loads (official pattern)
      if (!window.Beacon) {
        const q = function (method, options, data) {
          (q.readyQueue = q.readyQueue || []).push({ method, options, data });
        };
        q.readyQueue = [];
        window.Beacon = q;
      }

      const script = document.createElement("script");
      script.async = true;
      script.src = "https://beacon-v2.helpscout.net";
      script.onload = () => {
        const Beacon = window.Beacon;
        if (!Beacon) return;

        Beacon("init", BEACON_ID);
        Beacon("config", {
          enableFab: true, // show the fab only on this page
          showName: false,
          showSubject: false,
          showEmail: false,
        });
        Beacon("once", "ready", () => {
          Beacon("show"); // optional: open immediately
        });

        __beaconInjected = true;
      };
      script.onerror = () => console.error("[BeaconBoot] Failed to load script");
      document.head.appendChild(script);
      script.__helpscout = true;
    };

    boot();

    // --- CLEANUP when leaving the page ---
    return () => {
      try {
        const Beacon = window.Beacon;
        if (typeof Beacon === "function") {
          Beacon("destroy");
        }
      } catch (e) {
        console.warn("[BeaconBoot] destroy error:", e);
      }

      // Remove the injected script(s)
      document
        .querySelectorAll('script[src*="beacon-v2.helpscout.net"]')
        .forEach((n) => n.parentNode && n.parentNode.removeChild(n));

      // Remove Beacon styles if any
      document
        .querySelectorAll('link[href*="beacon"]')
        .forEach((n) => n.parentNode && n.parentNode.removeChild(n));

      // Drop the global and allow re-init on next visit
      try {
        delete window.Beacon;
      } catch {}
      __beaconInjected = false;

      // remove preconnects
      pre1.parentNode && pre1.parentNode.removeChild(pre1);
      pre2.parentNode && pre2.parentNode.removeChild(pre2);
    };
  }, []);

  return null;
}
