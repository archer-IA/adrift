// changed allowedMinutes to adjust amount of time needed to reset

var CheckTime = function(time, allowed){
  this.now = Date.now();
  this.time = time;
  this.allowedMinutes = allowed || 0.25;
}

CheckTime.prototype.msToSeconds = function(ms){
  return ms / 1000; 
}

CheckTime.prototype.minutesToSeconds = function(min){
  return min * 60;
}

CheckTime.prototype.canGetMessage = function(){
  console.log(this.now);
  console.log(this.time);
  var d_time = this.msToSeconds(this.now) - this.msToSeconds(this.time);
  // console.log(d_time);
  return d_time > this.minutesToSeconds(this.allowedMinutes);
}

CheckTime.prototype.getChance = function(){
  return 0;
}

module.exports = CheckTime;