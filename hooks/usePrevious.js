import { useRef, useEffect } from 'react';

const usePrevious = value => {
  const previous = useRef(value);

  useEffect(() => {
    previous.current = value;
  });

  return previous;
};

export default usePrevious;
