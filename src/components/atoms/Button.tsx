import styled from 'styled-components'

type ButtonProps = {
  value: string;
  id?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  colorTheme?: string;
  border?:string;
  fontWeight?: 300 | 600;
  fontSize?: number;
  fontColor?: string;
}

export const Button = (props:ButtonProps) => {
  const { id, colorTheme, border, fontSize, fontWeight, fontColor, onClick, value } = props;
  return (
    <StyledButton 
      theme={{
        main: colorTheme, 
        border:border,
        size: fontSize,
        weight: fontWeight,
        fontColor: fontColor
      }} 
      id={id} 
      onClick={onClick}
    >
      {value}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  background: ${({theme}) => theme.main};
  font-size: ${({theme}) => theme.size}px;
  font-weight: ${({theme}) => theme.weight};
  color: ${({theme}) => theme.fontColor};
  outline: ${({theme}) => theme.main};
  border: solid 1px ${({theme}) => theme.border};
  appearance: auto;
  cursor: pointer;
  letter-spacing: 0.1em;
  border-radius: 10px;
  padding: 4px 6px;
  margin: 2px 1px;

  &:focus {
    background: ${({theme}) => theme.fontColor};
    color: ${({theme}) => theme.main};
  }
`;