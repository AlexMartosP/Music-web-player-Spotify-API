import { useEffect, useState } from "react";
import useSWR from "swr";
import withNetwork from "../../HOC/withNetwork";
import IncludeSaving from "../../components/IncludeSaving";
import SingleTrack from "../../components/SingleTrack";
import Button from "../../components/ui/Button";
import Heading from "../../components/ui/Heading";
import Heading2 from "../../components/ui/Heading2";
import { SkeletonText, SkeletonTrack } from "../../components/ui/Skeletons";
import { base_api_url } from "../../config/api";
import { getUsersQueue } from "../../services/URLCreators/queue";
import { fetcher } from "../../services/fetcher";
import { selectPlaybar, transfer } from "../../slices/playbar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { QueueType } from "../../types/queue";
import {
  HeadingWrapper,
  NotActiveWrapper,
  ValidatingSpinner,
} from "./Queue.styles";

function Queue() {
  const [isValidating, setIsValidating] = useState(false);
  const playbar = useAppSelector(selectPlaybar);
  const dispatch = useAppDispatch();

  const { data, isLoading, mutate } = useSWR<QueueType>(
    playbar.isActive && {
      urls: base_api_url + getUsersQueue(),
    },
    fetcher,
    {
      keepPreviousData: true,
      revalidateOnFocus: true,
      revalidateOnMount: false,
    }
  );

  function reValidate() {
    setIsValidating(true);
    setTimeout(() => {
      mutate().then(() => {
        setIsValidating(false);
      });
    }, 3000);
  }

  useEffect(() => {
    if (data?.currently_playing) {
      if (playbar.currentTrack.id !== data.currently_playing.id) {
        reValidate();
      }
    }
  }, [playbar.currentTrack.id, data]);

  async function handleTransfer() {
    await dispatch(transfer(playbar.deviceId));
    reValidate();
  }

  return (
    <>
      {playbar.isActive ? (
        <>
          <HeadingWrapper>
            <Heading>Queue</Heading>
            {isValidating && <ValidatingSpinner />}
          </HeadingWrapper>
          {!isLoading && data && data.currently_playing ? (
            <div>
              <div className="flow-sm">Current track</div>
              <IncludeSaving ids={[data.currently_playing.id]}>
                <SingleTrack
                  trackData={data.currently_playing}
                  index={0}
                  secondMeta={
                    data.currently_playing.album
                      ? data.currently_playing.album.name
                      : ""
                  }
                />
              </IncludeSaving>
              <div className="flow-sm">Next tracks</div>
              <IncludeSaving ids={data.queue.map((track) => track.id)}>
                {data.queue.map((track, index) => (
                  <SingleTrack
                    key={track.id + index}
                    trackData={track}
                    index={index + 1}
                    secondMeta={track.album ? track.album.name : ""}
                  />
                ))}
              </IncludeSaving>
            </div>
          ) : (
            <>
              <SkeletonText className="flow-sm" width="8rem" />
              <SkeletonTrack className="flow-xxs" />
              <SkeletonText className="flow-sm" width="8rem" />
              <div className="flow-xxs">
                {new Array(8).fill("").map((v, i) => (
                  <SkeletonTrack key={i} />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <NotActiveWrapper>
          <Heading2>This player is not active</Heading2>
          <p>To view the queue this player has to be active.</p>
          <Button onClick={handleTransfer}>Make this player active</Button>
          <span>This will transfer your play state to this player</span>
        </NotActiveWrapper>
      )}
    </>
  );
}

export default withNetwork(Queue);
