module.exports = (server, options) => {
  return {
    authenticate: (request, h) => {
      const req = request.raw.req;
      const firstName = req.headers.firstName;
      if(firstName !== "Richard" || firstName !== "Safa" || firstName !== "Ryan" || firstName !== "Ishika") {
        return h.unauthenticated();
      } else {
        return h.authenticated({credentials: {name: firstName}})
      }
    }
  }
}
