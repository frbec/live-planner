<script>
  import { createEventDispatcher } from "svelte";

  export let clientId;
  export let state;
  export let redirectUri;
  export let responseType = "code";
  export let scope;

  const dispatch = createEventDispatcher();
  const urlFacebook = "https://www.facebook.com/v9.0/dialog/oauth";
  let interval = 0;
  let popupWindow;

  const convertQueryParams = url => {
    const query = url.substr(1);
    const result = {};

    query.split("&").forEach(param => {
      const item = param.split("=");
      result[item[0]] = decodeURIComponent(item[1]);
    });

    return result;
  };

  const close = () => {
    if (interval) {
      window.clearInterval(interval);
      interval = null;
    }

    popupWindow.close();
  };

  // SvelteGithubLogin based
  const poll = () => {
    interval = window.setInterval(() => {
      try {
        if (!popupWindow || popupWindow.closed !== false) {
          close();
          dispatch("error", new Error("The popup was closed"));
          return;
        }

        if (
          popupWindow.location.href === urlFacebook ||
          popupWindow.location.pathname === "blank"
        ) {
          return;
        }

        dispatch("success", convertQueryParams(popupWindow.location.search));
        close();
      } catch (error) {
        // error
      }
    }, 500);
  };

  const onLogin = () => {
    let urlParams = `client_id=${clientId}&state=${state}&redirect_uri=${redirectUri}`;

    if (responseType) {
      urlParams += `&response_type=${responseType}`;
    }

    if (scope) {
      urlParams += `&scope=${scope}`;
    }
    console.log(urlParams);
    popupWindow = window.open(
      `${urlFacebook}?${urlParams}`,
      "facebook-oauth",
      ""
    );

    dispatch("request");

    poll();
  };
</script>

<slot {onLogin} />
