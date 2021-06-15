import React, { useState, useEffect } from 'react';
import Login from './containers/Login';
import Nthemic from './containers/Nthemic';

const App = () => {
  const [code, setCode] = useState();

  useEffect(() => {
    setCode(new URLSearchParams(window.location.search).get('code'));
  }, [])

  return code ? <Nthemic code={code} /> : <Login />
}

export default App
