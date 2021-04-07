const fetch = require("node-fetch");

// environment variables
const { CLIENT_SECRET, CLIENT_ID } = process.env;
const USER_ACCESS_ENDPOINT = "https://graph.facebook.com/v9.0/oauth/access_token";
const PAGE_ACCESS_ENDPOINT = "https://graph.facebook.com/me/accounts";
const REDIRECT_URI = process.env.REDIRECT_URI || "https://live-planner.netlify.app/.netlify/functions/fb_login";


getUserAccessData = function(code) {
  return fetch(`${USER_ACCESS_ENDPOINT}?code=${code}&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`, { headers: { "Accept": "application/json" } })
    .then(response => response.json())
    .then(data => data)
    .catch(error => ({ 
      statusCode: 422, 
      body: JSON.stringify(error)
    }))
}

getPageAccessData = function(code) {
  return getUserAccessData(code)
  .then(data => fetch(`${PAGE_ACCESS_ENDPOINT}?access_token=${data.access_token}`, { headers: { "Accept": "application/json" } }))
  .then(response => response.json())
  .then(data => data)
  .catch(error => ({
    statusCode: 422,
    body: JSON.stringify(error)
  }));
}

exports.handler = async function(event) {

  // Query the user access token
  // const userAccessData = await getUserAccessData(event.queryStringParameters.code)
  const pageAccessData = await getPageAccessData(event.queryStringParameters.code)
  return {
    statusCode: 200,
    body: JSON.stringify(pageAccessData)
  }

  // const request = `${USER_ACCESS_ENDPOINT}?code=${code}&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
  // const result = fetch(request, { headers: { "Accept": "application/json" } })
  //   .then(response => {
  //     console.log(response)
  //     return response.json()})
  //   .then(function(data) {
  //     if(!!data.access_token) {
  //       return fetch(`${PAGE_ACCESS_ENDPOINT}?access_token=${data.access_token}`, { headers: { "Accept": "application/json" } })
  //     } else {
  //       return {statusCode: 200, body: JSON.stringify(data)}
  //     }
  //   })
  //   .then(response => response.json())
  //   .then(function(data) {
  //     if (!!data.data) {
  //       return data.data;
  //     } else {
  //       return { statusCode: 200, body: data.error.message }
  //     }
  //   })
  //   .then((data) => {
  //     const jsonArray = JSON.stringify(data)
  //     return { statusCode: 200, body: jsonArray }
  //   })
  //   .catch(error => {
  //     console.log(error)
  //     ({ statusCode: 422, body: String(error) })
  //   });

  // return {
  //   statusCode: 200,
  //   headers: {
  //     "Content-type": "application/json"
  //   },
  //   body: JSON.stringify(result)
  // }
}