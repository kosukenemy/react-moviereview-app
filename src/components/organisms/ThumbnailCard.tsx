
type ThumbnailCardProps = {
  key?: number;
  title: string;
  src: string;
}

export const ThumbnailCard = (props:ThumbnailCardProps) => {
  const { title, src } = props; 
  const basePosterUrl = "https://image.tmdb.org/t/p/original/";
  return (
    <li>
      <figure>
        <img src={`${basePosterUrl}${src}`} alt={title} />
        <figcaption>
          <dd>{title}</dd>
          <dt></dt>
        </figcaption>
      </figure>
    </li>
  )
}