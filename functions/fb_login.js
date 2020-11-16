exports.handler = async function(event) {
  import fetch from "node-fetch";
  // environment variables
  const { CLIENT_SECRET, CLIENT_ID } = process.env;
  const API_ENDPOINT = "https://graph.facebook.com/v9.0/oauth/access_token"
  const REDIRECT_URI = "https://live-planner.netlify.app/.netlify/functions/fb_login"

  // Query the user access token
  const code = event.queryStringParameters.code

  const request = `${API_ENDPOINT}?code=${code}&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
  
  return fetch(request, { headers: { "Accept": "application/json" } })
    .then(response => response.json())
    .then(data => ({
      statusCode: 200,
      body: data.access_token
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
}