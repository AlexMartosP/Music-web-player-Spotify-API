import { Eye } from "react-feather";
import { Wrapper } from "./ListenerCounter.styles";

interface ListenerCounterProps {
  count: number;
}

function ListenerCounter({ count }: ListenerCounterProps) {
  return (
    <Wrapper>
      <Eye />
      <span>{count}</span>
    </Wrapper>
  );
}

export default ListenerCounter;
