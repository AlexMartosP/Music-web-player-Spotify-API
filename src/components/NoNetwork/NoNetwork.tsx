import { WifiOff } from "react-feather";
import { Wrapper } from "./NoNetwork.styles";
import Heading2 from "../ui/Heading2";

function NoNetwork() {
  return (
    <Wrapper>
      <WifiOff />
      <Heading2>Not available while offline</Heading2>
    </Wrapper>
  );
}

export default NoNetwork;
