import axios from "axios";
//Local run
// const instance = axios.create({
//   baseURL: "http://localhost:9000",
// });

//Server run
const instance = axios.create({
  baseURL: "https://photo-social-mern.azurewebsites.net",
});
export default instance;
