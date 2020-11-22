module.exports = (ctx, message, commonInfo) => {
  const {
    method,  // 請求方法 GET POST 或其他
    url,		  // 請求連結
    host,	  // 發送請求的客戶端的 HOST
    headers	  // 請求中的 headers
  } = ctx.request;
  const client = {
    // method,
    // url,
    // host,
    message,
    // referer: headers['referer'],  // 請求的源地址
    // userAgent: headers['user-agent']  // 客戶端信息，設備及瀏覽器信息
  }
  return JSON.stringify(Object.assign(commonInfo, client));
}