import { Method, fetchData } from './NetworkManager';
import { endpoint } from './Environment';
import { responseStatusHandler } from './ResponseHandler';

let isBearer = true;

export const getTickets = async () => {
  return fetchData(endpoint.getAllTickets, Method.GET, null, isBearer)
    .then(async result => {
      let response = await responseStatusHandler(result);
      if (response) {
        return response;
      }
      return null;
    })
    .catch(error => {
      console.log('error:', error);
    });
};



export const submitTicket = (data: any) => {
  return fetchData(endpoint.addTicket, Method.POST, data, isBearer)
    .then(async result => {
      let response = await responseStatusHandler(result);
      return response
    })
    .catch(error => {
      console.log('error:', error);
    });
};

