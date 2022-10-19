export default function getFavicon(answer: string) {
  const removeHttp = answer.replace("https://", "").replace("http://", "");
  const cleanUrl = `https://${removeHttp.split("/")[0]}/favicon.ico`;
  return cleanUrl;
}
