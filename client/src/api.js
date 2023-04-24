let token = null;

export function setToken(t) {
  token = t;
}

export async function get(url) {
  const options = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return go(url, options);
}

export async function post(url, data) {
  const options = {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return go(url, options);
}

export async function del(url) {
  const options = {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return go(url, options);
}

async function go(url, options) {
  if (token) {
    options.headers['Bearer'] = 'token ' + token;
  }
  const res = await fetch(url, options);
  const data = await res.json();
  if (res.status === 200) {
    return data;
  } else {
    console.error(data);
    throw new Error(data.error);
  }
}
