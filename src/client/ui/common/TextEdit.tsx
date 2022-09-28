import * as React from 'react';
import styled from 'styled-components';

type TextEditProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  onChange?: (value: string) => void;
  onEnter?: () => void;
};

export const TextEdit: React.FC<TextEditProps> = ({
  onChange,
  onEnter,
  ...props
}) => {
  const changeHandler = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value),
    [onChange]
  );
  const keyHandler = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.code === 'Enter') {
        onEnter?.();
      }
    },
    [onEnter]
  );
  return <Input {...props} onChange={changeHandler} onKeyUp={keyHandler} />;
};

const Input = styled.input`
  width: 250px;
  padding: 8px;
  font-size: 12pt;
  border: 1px solid #00000066;
  border-radius: 4px;
`;
