import { useEffect, useRef } from "react";

function useTimeout(callback: () => void, dependencies: any[], ms: number) {
  const timer = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      callback();
    }, ms);

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, dependencies);
}

export default useTimeout;
