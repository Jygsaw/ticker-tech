export function dbCallWrapper(req, func) {
  try {
    if (typeof func === "function") {
      return func();
    } else {
      throw new Error("invalid database call");
    }
  }
  catch (e) {
    console.error(e.stack);
    req.reply.status = "error";
    req.reply.message = e.message;
    return null;
  }
}

export function setReplyData(req, key, val) {
  if (val !== null) {
    req.reply.data = req.reply.data || {};
    req.reply.data[key] = val;
  }
}
