import * as React from 'react';
import styled from 'styled-components';

type TextEditProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  onChange?: (value: string) => void;
};

export const TextEdit: React.FC<TextEditProps> = ({ onChange, ...props }) => {
  const changeHandler = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value),
    [onChange]
  );
  return <Input {...props} onChange={changeHandler} />;
};

const Input = styled.input`
  width: 250px;
  padding: 8px;
  font-size: 12pt;
  border: 1px solid #00000066;
  border-radius: 4px;
`;
