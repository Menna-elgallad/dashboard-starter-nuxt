import { getActivePinia } from "pinia";
export function resetStore(current: Array<string>) {
  const pinia = getActivePinia();
  pinia._s.forEach((store) => {
    if (!current.includes(store.$id) && store.$id !== "Main") {
      store.$reset();
    }
  });
}
