/** This proxy serverless function is currently required for some legacy dynatrace environment apis
 *  which have not be migrated to Settings2.0. It should only be used when native SDKs are not
 *  available. */
export default async function (payload: {
  method: string;
  url: string;
  token: string;
  body?: any;
}) {
  const { method, url, token, body } = payload;

  const requestInit: RequestInit = genRequestInit(token, body, method);

  let apiResponse;
  try {
    apiResponse = await fetch(url, requestInit);
  } catch (error) {
    console.error("Error1:", error);
    return { error };
  }
  try {
    const contentType = apiResponse.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const data = await apiResponse.json();
      console.log("Success");
      return data;
    } else {
      const text = await apiResponse.text();
      console.log("Success");
      return { text };
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      return {};
    } else {
      console.error("Error2:", error);
      return { error };
    }
  }
}

function genRequestInit(token: string, body: any, method: string) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Api-Token " + token);
  if (body) {
    myHeaders.append("Content-Type", "application/json");
  }
  myHeaders.append("Cookie", "p23mn32t=HH5K3BHQ6TZUROQ2MJIAFMULTQ");

  const requestInit: RequestInit = {
    method: method,
    headers: myHeaders,
  };

  if (body) {
    requestInit.body = JSON.stringify(body);
  }
  return requestInit;
}
