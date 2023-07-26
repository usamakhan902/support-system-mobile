import {Method, fetchData} from './NetworkManager';
import {endpoint} from './Environment';
import {responseStatusHandler} from './ResponseHandler';

let isBearer = true;
export const login = async (data: any) => {
  return fetchData(endpoint.login, Method.POST, data, isBearer)
    .then(async result => {
      try {
        let response = await responseStatusHandler(result);
        return response;
      } catch (error) {
        console.log('error:', error);
        return null;
      }
    })
    .catch(error => {
      console.log('error:', error);
    });
};
