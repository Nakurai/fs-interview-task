import { useEffect } from 'react';
import { useSnapshot } from 'valtio';

import Login from './Login.js';
import Dashboard from './Dashboard.js';

import store from './store.js';

function App() {
  const { auth } = useSnapshot(store);

  useEffect(() => {
    console.log('in auth init');
    auth.init();
  }, []);

  return (
    <div className='App'>
      {auth.loading && 'Loading...'}
      {!auth.isAuth && <Login />}
      {auth.isAuth && <Dashboard />}
    </div>
  );
}

export default App;
