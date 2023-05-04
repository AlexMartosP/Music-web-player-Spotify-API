import { ChangeEvent, KeyboardEvent, useState } from "react";
import { AlertCircle, X } from "react-feather";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import Heading2 from "../../ui/Heading2";
import { InputWrapper } from "../../ui/InputWrapper";
import {
  ErrorText,
  TextAreaWrapper,
  TopWrapper,
  Wrapper,
} from "./InputModal.styles";

interface InputModalProps {
  title: string;
  onSubmit: (name: string, description: string) => void;
  onClose: () => void;
  descriptionRequired?: boolean;
}

function InputModal({
  title,
  onSubmit,
  onClose,
  descriptionRequired,
}: InputModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<{
    position: "name" | "description" | "";
    message: string;
  }>({
    position: "",
    message: "",
  });

  function handleSubmit() {
    if (name === "") {
      setError({
        position: "name",
        message: "Name is required",
      });
      return;
    }

    if (descriptionRequired) {
      if (description === "") {
        setError({
          position: "description",
          message: "Description is required",
        });
        return;
      }
    }

    onSubmit(name, description);
  }

  function handleNameChange(e: ChangeEvent) {
    const { value } = e.target as HTMLInputElement;

    if (value) {
      setError({
        position: "",
        message: "",
      });
    } else {
      setError({
        position: "name",
        message: "Name is required",
      });
    }
    setName(value);
  }

  function handleDescriptionChange(e: ChangeEvent) {
    const { value } = e.target as HTMLInputElement;

    if (descriptionRequired) {
      if (value) {
        setError({
          position: "",
          message: "",
        });
      } else {
        setError({
          position: "name",
          message: "Name is required",
        });
      }
    }

    setDescription(value);
  }

  function preventEnter(e: KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  return (
    <Wrapper>
      <TopWrapper>
        <Heading2 className="flex-1">{title}</Heading2>
        <button className="reset-button" onClick={onClose}>
          <X />
        </button>
      </TopWrapper>
      {error.message && (
        <ErrorText>
          <AlertCircle />
          {error.message}
        </ErrorText>
      )}
      <div>
        <InputWrapper error={error.position === "name"}>
          <input
            type="text"
            placeholder="Playlist name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </InputWrapper>
      </div>
      <TextAreaWrapper error={error.position === "description"}>
        <textarea
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
          onKeyDown={preventEnter}
        ></textarea>
      </TextAreaWrapper>
      <Button onClick={handleSubmit}>Create</Button>
    </Wrapper>
  );
}

export default InputModal;
