import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

export const userRegistration = async (email, password) => {
  // make the post request
  const response = await api.post("user/signup/", {
      email: email,
      password: password
  });

  // check the response
  // save the auth token
  if (response.status === 201) {
      const { user, token } = response.data
      localStorage.setItem("token", token)

      // set axios to always use the auth token
      api.defaults.headers.common['Authorization'] = `Token ${token}`
      console.log("axios default auth header ", api.defaults.headers.common['Authorization'])

      return user;
  } 

  // Throw error?
  console.log('error creating user')
  return null;
}

export const userLogIn = async (email, password) => {
  const response = await api.post("user/login/", {
      email: email,
      password: password
  });

  if (response.status === 200) {
      const { user, token } = response.data
      localStorage.setItem("token", token);
      api.defaults.headers.common['Authorization'] = `Token ${token}`;

      console.log('userLogIn() success', user);
      return user;
  }

  console.log('login error', response)
  return null;
}

export const userLogOut = async () => {
  // Authorization Header is already set
  const response = await api.post("user/logout/");
  if (response.status === 204) {
      localStorage.removeItem("token");
      delete api.defaults.headers.common['Authorization'];
      console.log('userLoTOut() logged out')
      return true;
  }

  console.log('userLogOut failed, error, response is ', response);
  return false;
}

export const userConfirmation = async () => {
  const token = localStorage.getItem("token");
  // if user previously logged in
  if (token) {
      api.defaults.headers.common.Authorization = `Token ${token}`;
      const response = await api.get("users/");
      if (response.status === 200) {
          console.log('userConfirmation success, user info', response.data);
          return response.data;
      }
      console.log('user logged in but GET users/ failed', response)
      // TODO: Get the users lists
  }

  console.log('userconfirmation user not logged in')
  return null;
}