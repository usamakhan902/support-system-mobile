import { Key } from '../constants/Keys';
import { getDataFromStorage } from '../utils/storage';
import { baseURL } from './Environment';
export const AUTHORIZE = 'AUTHORIZE';
export const NETWORK_ERROR = 'NETWORK ERROR';
export const EXPIRED_STATE = 3000204;

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum Status {
  SUCCESS = 200,
  SUCCESS_WITH_CONDITION = 201,
  ERROR = 400,
  AUTHENTICATION_FAIL = 401,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

var defaultHeaders: any = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const callApi = async (
  endPoint: String,
  method: Method,
  data: any,
  isBearer: boolean,
  multipart: boolean,
) => {
  var url = baseURL + endPoint;
  if (isBearer) {
    const token = await getDataFromStorage(Key.token);
    defaultHeaders['Authorization'] = 'Bearer ' + token;
  } else {
    delete defaultHeaders.Authorization;
  }
  if (multipart) {
    defaultHeaders['Content-Type'] = 'multipart/form-data';
  } else {
    defaultHeaders['Content-Type'] = 'application/json';
  }
  return fetch(url, {
    method: method,
    headers: defaultHeaders,
    body:
      method === Method.GET || method === Method.DELETE
        ? undefined
        : multipart
          ? data
          : JSON.stringify(data),
  })
    .then(response => {
      const status = response.status;
      let responseData = response.json();
      return responseData.then(responseJson => {
        responseJson['code'] = status;
        return responseJson;
      });
    })
    .catch(error => {
      console.log('error:', error);
    });
};

export const fetchData = async (
  uri: string,
  method = Method.GET,
  data = null,
  isBearer = true,
  multipart = false,
) => {
  const resData = await callApi(
    uri,
    method,
    data,
    isBearer,
    multipart,
  );
  return resData;
};
