import { useAuth0 } from "@auth0/auth0-react";
import { authSettings } from "../utils/authSettings";

const callApi = async (route, method, body) => {
  const { getAccessTokenSilently } = useAuth0();

  try {
    const token = await getAccessTokenSilently();
    const path = authSettings.BACKEND_API + route;
    const options = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (method) Object.assign(options, { method: method });
    if (body) Object.assign(options, { body: JSON.stringify(body) });

    const response = await fetch(path, options);
    const responseData = response.status === 200 ? await response.json() : {};

    return {
      status: response.status,
      statusText: response.statusText,
      data: responseData,
    };
  } catch (error) {
    return error.message;
  }
};

const getRequest = (route) => {
  return callApi(route);
};

const postRequest = (route, body) => {
  return callApi(route, "POST", body);
};

const putRequest = (route, body) => {
  return callApi(route, "PUT", body);
};

const deleteRequest = (route, body) => {
  return callApi(route, "DELETE", body);
};

export { getRequest, postRequest, putRequest, deleteRequest };
