const { useEffect } = require("react");
const { authSettings } = require("../utils/authSettings");

module.exports = {
  MODAL_STYLES: {
    content: {
      width: "24vw",
      height: "fit-content",
      borderRadius: "8px",
      border: "2px #316a74 solid",
      left: "38vw",
      top: "15vh",
    },
    overlay: {
      zIndex: 2,
    },
  },
  getCurrentDate: () =>
    new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0],
  capitalize: (text) => text.charAt(0).toUpperCase() + text.slice(1),
  useOutsideClick: ({ ref1, ref2 }, setClickedOutside) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref1.current && !ref1.current.contains(event.target)) {
          setClickedOutside(false);
        } else if (ref2.current && ref2.current.contains(event.target)) {
          setClickedOutside(true);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [ref1, ref2]);
  },
  callApi: async (route, token, method, body) => {
    try {
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
  },
};
