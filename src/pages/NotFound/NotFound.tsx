import { Frown } from "react-feather";
import { Wrapper } from "./NotFound.styles";
import Heading2 from "../../components/ui/Heading2";
import { ReactElement } from "react";

interface NotFoundProps {
  text?: string;
  icon?: React.ReactNode;
}

function NotFound({ text, icon }: NotFoundProps) {
  return (
    <Wrapper>
      {icon || <Frown />}
      <Heading2>{text || "This page was not found"}</Heading2>
    </Wrapper>
  );
}

export default NotFound;
