// eslint-disable-next-line @typescript-eslint/no-explicit-any
const api = async (url:string, options: any) => {
  const { body, headers, ...opts } = options;
  const requestBody = JSON.stringify(body);
  const response = await fetch(`${process.env.APP_URL}/${url}`, {
    body: requestBody,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...opts,
  });
  const result = await response.json();
  return { status: response.status, ...result, url };
};

export default api;
