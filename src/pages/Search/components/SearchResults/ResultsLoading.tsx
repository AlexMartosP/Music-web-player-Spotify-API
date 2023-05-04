// Components
import {
  SkeletonCard,
  SkeletonH2,
  SkeletonTrack,
} from "../../../../components/ui/Skeletons";
import Slider from "../../../../components/ui/Slider";

function ResultsLoading() {
  return (
    <div className="flow-xxs">
      <SkeletonH2 />
      {new Array(5).fill("").map((t, i) => (
        <SkeletonTrack key={i} />
      ))}
      {new Array(3).fill("").map((t, i) => (
        <div key={i} className="flow-sm">
          <SkeletonH2 />
          <Slider>
            {new Array(8).fill("").map((t, i) => (
              <SkeletonCard key={i} />
            ))}
          </Slider>
        </div>
      ))}
    </div>
  );
}

export default ResultsLoading;
