import { useEffect } from "react";
import axios from "axios";

/** pass a user if you have it in context: <BeaconIdentify user={currentUser}/> */
export default function BeaconIdentify({ user }) {
  useEffect(() => {
    // Add delay to ensure Beacon is fully loaded in production
    const identifyUser = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}helpscout/signature`,
          { withCredentials: true } 
        );
        const { name, email, signature } = data || {};
        if (!name || !email || !signature) {
          console.log('[BeaconIdentify] Missing signature data:', { name, email, signature: !!signature });
          return;
        }
        
        // Wait for Beacon to be ready, with retries for production
        let attempts = 0;
        const maxAttempts = 10;
        const checkBeacon = () => {
          if (window.Beacon && typeof window.Beacon === 'function') {
            console.log('[BeaconIdentify] Identifying user:', { name, email });
            window.Beacon("identify", { name, email, signature });
          } else if (attempts < maxAttempts) {
            attempts++;
            setTimeout(checkBeacon, 500); // Retry every 500ms
          } else {
            console.error('[BeaconIdentify] Beacon not available after', maxAttempts, 'attempts');
          }
        };
        checkBeacon();
      } catch (err) {
        console.error('[BeaconIdentify] Error fetching signature:', err);
        // silently ignore; Beacon is non-blocking
      }
    };

    // Add a small delay to ensure Beacon is initialized
    const timer = setTimeout(identifyUser, 1000);
    return () => clearTimeout(timer);
  }, [user?.email]);

  return null;
}
