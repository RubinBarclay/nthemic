import { useState, useEffect } from 'react';

const useAuth = (code) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  // Login Handler
  useEffect(() => {
    const url = 'http://localhost:4000/login';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    }

    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        setAccessToken(data.accessToken)
        setRefreshToken(data.refreshToken)
        setExpiresIn(data.expiresIn)
        window.history.pushState({}, null, '/')
      })
      .catch(() => {
        // window.location = '/'
      })
    }, [code])

  // Refresh handler
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
