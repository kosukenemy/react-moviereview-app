import styled from 'styled-components'

type ButtonProps = {
  value: string;
  id?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  colorTheme?: string;
  fontWeight?: 300 | 600;
  fontSize?: number;
  fontColor?: string;
}

export const Button:React.FC<ButtonProps> = ({ ...props }) => {
  return (
    <ButtonStyle 
      theme={{
        main: props.colorTheme, 
        size: props.fontSize,
        weight: props.fontWeight,
        fontColor: props.fontColor
      }} 
      id={ props.id } 
      onClick={ props.onClick }
    >
      { props.value }
    </ButtonStyle>
  )
}

const ButtonStyle = styled.button`
  background: ${({theme}) => theme.main};
  font-size: ${({theme}) => theme.size}px;
  font-weight: ${({theme}) => theme.weight};
  color: ${({theme}) => theme.fontColor};
  outline: none;
  border: none;
  appearance: auto;
  cursor: pointer;
  border-radius: 6px;
  padding: 4px 6px;
  margin: 2px 0;
`;