
import axios from 'axios';

export default () => {
  return axios.create({
    baseURL: `http://makeup-api.herokuapp.com/api/v1/`,
    crossdomain: true,
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json'
    }
  });
};