//used to process the incoming requests before handling them down to the route
const asyncMiddleware=fn=>(req, res, next)=>{Promise.resolve(fn(req, res, next)).catch(next)};
module.exports = asyncMiddleware;