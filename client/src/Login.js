import { useState } from 'react';
import { useSnapshot } from 'valtio';

import store from './store.js';

function Login() {
  const { auth } = useSnapshot(store);
  const [formInputs, setFormInputs] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);

  function onChange(e) {
    setFormInputs({ ...formInputs, [e.target.id]: e.target.value.trim() });
  }
  async function onSubmit(e) {
    try {
      setError(null);
      e.preventDefault();
      e.stopPropagation();
      await auth.login(formInputs.username, formInputs.password);
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <form onSubmit={onSubmit} style={styles.form}>
      <label>
        Email ( 'reader@fs.com' or 'admin@fs.com'): <br />
        <input type='text' id='username' onChange={onChange} />
      </label>
      <br />
      <label>
        Password (readerreader or adminadmin): <br />
        <input type='password' id='password' onChange={onChange} />
      </label>
      <br />
      <br />
      <input type='submit' id='password' value='login' />
      <br />
      <br />
      {error && <div style={styles.error}>{error}</div>}
    </form>
  );
}

export default Login;

const styles = {
  form: { padding: 20 },
  error: { color: 'red', fontSize: 11 },
};
