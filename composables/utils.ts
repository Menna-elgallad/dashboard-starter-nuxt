import { ElNotification } from "element-plus";

export function copyText(slug: string) {
  navigator.clipboard.writeText(slug);
  ElNotification({
    type: "success",
    message: h("h1", { style: "color:#1BC5C3" }, "Code copied Successfully"),
  });
}

export function checkRouteDispatch(to, from) {
  const toRoue = to.fullPath.split("/");
  const fromRoute = from.fullPath.split("/");

  return toRoue[toRoue.length - 2] == fromRoute[fromRoute.length - 1];
}
export function checkSecParent(to, from) {
  const toRoue = to.fullPath.split("/");
  const fromRoute = from.fullPath.includes("?")
    ? from.fullPath.split("?")[0].split("/")
    : from.fullPath.split("/");

  return toRoue[2] == fromRoute[2];
}
export function checkparent(to, from) {
  const toRoue = to.fullPath.split("/");
  const fromRoute = from.fullPath.split("/");

  return toRoue[1] == fromRoute[1];
}
