import { useEffect, useState } from "react";

interface useNetworkOptions {
  listenToOffline?: boolean;
}

function useNetwork(options?: useNetworkOptions) {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }

    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener("online", handleOnline);
    if (options?.listenToOffline) {
      window.addEventListener("offline", handleOffline);
    }

    return () => {
      window.removeEventListener("online", handleOnline);

      if (options?.listenToOffline) {
        window.removeEventListener("offline", handleOffline);
      }
    };
  }, []);

  return isOnline;
}

export default useNetwork;
