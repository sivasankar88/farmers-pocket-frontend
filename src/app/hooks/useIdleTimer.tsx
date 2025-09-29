import { useEffect, useRef, useState } from "react";

const IDLE_TIMEOUT = 25 * 60 * 1000;

const useIdleTimer = () => {
  const [isIdle, setIsIdle] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsIdle(true);
      console.log("done");
    }, IDLE_TIMEOUT);
  };

  useEffect(() => {
    const events = ["keydown", "click", "scroll"];
    const handleActivity = () => {
      setIsIdle(false);
      resetTimer();
    };

    events.forEach((event) => window.addEventListener(event, handleActivity));
    resetTimer();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
    };
  }, []);

  return isIdle;
};
export default useIdleTimer;
