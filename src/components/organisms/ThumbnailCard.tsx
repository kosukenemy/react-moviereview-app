
type ThumbnailCardProps = {
  id: number;
  title: string;
  src: string;
  onFocus?: React.MouseEventHandler<HTMLLIElement>;
  offFocus?: React.MouseEventHandler<HTMLLIElement>
};

export const ThumbnailCard = (props:ThumbnailCardProps) => {
  const { id, title, src, onFocus, offFocus } = props; 
  const basePosterUrl = "https://image.tmdb.org/t/p/original/";

  return (
    <figure data-movie_id={id} onMouseEnter={onFocus} onMouseLeave={offFocus}>
      <img src={`${basePosterUrl}${src}`} alt={title} />
      <figcaption>
        <dd>{title}</dd>
        <dt></dt>
      </figcaption>
    </figure>
  )
}