import {
  Children,
  Dispatch,
  PropsWithChildren,
  cloneElement,
  isValidElement,
} from "react";
// SWR
import useSWR from "swr";
// Services
import { checkSavedTracks } from "../../services/URLCreators";
import { flatFetcher } from "../../services/fetcher";
// Hooks
import useInfiniteScroll, { LoadMore } from "../../hooks/useInfiniteScroll";

interface MiddleProps extends PropsWithChildren {
  ids: string[];
  setSize?: Dispatch<any>;
}

function IncludeSaving({ ids, setSize, children }: MiddleProps) {
  const { data: savedData } = useSWR<boolean[]>(
    ids && {
      type: "savings",
      key: ids.join(" "),
      urls: checkSavedTracks(ids),
    },
    flatFetcher
  );

  const loadMoreRef = useInfiniteScroll(loadMore, [], !!setSize);

  function loadMore() {
    if (setSize) {
      setSize((size: number) => size + 1);
    }
  }

  return (
    <>
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          return cloneElement(child as React.ReactElement<any>, {
            isSaved: savedData && savedData[index],
          });
        }

        return child;
      })}
      <LoadMore ref={loadMoreRef} />
    </>
  );
}

export default IncludeSaving;
