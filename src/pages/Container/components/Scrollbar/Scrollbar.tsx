import {
  MouseEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Bar, Wrapper } from "./Scrollbar.styles";

function Scrollbar() {
  const [height, setHeight] = useState(0);
  const [position, setPosition] = useState(0);
  const [visible, setVisible] = useState(true);
  const mainRef = useRef<HTMLElement | null>(null);
  const isMouseDown = useRef<number | null>(null);

  useLayoutEffect(() => {
    const main = document.getElementById("main");

    if (main) {
      mainRef.current = main;
      setHeight((window.innerHeight / main.scrollHeight) * 100);
    }
  }, []);

  useEffect(() => {
    function show() {
      setVisible(true);
    }

    function hide() {
      setVisible(false);
    }

    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);

    return () => {
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
    };
  }, []);

  useEffect(() => {
    const main = document.getElementById("main");

    function calulatePosition(e: Event) {
      if (main) {
        const target = e.target as HTMLElement;
        setPosition(
          ((target.scrollTop + window.innerHeight) / target.scrollHeight) * 100
        );
      }
    }

    if (main) {
      main.addEventListener("scroll", calulatePosition);
    }

    return () => {
      if (main) {
        main.removeEventListener("scroll", calulatePosition);
      }
    };
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleDrag);
    window.addEventListener("mouseup", handleDragEnd);
  }, [handleDrag, handleDragEnd]);

  function handleDragStart(e: MouseEvent) {
    isMouseDown.current = e.clientY;
  }

  function handleDrag(e: globalThis.MouseEvent) {
    if (isMouseDown.current && mainRef.current) {
      setPosition(
        ((e.clientY - isMouseDown.current) / window.innerHeight) * 100
      );
    }
  }

  function handleDragEnd() {
    isMouseDown.current = null;
  }

  return (
    <Wrapper>
      <Bar
        style={{ top: `${position}%` }}
        height={height}
        visible={visible}
        onMouseDown={handleDragStart}
      />
    </Wrapper>
  );
}

export default Scrollbar;
