import styled from 'styled-components'

type ThumbnailCardProps = {
  id: number;
  title: string;
  src: string;
  onFocus?: React.MouseEventHandler<HTMLLIElement>;
  offFocus?: React.MouseEventHandler<HTMLLIElement>;
  onError?: any;
};

export const ThumbnailCard = (props:ThumbnailCardProps) => {
  const { id, title, src, onFocus, offFocus, onError } = props; 
  const basePosterUrl = "https://image.tmdb.org/t/p/original/";

  return (
    <StyledThumbnailCard data-movie_id={id} onMouseEnter={onFocus} onMouseLeave={offFocus}>
      <StyledThumbnailImage src={`${basePosterUrl}${src}`} alt={title} onError={onError}/>
      <StyledThumbnailCaption>
        <StyledThumbnailTitle>{title}</StyledThumbnailTitle>
        <dt></dt>
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
`;