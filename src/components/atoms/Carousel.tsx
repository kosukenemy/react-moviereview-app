import styled from 'styled-components';

type CarouselProps = {
  embed: string;
  title?: string;
};

export const Carousel = (props: CarouselProps) => {
  const { embed, title } = props;

  return (
    <>
      { embed.length === 0 ? 
        <p>再生できるビデオがありません</p>
        :
        <>
          <iframe width="560" height="315" src={`https://www.youtube.com/embed/${embed}`} 
            loading="lazy"
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
          </iframe>
          <StyledCarouselTitle>{title}</StyledCarouselTitle>
        </>
      }
    </>
  )
}

const StyledCarouselTitle = styled.p`
  color: #fff;
  font-weight: 600;
`;