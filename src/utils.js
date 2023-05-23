export const parseJsonRpcParams = (params) => ({
  id: params.id,
  jsonrpc: params.jsonrpc,
  method: params.method,
  params: !params.params ? undefined : JSON.parse(params.params)
});
