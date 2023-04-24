import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';

import store from './store.js';

function Dashboard() {
  const { auth, user, uids } = useSnapshot(store);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    uids.getList();
  }, []);

  async function createUid() {
    try {
      setError(null);
      if (!user.profile.roles.includes('admin')) {
        alert(
          'You dared to click?! Anyway, I have sent the request to the server to show that it is blocked on the backend side.'
        );
      }
      await uids.create();
    } catch (error) {
      setError(error.message);
    }
  }
  async function logout() {
    auth.logout();
  }

  return (
    <div>
      <h1>
        Connected as {user.profile.username}
        <button onClick={logout}>Logout</button>
      </h1>
      <p>
        Welcome! <br />
      </p>
      <p>
        This is a list of secret uids we manage for our clients. Only admins can
        create new uids.
      </p>
      {uids.list.length === 0 && <p>No uids has been created yet</p>}
      {uids.list.length > 0 && <p>List of uids:</p>}
      {uids.list.length > 0 &&
        uids.list.map((uid, index) => (
          <div key={'uid' + index}>
            uid {index + 1}: {uid}
          </div>
        ))}
      <p>
        {!user.profile.roles.includes('admin') && (
          <span>
            You are not admin. Do <b>not</b> click on this button!
          </span>
        )}
        <button onClick={createUid}>Add uid</button>
        <br />
        {error && <span style={styles.error}>{error}</span>}
      </p>
    </div>
  );
}

const styles = {
  error: {
    color: 'red',
    fontSize: 11,
  },
};

export default Dashboard;
