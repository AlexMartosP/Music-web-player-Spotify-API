import { Frown } from "react-feather";
import { Wrapper } from "./NotFound.styles";
import Heading2 from "../../components/ui/Heading2";
import { ReactElement } from "react";
import MetaTitle from "../MetaTitle/MetaTitle";

interface NotFoundProps {
  text?: string;
  icon?: React.ReactNode;
}

function NotFound({ text, icon }: NotFoundProps) {
  return (
    <>
      <Wrapper>
        {icon || <Frown />}
        <Heading2>{text || "This page was not found"}</Heading2>
      </Wrapper>
      <MetaTitle title="oops..." />
    </>
  );
}

export default NotFound;
