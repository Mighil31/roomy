// import axiosConfig from "./axiosConfig";

// // store our JWT in LS and set axios headers if we do have a token

// const setAuthToken = (token: String) => {
//   if (token) {
//     axiosConfig.defaults.headers.common["x-auth-token"] = token;
//     localStorage.setItem("token", token);
//   } else {
//     delete axiosConfig.defaults.headers.common["x-auth-token"];
//     localStorage.removeItem("token");
//   }
// };

// export default setAuthToken;
export {};
