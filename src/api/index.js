/**
 * Mocking client-server processing
 */
import giraffes from '../assets/json/giraffes.json';
import services from '../assets/json/services.json';

export default {
  getGiraffes: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(giraffes);
      }, 500);
    });
  },
  getServices: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(services);
      }, 500);
    });
  }
};
