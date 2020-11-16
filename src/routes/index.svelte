<script context="module">
  export async function preload({ params, query }) {
    const module = await import("svelte-formly");
    const Field = module.Field;
    const valuesForm = module.valuesForm;
    return { Field, valuesForm };
  }
</script>

<script>
  import FacebookLogin from "../components/FacebookLogin.svelte";
  let FBredirectURI;

  if (process.env.NODE_ENV == "development") {
    FBredirectURI = "http://localhost:3000/";
  } else {
    FBredirectURI =
      "https://live-planner.netlify.app/.netlify/functions/fb_login";
  }
  // Start svelte-formly
  import { onMount } from "svelte";
  import { get } from "svelte/store";

  export let Field;
  export let valuesForm;

  const fields = [
    {
      type: "text",
      name: "title",
      id: "title",
      label: "Title",
      validation: ["required"],
      messages: {
        required: "Title is required!"
      }
    },
    {
      type: "text",
      name: "description",
      id: "description",
      label: "Description",
      validation: ["required"],
      messages: {
        required: "Description is required!"
      }
    }
  ];

  function onSubmit() {
    const data = get(valuesForm);
    if (data.isValidForm) {
      const values = data.values;
      console.log("values", values);
    }
  }
  //end svelte-formly
</script>

<style>
  h1 {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>Live Planner</title>
</svelte:head>

<h1>Live Planner</h1>

<FacebookLogin
  clientId="400698430951063"
  state="1"
  redirectUri={FBredirectURI}
  scope="pages_manage_posts pages_read_engagement"
  on:success={params => console.log(params)}
  on:error={error => console.log(error)}
  let:onLogin>
  <button on:click={onLogin}>Facebook Login</button>
</FacebookLogin>

<form on:submit|preventDefault={onSubmit}>
  <svelte:component this={Field} {fields} />
  <button type="submit">Submit</button>
</form>
