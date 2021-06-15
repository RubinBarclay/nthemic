import { useState, useEffect } from 'react';
// import axios from 'axios';

const useAuth = (code) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    const url = 'http://localhost:4000/login';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(code)
    }

    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        setAccessToken(data.accessToken)
        setRefreshToken(data.refreshToken)
        setExpiresIn(data.setExpiresIn)
        window.history.pushState({}, null, '/')
      })
      .catch(() => {
        window.location = '/'
      })
    }, [code])

    // axios.post('http://localhost:4000/login', code)
    //   .then(res => {
    //     console.log(res.data)
    //     window.history.pushState({}, null, '/')
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //     window.location = '/'
    //   })
  // }, [code])

  useEffect(() => {
    // Prevent refresh if either variable is undefined
    if (!refreshToken || !expiresIn) return

    const interval = setInterval(() => {
      const url = 'http://localhost:4000/refresh';
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: refreshToken })
      }

      fetch(url, options)
        .then(res => res.json())
        .then(data => {
          setAccessToken(data.accessToken)
          setExpiresIn(data.expiresIn)
        })
        .catch(() => {
          window.location = '/'
        })
    }, (expiresIn - 60) * 1000)

    // Fail safe in case a refreshToken were to change before a refresh
    return () => clearInterval(interval);

  }, [refreshToken, expiresIn])

  return accessToken;
}

export default useAuth;
