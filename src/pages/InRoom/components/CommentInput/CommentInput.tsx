import { ChangeEvent, useState } from "react";
// Context
import {
  RemotehandlersContextType,
  useRemoteHandlers,
} from "../../../../context/RemoteHandlers";
// Icons
import { ArrowUp, MessageCircle } from "react-feather";
// Assets
import sigho from "../../../../assets/sigho.png";
import thmbd from "../../../../assets/thmbd.png";
import thmbu from "../../../../assets/thmbu.png";
import clha from "../../../../assets/clha.png";
// Styles
import {
  EmojiesWrapper,
  Input,
  SendButton,
  Wrapper,
} from "./CommentInput.styles";

function CommentInput() {
  const [commentInput, setCommentInput] = useState("");
  const { sendComment } = useRemoteHandlers() as RemotehandlersContextType;

  function handleCommentInput(e: ChangeEvent) {
    const { value } = e.target as HTMLInputElement;

    setCommentInput(value);
  }

  function handleSendComment() {
    if (commentInput) {
      sendComment(commentInput);
      setCommentInput("");
    }
  }

  function handleSendEmoji(emoji: string) {
    const prefix = "//emojistart//";
    const postfix = "//emojiend//";

    sendComment(prefix + emoji + postfix);
  }

  return (
    <>
      <Wrapper>
        <MessageCircle className="icon" />
        <Input
          type="text"
          placeholder="Write your comment..."
          onChange={handleCommentInput}
          value={commentInput}
        />
        <SendButton onClick={handleSendComment}>
          <ArrowUp />
        </SendButton>
      </Wrapper>
      <EmojiesWrapper>
        <button
          className="reset-button"
          onClick={() => handleSendEmoji("clha")}
        >
          <img src={clha} alt="" />
        </button>
        <button
          className="reset-button"
          onClick={() => handleSendEmoji("thmbu")}
        >
          <img src={thmbu} alt="" />
        </button>
        <button
          className="reset-button"
          onClick={() => handleSendEmoji("sigho")}
        >
          <img src={sigho} alt="" />
        </button>
        <button
          className="reset-button"
          onClick={() => handleSendEmoji("thmbd")}
        >
          <img src={thmbd} alt="" />
        </button>
      </EmojiesWrapper>
    </>
  );
}

export default CommentInput;
