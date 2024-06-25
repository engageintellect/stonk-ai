import { S as SERVER_ENDPOINT } from "../../../../chunks/private.js";
const GET = async () => {
  const res = await fetch(`${SERVER_ENDPOINT}/api/interestRates/`);
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
