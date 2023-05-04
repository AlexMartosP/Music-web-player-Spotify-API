import { useEffect, MouseEvent, useRef, RefObject } from "react";

// Hook to use track funcionality
// Takes in ref of tracker to calculate its position
// Calls a change fn to handle the change in component
function useTrack(
  trackerRef: RefObject<HTMLDivElement>,
  handleChange: (newPart: number, clicked?: boolean) => void,
  handleEnd: (newPart: number) => void,
  vertical: boolean = false
) {
  const isDragging = useRef<boolean>(false);

  useEffect(() => {
    // Listen on window to to listen for moves everywhere
    window.addEventListener("mousemove", handleMouseDrag);
    window.addEventListener("touchmove", handleTouchDrag);
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseDrag);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleTouchDrag);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleMouseDrag, handleTouchDrag, handleDragEnd]);

  function handleTrackerClick(e: MouseEvent) {
    const target = e.target as HTMLElement;

    if (target.classList.contains("dot")) return;

    const newPart = calculatePart(e.clientX, e.clientY);
    if (newPart) {
      handleChange(newPart, true);
    }
  }

  function handleDragStart() {
    isDragging.current = true;
  }

  function handleMouseDrag(event: globalThis.MouseEvent) {
    if (isDragging.current && trackerRef.current) {
      const { clientX, clientY } = event;

      const newPart = calculatePart(clientX, clientY);

      if (newPart) {
        handleChange(newPart);
      }
    }
  }

  function handleTouchDrag(event: globalThis.TouchEvent) {
    if (isDragging.current && trackerRef.current) {
      const { clientX, clientY } = event.changedTouches[0];

      const newPart = calculatePart(clientX, clientY);

      if (newPart) {
        handleChange(newPart);
      }
    }
  }

  function calculatePart(clientX: number, clientY: number): number | undefined {
    if (trackerRef.current) {
      // Get position of mouse
      const { left, width, bottom, height } =
        trackerRef.current.getBoundingClientRect();
      // Calculate position based on mouse and tracker
      const position = !vertical
        ? clientX - left
        : window.innerHeight - clientY - (window.innerHeight - bottom);
      const lineLength = !vertical ? width : height;

      if (position > 0 && position <= (!vertical ? width : height)) {
        const newPart = position / lineLength;

        return newPart;
      }
    }
  }

  function handleDragEnd(event: globalThis.MouseEvent) {
    if (isDragging.current) {
      const { clientX, clientY } = event;

      const newPart = calculatePart(clientX, clientY);

      isDragging.current = false;
      if (newPart) {
        handleEnd(newPart);
      }
    }
  }

  function handleTouchEnd(event: globalThis.TouchEvent) {
    if (isDragging.current) {
      const { clientX, clientY } = event.changedTouches[0];

      const newPart = calculatePart(clientX, clientY);

      isDragging.current = false;
      if (newPart) {
        handleEnd(newPart);
      }
    }
  }

  return { handleTrackerClick, handleDragStart };
}

export default useTrack;
