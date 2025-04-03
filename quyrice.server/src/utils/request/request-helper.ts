export const receiveRequest = (req: any) => {
  const { method, url, headers, body } = req
  return {
    method,
    url,
    headers,
    body
  }
}