import axios from 'axios';

export const FindId = async (email: string) => {
  return await axios.post('/members/find/id', {
    email,
  });
}

export const FindPwd = async (email: string, id: string) => {
  return await axios.post('/members/find/pwd', {
    email,
    id,
  });
};