const fetch = require("node-fetch");

// environment variables
const { CLIENT_SECRET, CLIENT_ID } = process.env;
const USER_ACCESS_ENDPOINT = "https://graph.facebook.com/v9.0/oauth/access_token";
const PAGE_ACCESS_ENDPOINT = "https://graph.facebook.com/me/accounts";
const REDIRECT_URI = "https://live-planner.netlify.app/.netlify/functions/fb_login";

exports.handler = async function(event) {

  // Query the user access token
  const code = event.queryStringParameters.code;

  const request = `${USER_ACCESS_ENDPOINT}?code=${code}&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
  console.log(request);
  return fetch(request, { headers: { "Accept": "application/json" } })
    .then(response => response.json())
    .then(data => 
      fetch(`${PAGE_ACCESS_ENDPOINT}?access_token=${data.access_token}`, { headers: { "Accept": "application/json" } })
      .then(response => response.json())
      .then(data => ({
        statusCode: 200,
        body: data
      }))
      .catch(error => ({ statusCode: 422, body: String(error)})))
    .catch(error => ({ statusCode: 422, body: String(error) }));
}