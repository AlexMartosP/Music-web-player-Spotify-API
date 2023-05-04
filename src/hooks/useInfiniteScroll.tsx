import { Ref, forwardRef, useEffect, useRef } from "react";
import styled from "styled-components";

const Div = styled.div<{ offset?: number }>`
  position: relative;
  height: 10px;
  transform: translateY(${(props) => props.offset || "-200px"});
  width: 10%;
  pointer-event: none;
  z-index: -1;
`;

export const LoadMore = forwardRef(
  (props: { offset?: number }, ref: Ref<HTMLDivElement>) => {
    return <Div ref={ref} offset={props.offset} />;
  }
);

function useInfiniteScroll(
  handleIntersect: () => void,
  dependencies: Array<any>,
  enabled: boolean = true
) {
  const ref = useRef<any>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (ref.current && enabled) {
      function callback(entires: IntersectionObserverEntry[]) {
        entires.forEach((entry) => {
          if (entry.isIntersecting) {
            handleIntersect();
          }
        });
      }

      observer = new IntersectionObserver(callback);

      observer.observe(ref.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, dependencies);

  return ref;
}

export default useInfiniteScroll;
