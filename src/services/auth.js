import axios from 'axios';

export default class AuthService {
  async postUserToken(token) {
    const response = await axios.get('/users/me/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
}
