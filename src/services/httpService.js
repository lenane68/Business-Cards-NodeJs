import axios from "axios";
import config from "../config.json";

const instance = axios.create({
  baseURL: config.apiUrl 
});

function setDefaultCommonHeaders(headerName, headerValue) {
  instance.defaults.headers.common[headerName] = headerValue;
}

function get(url) {
  return instance.get(url);
}

function post(url, data) {
  return instance.post(url, data);
}

function put(url, data) {
  return instance.put(url, data);
}

function patch(url, data) {
  return instance.patch(url, data);
}

function remove(url) {
  return instance.delete(url);
}

const httpService = {
  get,
  post,
  put,
  patch,
  delete: remove,
  setDefaultCommonHeaders,
};

export default httpService;
