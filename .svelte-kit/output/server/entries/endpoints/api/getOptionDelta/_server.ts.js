import { S as SERVER_ENDPOINT } from "../../../../chunks/private.js";
const GET = async ({ url }) => {
  const S = url.searchParams.get("S");
  const K = url.searchParams.get("K");
  const T = url.searchParams.get("T");
  const r = url.searchParams.get("r");
  const sigma = url.searchParams.get("sigma");
  const res = await fetch(`${SERVER_ENDPOINT}/api/options/getDelta?S=${S}&K=${K}&T=${T}&r=${r}&sigma=${sigma}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  } else {
    return new Response(JSON.stringify(data), {
      headers: { "content-type": "application/json" }
    });
  }
};
export {
  GET
};
