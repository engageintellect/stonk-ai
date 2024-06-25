import { S as SERVER_ENDPOINT } from "../../../../chunks/private.js";
const GET = async ({ url }) => {
  const sampleData = url.searchParams.get("ticker");
  const res = await fetch(`${SERVER_ENDPOINT}/api/predict/${sampleData}`);
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
