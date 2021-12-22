
import styled from 'styled-components'

type SearchBarProps = {
  border?: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const SearchBar = (props:SearchBarProps) => {
  const { border, placeholder, onChange } = props;
  return (
    <>
      <StyledSearchBar 
        theme={{
          border
        }}
        onChange={onChange} 
        placeholder={placeholder}
        type="text" 
      />
    </>
  )
}

const StyledSearchBar = styled.input`
  border: solid 1px ${({theme}) => theme.border};
  border-radius: 3px;
  padding: 5px 10px;
`;