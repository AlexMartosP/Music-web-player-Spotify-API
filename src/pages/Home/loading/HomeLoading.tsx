import { SkeletonCard } from "../../../components/ui/Skeletons";
import SkeletonH2 from "../../../components/ui/Skeletons/SkeletonH2";
import SkeletonTrack from "../../../components/ui/Skeletons/SkeletonTrack";
import Slider from "../../../components/ui/Slider";
import BREAKPOINTS from "../../../constants/breakpoints";
import useWindowSize from "../../../hooks/useWindowSize";
import { Flex, Grid } from "../Home.styles";

function HomeLoading() {
  const { width } = useWindowSize();

  return (
    <>
      <Flex>
        {width < BREAKPOINTS.laptop ? (
          <Slider>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </Slider>
        ) : (
          <Grid fixedCols={3}>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </Grid>
        )}
        <div>
          <SkeletonH2 />
          <SkeletonTrack />
          <SkeletonTrack />
          <SkeletonTrack />
          <SkeletonTrack />
          <SkeletonTrack />
          <SkeletonTrack />
          <SkeletonTrack />
        </div>
      </Flex>
      <div className="flow-sm">
        <SkeletonH2 />
        {width < BREAKPOINTS.laptop ? (
          <Slider>
            <SkeletonCard horizontal />
            <SkeletonCard horizontal />
            <SkeletonCard horizontal />
            <SkeletonCard horizontal />
            <SkeletonCard horizontal />
            <SkeletonCard horizontal />
          </Slider>
        ) : (
          <Grid>
            <SkeletonCard horizontal />
            <SkeletonCard horizontal />
            <SkeletonCard horizontal />
            <SkeletonCard horizontal />
            <SkeletonCard horizontal />
            <SkeletonCard horizontal />
          </Grid>
        )}
      </div>
    </>
  );
}

export default HomeLoading;
