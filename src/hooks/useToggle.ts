import { useState, useCallback } from 'react';

// Custom hook 1: useToggle with explicit return type
export const useToggle = (initialValue: boolean = false): [boolean, () => void] => {
  const [value, setValue] = useState<boolean>(initialValue);
  
  const toggle = useCallback((): void => {
    setValue((prev) => !prev);
  }, []);
  
  return [value, toggle];
};
