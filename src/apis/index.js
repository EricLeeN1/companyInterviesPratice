import request from "@/utils/request";

export function getLists(params = {}) {
  return request({
    url: "/api/agents",
    method: "get",
    params,
  });
}
