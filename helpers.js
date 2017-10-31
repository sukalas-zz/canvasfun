	var helpers = function(){
		this.g = function(id){return document.getElementById(id);};
		this.c = function(type){return document.createElement(type);};
		this.m = function (input, in_min, in_max, out_min, out_max) {
		  return (input - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
		}
	}