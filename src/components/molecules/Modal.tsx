import { Carousel } from '../../components/atoms/Carousel'
import styled from 'styled-components'

type ModalProps = {
  isOpen: boolean;
  type: "iframe" | "img";
  keys?: string[] | any;
};

export const Modal = (props: ModalProps) => {
  const { isOpen, type, keys } = props;
  console.log(keys[0])

  return (
    <StyleModalOverlay>
      { type === "iframe" && 
        <div>
          <Carousel />
        </div>
      }
      Modal
    </StyleModalOverlay>
  )
}

const StyleModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
`;
