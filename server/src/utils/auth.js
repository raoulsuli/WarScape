const { auth, claimCheck } = require("express-oauth2-jwt-bearer");

const AUTH0_AUDIENCE = "http://localhost:5000";
const AUTH0_DOMAIN = "dev-jflf6hli.eu.auth0.com";

const checkJwt = auth({
  audience: AUTH0_AUDIENCE,
  issuerBaseURL: `https://${AUTH0_DOMAIN}/`,
});

const checkPermission = claimCheck((claims) =>
  claims.permissions.includes("warscape:admin")
);

module.exports = { checkJwt, checkPermission };
