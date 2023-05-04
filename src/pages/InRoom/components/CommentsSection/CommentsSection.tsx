import { useCallback, useEffect, useState } from "react";
import { reset_comment, selectRemoteComment } from "../../../../slices/remote";
import { useAppSelector } from "../../../../store/hooks";
import { CommentType } from "../../../../types/remote";
import SingleComment from "../SingleComment";
import { Wrapper } from "./CommentsSection.styles";
import { useDispatch } from "react-redux";

function CommentsSection() {
  const [internComments, setInternComments] = useState<CommentType[]>([]);
  const storeComment = useAppSelector(selectRemoteComment);
  const dispatch = useDispatch();

  useEffect(() => {
    if (storeComment) {
      setInternComments((prev) => [...prev, storeComment]);
      dispatch(reset_comment());
    }
  }, [storeComment]);

  const handleRemoveComment = useCallback((id: string) => {
    setInternComments((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return (
    <Wrapper>
      {internComments.map((comment) => (
        <SingleComment
          key={comment.id}
          comment={comment}
          handleRemove={handleRemoveComment}
        />
      ))}
    </Wrapper>
  );
}

export default CommentsSection;
