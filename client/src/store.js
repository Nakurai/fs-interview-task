import { proxy } from 'valtio';
import * as api from './api.js';

const rootUrl = process.env.REACT_APP_API_URL;

const auth = proxy({
  isAuth: false,
  token: null,
  loading: false,
  init: async () => {
    try {
      auth.loading = true;
      const token = localStorage.getItem('token');
      if (token) {
        auth.token = token;
        api.setToken(token);
        await user.getProfile();
        auth.isAuth = true;
      }
    } catch (error) {
      throw error;
    } finally {
      auth.loading = false;
    }
  },
  login: async (username, password) => {
    try {
      auth.loading = true;
      const url = `${rootUrl}/auth/login`;
      const res = await api.post(url, { username, password });
      api.setToken(res.token);
      auth.isAuth = true;
      auth.token = res.token;
      user.profile = res.user;
      localStorage.setItem('token', res.token);
    } catch (error) {
      throw error;
    } finally {
      auth.loading = false;
    }
  },
  logout: async () => {
    try {
      const url = `${rootUrl}/auth/logout`;
      const res = await api.get(url);
      api.setToken(null);
      auth.isAuth = false;
      auth.token = null;
      user.profile = {};
      localStorage.removeItem('token');
    } catch (error) {
      throw error;
    } finally {
      auth.loading = false;
    }
  },
});
const user = proxy({
  profile: null,
  getProfile: async () => {
    try {
      const url = `${rootUrl}/user/profile`;
      const res = await api.get(url);
      user.profile = res;
    } catch (error) {
      throw error;
    }
  },
});
const uids = proxy({
  list: [],
  getList: async () => {
    try {
      const url = `${rootUrl}/uid`;
      const res = await api.get(url);
      uids.list = res.uids;
    } catch (error) {
      throw error;
    }
  },
  create: async () => {
    try {
      const url = `${rootUrl}/uid/new`;
      const res = await api.get(url);
      console.log('in create ', res);
      uids.list.push(res.uid);
      return res;
    } catch (error) {
      throw error;
    }
  },
});

const state = proxy({ auth, user, uids });
export default state;
