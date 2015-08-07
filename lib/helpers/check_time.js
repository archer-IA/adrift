// changed allowedMinutes to adjust amount of time needed to reset

var CheckTime = function(time, allowed){
  this.now = Date.now();
  this.time = time;
  this.allowedMinutes = allowed || .1;
}

CheckTime.prototype.msToSeconds = function(ms){
  return ms / 1000; 
}

CheckTime.prototype.minutesToSeconds = function(min){
  return min * 60;
}

CheckTime.prototype.canGetMessage = function(){
  var d_time = this.msToSeconds(this.now) - this.msToSeconds(this.time);
  return d_time > this.minutesToSeconds(this.allowedMinutes);
}

CheckTime.prototype.getChance = function(){
  return .9;
}

module.exports = CheckTime;