
type CarouselProps = {
  embed: string;
  title?: string;
}

export const Carousel = (props: CarouselProps) => {
  const { embed, title } = props;
  return (
    <div>
      <iframe width="560" height="315" src={`https://www.youtube.com/embed/${embed}`} 
        loading="lazy"
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
      </iframe>
      <p>{title}</p>
    </div>
  )
}
