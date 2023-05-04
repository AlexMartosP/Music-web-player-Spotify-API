// Styles
import { Wrapper } from "../../SingleTrack.styles";
import {
  Flow,
  MetaWrapper,
  Rectangle,
  SmallRectangle,
} from "./UnavailableTrack.styles";

interface UnavailableTrackProps {
  index: number;
}

function UnavailableTrack({ index }: UnavailableTrackProps) {
  return (
    <>
      <Wrapper disabled={true}>
        <MetaWrapper>
          <span className=" number text-gray-small">{index + 1}</span>
          <div className="image"></div>
          <Flow>
            <Rectangle></Rectangle>
            <SmallRectangle></SmallRectangle>
          </Flow>
        </MetaWrapper>

        <SmallRectangle></SmallRectangle>
      </Wrapper>
    </>
  );
}

export default UnavailableTrack;
