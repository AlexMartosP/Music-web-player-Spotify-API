import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function useHistoryNavigation() {
  const [history, setHistory] = useState({
    forward: "",
    back: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const initRef = useRef(true);
  const firstPage = useRef("");
  const lastPage = useRef("");
  const isLast = useRef(true);

  useEffect(() => {
    if (!initRef.current) {
      setHistory((prev) => {
        if (firstPage.current === location.key) {
          return { back: "", forward: location.key };
        }
        if (lastPage.current === location.key) {
          return { forward: "", back: location.key };
        }

        return { ...prev, back: location.key };
      });
    }
    initRef.current = false;
  }, [location]);

  useEffect(() => {
    firstPage.current = location.key;
  }, []);

  function handleBack() {
    if (isLast.current) {
      lastPage.current = location.key;
    }
    isLast.current = false;
    navigate(-1);
  }

  function handleForward() {
    navigate(1);
  }

  return {
    history,
    handleBack,
    handleForward,
  };
}

export default useHistoryNavigation;
