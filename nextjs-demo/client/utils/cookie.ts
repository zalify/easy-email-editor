export function setCookie(name: string, value: string, timeout: number) {
  const d = new Date();
  d.setTime(d.getTime() + timeout * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + "";
}

export function getCookie(key: string) {
  let value = "";
  document.cookie.split(";").forEach((item) => {
    const name = item.split("=")[0];
    if (name.trim() === key) {
      value = item.replace(`${name}=`, "");
    }
  });
  return value;
}
