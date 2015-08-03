
module.exports = function(req, res, next){
  console.log('Body: ');
  console.log(req.body)
  console.log('Params: ');
  console.log(req.params);
  console.log('Queries: ');
  console.log(req.query);
  next();
}