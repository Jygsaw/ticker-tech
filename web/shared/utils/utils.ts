// TODO implement cookie anti-tampering
/***** Cookie Funcs: begin *****/
export function setCookie(key: string, val: string) {
  document.cookie = `${key}=${val};path=/`;
}

export function getCookie(key: string) {
  let pattern = String.raw `(?:(?:^|.*;\s*)${key}\s*\=\s*([^;]*).*$)|^.*$`;
  return document.cookie.replace(new RegExp(pattern), "$1");
}

export function deleteCookie(key: string) {
  document.cookie = `${key}=;path=/;expires=` + new Date().toUTCString();
}
/***** Cookie Funcs: end *****/

/***** Promise Funcs: begin *****/
export function promiseError(error: any) {
  console.error("An error occurred:", error);
  return Promise.reject(error.message || error);
}
/***** Promise Funcs: end *****/
