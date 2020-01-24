import { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { UserContext } from '../utils/userContext';

const useAuth = () => {
  const { loggedIn, setLoggedIn } = useContext(UserContext);
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
          setLoggedIn(true);
          setLoading(false);
        } else {
          setLoggedIn(false);
          setLoading(false);
        }
      } catch (err) {
        setLoggedIn(false);
        setLoading(false);
        console.log(err.message);
      }
    };
    if (mount) {
      checkAuth();
    }
    return () => {
      mount = false;
    };
  }, [setLoggedIn]);

  return { loggedIn, loading };
};

export default useAuth;
