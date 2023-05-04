import { useAppSelector } from "../../store/hooks";
import { selectCurrentTrack, selectIsPaused } from "../../slices/playbar";
import { Helmet } from "react-helmet-async";

interface MetaTitleProps {
  title: string;
}

function MetaTitle({ title }: MetaTitleProps) {
  const isPaused = useAppSelector(selectIsPaused);

  console.log(isPaused);
  if (isPaused) {
    return (
      <Helmet>
        <title>{title}</title>
      </Helmet>
    );
  }

  return null;
}

export default MetaTitle;
