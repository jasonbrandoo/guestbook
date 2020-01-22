import { useState, useEffect } from 'react';
import Axios from 'axios';
import Cookie from 'js-cookie';

const useAuth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mount = true;
    setLoading(true);
    const checkAuth = async () => {
      try {
        const response = await Axios.get('http://localhost:3001/user/auth', {
          withCredentials: true,
        });
        if (response.status === 200) {
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
      } catch (err) {
        setIsLogin(false);
        console.log(err.message);
      }
    };
    if (mount) {
      checkAuth();
      setLoading(false);
    }
    return () => {
      mount = false;
    };
  }, []);

  return { isLogin, loading };
};

export default useAuth;
