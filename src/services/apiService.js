import axios from "axios";

const apiEndpoint = "http://localhost:3000/";
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export async function getData(url, params) {
  //   let token = getCache('token')
  //   if (token) {
  //     headers.Authorization = `Bearer ${token}`
  //   }
  axios.defaults.headers = headers;
  let response = await axios.get(`${apiEndpoint}${url}`, { params: params });
  return response.data;
}

export async function sendData(url, data, type = "POST") {
  // let token = getCache("token");
  // if (token) {
  //   headers.Authorization = `Bearer ${token}`;
  // }
  axios.defaults.headers = headers;
  let response;

  if (type === "POST")
    response = await axios.post(`${apiEndpoint}${url}`, data);
  else if (type === "DELETE")
    response = await axios.delete(`${apiEndpoint}${url}`, data);
  else if (type === "PUT")
    response = await axios.put(`${apiEndpoint}${url}`, data);
  else if (type === "PATCH")
    response = await axios.patch(`${apiEndpoint}${url}`, data);

  return response.data;
}
