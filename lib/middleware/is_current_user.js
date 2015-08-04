module.exports = function(req, res, next){
  if(req.session.currentUser){
    next();
  }else{
    res.json({status: 'failure', message: 'not logged in'});
  }
}