import Heading2 from "../../../../components/ui/Heading2";
import { Button, Wrapper } from "./NoResultsFound.styles";

interface NoResultsFoundProps {
  type: string;
  query: string;
  showBtn?: boolean;
}

function NoResultsFound({ type, query, showBtn = true }: NoResultsFoundProps) {
  return (
    <Wrapper>
      <Heading2>
        No {type} found for "{query}"
      </Heading2>
      <p>Please try another search term</p>
      {showBtn && (
        <Button to={{ pathname: "/search", search: `q=${query}` }}>
          View all
        </Button>
      )}
    </Wrapper>
  );
}

export default NoResultsFound;
