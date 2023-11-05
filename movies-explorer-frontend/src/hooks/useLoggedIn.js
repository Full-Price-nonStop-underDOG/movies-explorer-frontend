import { useState } from 'react';

export function useLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return {
    isLoggedIn,
    setIsLoggedIn,
  };
}
