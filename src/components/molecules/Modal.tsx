import { Carousel } from '../../components/atoms/Carousel';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"
import styled from 'styled-components';

type ModalProps = {
  isOpen: boolean;
  type: "iframe" | "img";
  keys?: any;
  onClose?: any;
  eventBubble?: React.MouseEventHandler<HTMLElement>;
};

type KeyProps = {
  key: string;
  name: string;
}

export const Modal = (props: ModalProps) => {
  const { isOpen, type, keys, onClose, eventBubble } = props;
  const keyValues = keys[0];
  if ( keyValues === undefined ) return null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false
  };

  return (
    <StyleModalOverlay>
      { type === "iframe" &&
        <StyledModal>
          <button onClick={() => onClose(!isOpen)}>close</button>
          <Slider {...settings}>
            { keyValues.map((val:KeyProps, index:number) => (
              <div key={index} onClick={eventBubble}>
                <Carousel 
                  key={index} 
                  embed={val.key} 
                  title={val.name} 
                />
              </div>
            ))}
          </Slider>
        </StyledModal>
      }
    </StyleModalOverlay>
  )
}

const StyleModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  cursor: pointer;
`;

const StyledModal = styled.div`
  width: 570px;
  position: fixed;
  inset: 0;
  margin: 170px auto;
`;