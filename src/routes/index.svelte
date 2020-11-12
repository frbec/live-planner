<script>
  import FacebookLogin from "../components/FacebookLogin.svelte";
  let FBredirectURI;

  if (process.env.NODE_ENV == "development") {
    FBredirectURI = "http://localhost:3000/";
  } else {
    FBredirectURI = "https://live-planner.netlify.app/";
  }
</script>

<style>
  h1,
  p {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  p {
    margin: 1em auto;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<h1>Great success!</h1>

<FacebookLogin
  clientId="400698430951063"
  redirectUri={FBredirectURI}
  on:success={params => console.log(params)}
  on:error={error => console.log(error)}
  let:onLogin>
  <button on:click={onLogin}>Facebook Login</button>
</FacebookLogin>

<p>
  <strong>
    Try editing this file (src/routes/index.svelte) to test live reloading.
  </strong>
</p>
