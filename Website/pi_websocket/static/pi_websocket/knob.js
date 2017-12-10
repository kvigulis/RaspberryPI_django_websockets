socket = new WebSocket("ws://" + window.location.host + "/chat/");
socket.onmessage = function(e) {
      //console.log("Response from server: ", e.data);
  } 

socket.onopen = function() {      
   
    
var Dimmer, dimmer;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
Dimmer = (function() { 
  target_float = 0 
  Dimmer.prototype.raf = null;
  Dimmer.prototype.mdown = false;
  Dimmer.prototype.mPos = {
    x: 0,
    y: 0
  };
  Dimmer.prototype.elementPosition = {
    x: 0,
    y: 0
  };
  Dimmer.prototype.target = 0;
  Dimmer.prototype.steps = 50;
  Dimmer.prototype.radius = 150;
  Dimmer.prototype.maxDiff = 150;
  Dimmer.prototype.constraint = 360;
  Dimmer.prototype.maxAngle = 250;
  function Dimmer($context) {
    var knobOffset;
    this.$context = $context;
    this.onMouseMove = __bind(this.onMouseMove, this);
    this.onMouseUp = __bind(this.onMouseUp, this);
    this.onMouseDown = __bind(this.onMouseDown, this);
    this.$body = $("body");
    this.$knob = this.$context.find(".knob");
    this.$handle = this.$context.find(".handle");
    this.$progress = this.$context.find(".progress");
    this.$center = this.$context.find(".center");
    this.$textOutput = this.$center.find("span");
    this.ctx = this.$progress.get(0).getContext("2d");
    knobOffset = this.$knob.offset();
    this.elementPosition = {
      x: knobOffset.left,
      y: knobOffset.top
    };
    this.centerX = this.$progress.width() / 2;
    this.centerY = this.$progress.height() / 2;
    this.canvasSize = this.$progress.width();
    this.addEventListeners();
    this.drawLine();
    this.draw();
    return;
  }
  Dimmer.prototype.addEventListeners = function() {
    this.$context.on("mousedown", this.onMouseDown);
    this.$context.on("mousemove", this.onMouseMove);
    $("body").on("mouseup", this.onMouseUp);
  };
  Dimmer.prototype.setDimmerPosition = function() {
    this.draw();
  };
  Dimmer.prototype.drawLine = function(endAngle) {
    var radius, startAngle, x, y;
    this.ctx.save();
    this.ctx.translate(this.centerX, this.centerY);
    this.ctx.rotate(145 * (Math.PI / 180));
    startAngle = 0;
    radius = 93;
    x = 0;
    y = 0;
    this.ctx.moveTo(98, 0);
    this.ctx.beginPath();
    this.ctx.shadowBlur = 10;
    this.ctx.lineWidth = 2.4;
    this.ctx.strokeStyle = "#fffdcf";
    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = "#fff";
    this.ctx.arc(x, y, radius, startAngle, endAngle, false);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#7f7f7f";
    this.ctx.shadowBlur = 0;
    this.ctx.arc(x, y, radius, endAngle, (this.maxAngle * Math.PI) / 180, false);
    this.ctx.stroke();
    return this.ctx.restore();
  };
  Dimmer.prototype.drawSteps = function() {
    var i, steps;
    steps = 4;
    this.ctx.save();
    this.ctx.translate(this.centerX, this.centerY);
    this.ctx.rotate((135 * Math.PI) / 180);
    for (i = 0; i <= steps; i += 1) {
      this.ctx.beginPath();
      this.ctx.rotate((180 * Math.PI) / 180 / steps);
      this.ctx.strokeStyle = "#7f7f7f";
      this.ctx.lineWidth = 2;
      this.ctx.lineTo(108, 0);
      this.ctx.lineTo(100, 0);
      this.ctx.stroke();
    }
    this.ctx.restore();
  };
  Dimmer.prototype.drawNumbers = function() {
    var angle, i, radius, step, steps, x, y;
    steps = 4;
    angle = 180 * (Math.PI / 180);
    step = (180 * Math.PI) / 180 / steps;
    radius = 116;
    this.ctx.translate(this.centerX, this.centerY);
    this.ctx.save();
    for (i = 0; i <= steps; i += 1) {
      x = (radius * Math.cos(angle)) - 4;
      y = (radius * Math.sin(angle)) + 4;
      angle += step;
      this.ctx.fillStyle = "#7f7f7f";
      this.ctx.font = "bold 13px Arial";
      this.ctx.fillText(i + 1, x, y);
    }
    this.ctx.restore();
    this.ctx.fillStyle = "#636262";
    this.ctx.font = "normal 12px Arial";
    this.ctx.fillText("OFF", -84, 75);
    this.ctx.fillText("MAX", 62, 75);
  };
  Dimmer.prototype.draw = function() {
    var endAngle;
    this.$progress.get(0).height = this.canvasSize;
    this.$progress.get(0).width = this.canvasSize;
    endAngle = (this.maxAngle * Math.PI) / 180;
    this.drawLine((this.target * Math.PI) / 180);
    this.drawSteps();
    this.drawNumbers();
    this.updateBackground();
  };
  Dimmer.prototype.updateBackground = function() {
    var gray, normalizedTarget;
    normalizedTarget = this.map(this.target, 0, this.maxAngle, 0, 1);
    gray = parseInt(normalizedTarget * 255, 10);
    this.$body.css({
      background: "#000 radial-gradient(ellipse at center, #8c8f95 0%, rgb(" + gray + "," + gray + "," + gray + ") 100%) center center no-repeat"
    });
  };
  Dimmer.prototype.setMousePosition = function(event) {
    var ang, deg, diff, target;
    this.mPos = {
      x: event.pageX - (this.elementPosition.x + this.centerX),
      y: event.pageY - (this.elementPosition.y + this.centerY)
    };
    ang = Math.atan2(this.mPos.x, this.mPos.y);
    if (ang < 0) {
      ang = ang + 2 * Math.PI;
    }
    deg = 360 - (ang * (180 / Math.PI));
    target = this.map(deg, 0, 360, -40, 270);
    diff = Math.abs(target - this.target);
    if (diff < this.maxDiff && target < this.constraint) {
      this.target = target;
      if (this.target > this.maxAngle) {
        this.target = this.maxAngle;
      }
      if (this.target < 0) {
        this.target = 0;
      }
    }
    target_str = target.toString().split(".")[0]; 
    target_float = target/255*100
    if (target_float > 0 && target_float < 100) {
       socket.send(target_float); 
    }
    
    this.setDimmerPosition();
  };
  Dimmer.prototype.onMouseDown = function(event) {
    this.mdown = true;
  };
  Dimmer.prototype.onMouseUp = function(event) {
    this.mdown = false;
  };
  Dimmer.prototype.onMouseMove = function(event) {
    if (this.mdown) {
      this.setMousePosition(event);
    }
  };
  Dimmer.prototype.map = function(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
  };
  // Note that the path doesn't matter for routing; any WebSocket
  // connection gets bumped over to WebSocket consumers
    
  $("#s1")[0].addEventListener( 'change', function() {
    if(this.checked) {
        // Checkbox is checked..
        console.log("Switch 1 is ON")
        pin = "PIN 3 HIGH "              
        msg = pin + target_float
        socket.send(msg);
    } else {
        // Checkbox is not checked..
        console.log("Switch 1 is OFF")
        pin = "PIN 3 LOW "              
        msg = pin + target_float
        socket.send(msg);
    }
    });  
    $("#s2")[0].addEventListener( 'change', function() {
    if(this.checked) {
        // Checkbox is checked..
        console.log("Switch 2 is ON")
        pin = "PIN 5 HIGH "              
        msg = pin + target_float
        socket.send(msg);
    } else {
        // Checkbox is not checked..
        console.log("Switch 2 is OFF")
        pin = "PIN 5 LOW "              
        msg = pin + target_float
        socket.send(msg);
    }
});  
  
      
  return Dimmer;
})();
this.$dimmer = $(".dimmer");
dimmer = new Dimmer(this.$dimmer);
}; 
    
    
// Call onopen directly if socket is already open
if (socket.readyState == WebSocket.OPEN) socket.onopen();