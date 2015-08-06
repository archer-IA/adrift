var CheckTime = function(time, allowed){
  this.now = Date.now();
  this.time = time;
  this.allowedMinutes = allowed || 2;
}

CheckTime.prototype.msToSeconds = function(ms){
  return (ms / 1000) 
}

CheckTime.prototype.minutesToSeconds = function(min){
  return (min * 60) 
}

CheckTime.prototype.canGetMessage = function(){
  return (this.toMinutes(this.now) - this.toMinutes(this.time)) > this.minuteToSeconds(this.allowedMinutes);
}

module.exports = CheckTime;