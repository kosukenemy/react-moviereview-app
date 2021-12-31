import styled from 'styled-components'
import { FiPlay } from "@react-icons/all-files/fi/FiPlay"

type ThumbnailCardProps = {
  id: number;
  title: string;
  src: string;
  onFocus?: React.MouseEventHandler<HTMLElement>;
  onError?: any;
};

export const ThumbnailCard = (props:ThumbnailCardProps) => {
  const { id, title, src, onFocus, onError } = props; 
  const basePosterUrl = "https://image.tmdb.org/t/p/original/";

  return (
    <StyledThumbnailCard>
      <div style={{ position: 'relative' }}>
        <StyledThumbnailImage loading='lazy' src={`${basePosterUrl}${src}`} alt={title} onError={onError}/>
        <StyledPlayButton data-movie_id={id} onClick={onFocus}>
          <FiPlay size={16} color={'#708090'} />
          <p>予告編</p>
        </StyledPlayButton>
      </div>
        <StyledThumbnailCaption>
          <StyledThumbnailTitle>{title}</StyledThumbnailTitle>
        </StyledThumbnailCaption>
    </StyledThumbnailCard>
  )
}

const StyledThumbnailCard = styled.figure`
  background: transparent;
`;

const StyledThumbnailImage = styled.img`
  border-radius: 10px;
`;

const StyledThumbnailCaption = styled.figcaption`
  margin: 10px auto 20px;
`;

const StyledThumbnailTitle = styled.dd`
  font-weight: bold;
  margin: 0 auto 10px;
`;

const StyledPlayButton = styled.button`
  position: absolute;
  right: 4px;
  bottom: 10px;
  display: flex;
  align-items: center;
  outline: none;
  border: none;
  appearance: none;
  background: #f5f5f5;
  cursor: pointer;
  color: #708090;
  border-radius: 6px;

  p {
    margin: 0;
    font-weight: 600;
    font-size: 14px;
    line-height: 1.3;
}
  }
  &:hover {
    opacity: 0.7;
  }
`;