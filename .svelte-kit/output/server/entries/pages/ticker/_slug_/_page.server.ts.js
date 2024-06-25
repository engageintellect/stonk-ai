import { S as SERVER_ENDPOINT } from "../../../../chunks/private.js";
const load = async ({ params }) => {
  const res = await fetch(`${SERVER_ENDPOINT}/api/stock/${params.slug}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data from server");
  } else {
    const data = await res.json();
    return data;
  }
};
export {
  load
};
