import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useRouter } from 'next/router';

const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(
    typeof window === 'undefined' ? '' : localStorage.getItem('status'),
  );
  const [loading, setLoading] = useState(true);
  const { pathname } = useRouter();

  useEffect(() => {
    localStorage.setItem('status', loggedIn);
  }, [loggedIn]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await Axios.get('http://localhost:3001/user/auth', {
          withCredentials: true,
        });
        if (response.status === 200) {
          setLoggedIn(true);
          setLoading(false);
        } else {
          setLoggedIn(false);
          setLoading(false);
        }
      } catch (err) {
        setLoggedIn(false);
        setLoading(false);
      }
    };
    checkAuth();
  }, [pathname]);

  return [loggedIn, loading];
};

export default useAuth;
