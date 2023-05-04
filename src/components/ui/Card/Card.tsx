// Assets
import defaultImage from "../../../assets/default_playlist.jpg";
// Styles
import { SubTitle, Title, Wrapper } from "./Card.styles";

interface CardProps {
  link: string;
  image: string;
  title: string;
  subTitle?: string;
  horizontal?: boolean;
}

function Card({ link, image, title, subTitle, horizontal = false }: CardProps) {
  return (
    <Wrapper to={link} $horizontal={horizontal}>
      <div className="image-wrapper">
        <img src={image || defaultImage} alt="" />
      </div>
      <div className="meta-wrapper">
        <Title>{title}</Title>
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
      </div>
    </Wrapper>
  );
}

export default Card;
