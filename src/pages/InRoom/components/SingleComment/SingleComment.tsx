import { memo, useEffect, useState } from "react";
// Cnofig
import { allowedPositions, viewedDuration } from "../../../../config/remote";
// Assets
import sigho from "../../../../assets/sigho.png";
import thmbd from "../../../../assets/thmbd.png";
import thmbu from "../../../../assets/thmbu.png";
import clha from "../../../../assets/clha.png";
// Styles
import { CommentString, Wrapper } from "./SingleComment.styles";
// Types
import { CommentType } from "../../../../types/remote";

interface SingleCommentType {
  comment: CommentType;
  handleRemove: (id: string) => void;
}

let latestPercentage = 0;

function getRandomPercentage(): number {
  const randomIndex = Math.floor(Math.random() * (allowedPositions.length - 1));
  const randomPercentage = allowedPositions[randomIndex];

  if (randomPercentage === latestPercentage) {
    return getRandomPercentage();
  }

  latestPercentage = randomPercentage;
  return randomPercentage;
}

const SingleComment = memo(({ comment, handleRemove }: SingleCommentType) => {
  const [top] = useState(getRandomPercentage);

  useEffect(() => {
    setTimeout(() => {
      handleRemove(comment.id);
    }, viewedDuration);
  }, []);

  const regex = new RegExp("//emojistart//[A-Za-z]+//emojiend//");
  if (regex.test(comment.body)) {
    switch (comment.body) {
      case "//emojistart//clha//emojiend//":
        return (
          <Wrapper pos={top}>
            <img src={clha}></img>
          </Wrapper>
        );
      case "//emojistart//thmbu//emojiend//":
        return (
          <Wrapper pos={top}>
            <img src={thmbu}></img>
          </Wrapper>
        );
      case "//emojistart//thmbd//emojiend//":
        return (
          <Wrapper pos={top}>
            <img src={thmbd}></img>
          </Wrapper>
        );
      case "//emojistart//sigho//emojiend//":
        return (
          <Wrapper pos={top}>
            <img src={sigho}></img>
          </Wrapper>
        );

      default:
        break;
    }
  }

  return (
    <Wrapper pos={top}>
      <CommentString>{comment.body}</CommentString>
    </Wrapper>
  );
});

export default SingleComment;
