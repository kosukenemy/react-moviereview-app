import styled from 'styled-components'

type TypeList = {
  key?: number;
  name: string;
  id: string;
  eventHandler: React.MouseEventHandler<HTMLButtonElement>;
}

export const ListButton:React.FC<TypeList> = ({ ...props }) => {
  return (
    <Button key={props.key} id={props.id} onClick={props.eventHandler}>
      { props.name }
    </Button>
  )
}

const Button = styled.button`
  color: royalblue;
`;