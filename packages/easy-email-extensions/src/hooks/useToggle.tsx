import React, { useCallback, useState } from 'react';

const useToggle = () => {
  const [active, setActive] = useState(false);

  const toggle = useCallback(() => {
    setActive(prevState => !prevState);
  }, []);

  return { active, toggle };
};

export default useToggle;
