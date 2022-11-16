import { useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import CommonBanner from '../components/CommonBanner';
import LoginArea from '../components/LoginArea';
import Cookies from 'js-cookie';

function Login() {

  useEffect(() => {
    axios
      .get(`localhost:8000/customer/profile`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          window.location.href = 'http://localhost:3000/my-account';
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <CommonBanner namePage="Login" />
      <LoginArea />
    </>
  )
};

export default Login;