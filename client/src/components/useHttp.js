import { useAuth0 } from "@auth0/auth0-react";
import { callApi } from "../utils/constants";

const useHttp = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getRequest = async (route) => {
    const token = await getAccessTokenSilently();
    return callApi(route, token);
  };

  const postRequest = async (route, body) => {
    const token = await getAccessTokenSilently();
    return callApi(route, token, "POST", body);
  };

  const putRequest = async (route, body) => {
    const token = await getAccessTokenSilently();
    return callApi(route, token, "PUT", body);
  };

  const deleteRequest = async (route, body) => {
    const token = await getAccessTokenSilently();
    return callApi(route, token, "DELETE", body);
  };

  return [getRequest, postRequest, putRequest, deleteRequest];
};

export { useHttp };
