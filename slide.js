( function ( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		throw new Error("require slide.js");
	} else {
		factory(global);
	}

})( this, function ( window, noGlobal ) {

	"use strict";

	var Slide = function ( option ) {
		return this.init(option);
	};

	Slide.prototype.Constructor = Slide;

	Slide.prototype.init = function ( option ) {
		this.id 	= "#" + option.id;
		this.now 	= 0;
		this.last 	= option.img.length - 1;
		this.img 	= option.img;
		this.timer 	= null;
		this.type 	= null;
		this.no 	= null;

		return this.initElement();
	};

	Slide.prototype.initElement = function () {
		$(this.id).attr("class", "slide");
		$(this.id).append("<div class='img'></div>");
		$(this.id).append("<div class='pos'></div>");

		for ( var i in this.img ) {
			$(this.id).find(".img").append("<div></div>");
			$(this.id).find(".pos").append("<div></div>");
			$(this.id).find(".img div").eq(i).css({"background-image" : "url('image/" + this.img[i] + "')"});
		}

		return this
		.initTrigger()
		.startSlide();
	};

	Slide.prototype.initTrigger = function () {
		var self = this;

		$(document)
		.on("click", ".pos div", function () {
			self.onPos($(this));
		});

		return this;
	};

	Slide.prototype.onPos = function ( elem ) {
		this.onSlide($(elem).index())
	};

	Slide.prototype.startSlide = function () {
		var self = this;
		this.timer = setTimeout(function(){
			self.onSlide("right");
		},3000);
		$(this.id).find(".pos div").eq(this.now).addClass("this").siblings().removeClass("this");
	};

	Slide.prototype.onSlide = function ( type ) {
		if ( $(this.id).find(".img div").is(":animated") || type == this.now ) return false;

		clearTimeout(this.timer);

		if ( type === "left" || type === "right" ) {
			this.type 	= type;
			this.no 	= this.type === "left" ? this.now === 0 ? this.last : this.now - 1 : this.now === this.last ? 0 : this.now + 1;
		} else {
			this.no 	= type;
			this.type 	= this.no < this.now ? -100 : 100;
		}

		var right = this.type == "right" ? -100 : 100;

		$(this.id).find(".img div").eq(this.no).css({"right" : right + "%"}).animate({"right" : 0}, 800, "linear");
		$(this.id).find(".img div").eq(this.now).animate({"right" : -right + "%"}, 800, "linear");

		this.now = this.no;
		this.startSlide();
	}

	window.Slide = Slide;

});

new Slide({
	id : "slideBox",
	img : [
		"양디 전경.jpg",
		"yg.png",
		"컨셉.jpg",
		"로봇띠.jpg"
	]
});