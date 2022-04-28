const { useEffect } = require("react");

module.exports = {
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
};
