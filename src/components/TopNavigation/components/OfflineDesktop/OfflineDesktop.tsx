import { WifiOff } from "react-feather";
import { Wrapper } from "./OfflineDesktop.styles";

function OfflineDesktop() {
  return (
    <Wrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <WifiOff size={"1.25rem"} />
      <span style={{ fontSize: "0.875rem" }}>No network</span>
    </Wrapper>
  );
}

export default OfflineDesktop;
