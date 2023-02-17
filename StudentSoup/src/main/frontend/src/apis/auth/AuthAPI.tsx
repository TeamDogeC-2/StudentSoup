import axios from 'axios';

export const signIn = async (id: string, password: string) => {
  const res = await axios.post('/members/login', {
    id,
    pwd: password,
  });
  return res;
};
