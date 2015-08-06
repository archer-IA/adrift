module.exports = function(req, res, next){
  if(req.session.currentUser){
    next();
  }else{
    if(req.get('Content-Type') === 'application/json'){
      res.json({status: 'failure', message: 'not logged in'});
    }else{
      res.redirect('/');
    }
  }
}