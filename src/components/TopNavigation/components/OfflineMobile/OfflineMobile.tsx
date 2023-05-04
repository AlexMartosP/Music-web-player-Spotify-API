import { Wrapper } from "./OfflineMobile.styles";

function OfflineMobile() {
  return (
    <Wrapper
      initial={{ height: 0 }}
      animate={{ height: "2rem" }}
      exit={{ height: 0 }}
    >
      <span>No Network</span>
    </Wrapper>
  );
}

export default OfflineMobile;
