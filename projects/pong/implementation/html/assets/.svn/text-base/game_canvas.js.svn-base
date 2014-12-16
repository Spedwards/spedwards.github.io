////////////////////////////////////////////////////////////////////////
// PONG GAME CLASS
////////////////////////////////////////////////////////////////////////

/**
 * Constructor
 */
function Pong(){
	var base = this;
	return base;
}

/** Pong prototype */
Pong.prototype = {
	// CONSTANTS
	SPRITE_COLOR 		: 'rgba(153,223,251, 0.7)', // background color (css)
	SPRITE_WIDTH		: 20,		  	// int
	PADDLE_HEIGHT 		: 100,			// int
	PADDLE_SPEED		: 5.0,			// (float) speed of CPU paddle in pixels per frame
	
	// UI
	$ui					: null,			// game container
	canvas				: null,			// game canvas
	stage				: null,			// game stage
	border				: null,			// play field boundary
	scoreFieldA			: null, 		// player score display
	scoreFieldB			: null, 		// player score display
	
	// Sprites
	paddleA				: null,			// player paddle
	paddleB				: null,			// CPU paddle
	ball				: null,			// ball
	
	// State
	mouseY				: null,								// current mouse position
	stageWidth			: 0,								// width of game stage
	stageHeight			: 0,								// height of game stage
	scoreA 				: 0,								// (int) player score
	scoreB				: 0,							 	// (int) CPU score
	ballSpeedX			: 0.0,								// (float) ball X speed
	ballSpeedY			: 0.0,								// (float) ball Y speed
	paddleSpeedA		: 0.0,								// (float) Y speed of paddle A
	paddleSpeedB		: 0.0,								// (float) Y speed of paddle B
	bounds 				: {top:0,bottom:0,left:0,right:0}, 	// (Rectangle) bounds (top/bottom/left/right) - pixel values updated on resize
	
	// intervals
	frameDelay			: 1000/60,		// frame period
	frameInterval		: 0				// interval 
}

/**
 * initialise the game and the UI
 */
Pong.prototype.init = function(ui) {
	var base = this;
	var SPRITE_WIDTH = base.SPRITE_WIDTH;
	
	var $ui = base.$ui = $(ui);
	
	base.stageWidth  = $ui.width();
	base.stageHeight = $ui.height();
	
	// create canvas and insert as UI
	var $canvas = $("<canvas/>").attr({
		width : base.stageWidth,
		height: base.stageHeight
	});
	var canvas = base.canvas = $canvas[0];
	base.$ui.append(canvas);
	
	// create game stage object
	var stage = base.stage = new Stage(canvas);
	
	// set default colour for pong sprites
	PongSprite.prototype.defaultColor = base.SPRITE_COLOR;
	
	// add resize listener
	$(window).bind('resize.pong', function(){
		base.draw();
	});
	
	// add frame event
	Ticker.setInterval(base.frameDelay);
	Ticker.addListener(this);
	
	// add mouse listener
	if( 'ontouchstart' in window ) {
		$ui.bind('touchstart.pong touchmove.pong',function(e){
			e.preventDefault();
			var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
			var pos = $(this).offset();
			//var x = touch.pageX - pos.left;
			var y = touch.pageY - pos.top;
			
			base.mouseY = y;
		});
	}
	
	// add paddles
	base.paddleA = new PongSprite("paddle-a").init(SPRITE_WIDTH, base.PADDLE_HEIGHT)
						.x(SPRITE_WIDTH*2)
						.y(base.stageHeight/2-base.PADDLE_HEIGHT/2)
						.appendTo(stage);
	
	base.paddleB = new PongSprite("paddle-b").init(SPRITE_WIDTH, base.PADDLE_HEIGHT)
						.x(base.stageWidth-SPRITE_WIDTH*3)
						.y(base.stageHeight/2-base.PADDLE_HEIGHT/2)
						.appendTo(stage);

	// add ball
	base.ball = new PongSprite('ball').init(SPRITE_WIDTH, SPRITE_WIDTH)
						.x(base.stageWidth/2-SPRITE_WIDTH/2)
						.y(base.stageHeight/2-SPRITE_WIDTH/2)
						.appendTo(stage);
	
	
	// add border (fills in draw method)
	base.border = new Shape();
	stage.addChild(base.border);
	
	// add score fields
	base.scoreFieldA = new Text("", '50px OrbitronRegular', base.SPRITE_COLOR);
	base.scoreFieldB = new Text("", '50px OrbitronRegular', base.SPRITE_COLOR);
	base.scoreFieldA.textAlign 	  = base.scoreFieldB.textAlign 	  = "center";
	base.scoreFieldA.textBaseline = base.scoreFieldB.textBaseline = "top";
	base.scoreFieldA.y 			  = base.scoreFieldB.y 			  = SPRITE_WIDTH*2;
	
	stage.addChild(base.scoreFieldA);
	stage.addChild(base.scoreFieldB);
	
	// init speeds
	base.ballSpeedX   = 3;
	base.ballSpeedY   = 1;
	base.paddleSpeedA = 0;
	base.paddleSpeedB = 0;
	
	// draw updates
	base.updateScore();
	base.draw();
	
	return base;
}

/**
 * redraw elements, to fit current stage size
 */
Pong.prototype.draw = function() {
	var base = this;
	var SPRITE_WIDTH = base.SPRITE_WIDTH;
	
	// reset stage width
	base.stageWidth  = base.$ui.width();
	base.stageHeight = base.$ui.height();
	$(base.canvas).attr({
		width : base.stageWidth,
		height: base.stageHeight
	});
	
	// set bounds (bounding coordinates for ball)
	base.bounds = new Rectangle(SPRITE_WIDTH, SPRITE_WIDTH, base.stageWidth - SPRITE_WIDTH*3, base.stageHeight - SPRITE_WIDTH*3)
	
	// redraw border
	var g = base.border.graphics;
	g.clear();
	g.beginStroke(base.SPRITE_COLOR).setStrokeStyle(SPRITE_WIDTH).drawRect(SPRITE_WIDTH/2,SPRITE_WIDTH/2,base.stageWidth-SPRITE_WIDTH,base.stageHeight-SPRITE_WIDTH);
	
	// reset Y position of paddle to fit in bounds
	$.each([base.paddleA, base.paddleB], function(n, paddle){
		paddle.y( Math.max(SPRITE_WIDTH, Math.min(paddle._y, base.stageHeight-SPRITE_WIDTH-base.PADDLE_HEIGHT)) );
	});
	
	// reset X position of paddle B
	base.paddleB.x(base.stageWidth-SPRITE_WIDTH*3);
	
	// position score fields
	base.scoreFieldA.x = base.stageWidth/2 - SPRITE_WIDTH*2 - base.scoreFieldA.getMeasuredWidth()/2;
	base.scoreFieldB.x = base.stageWidth/2 + SPRITE_WIDTH*2 + base.scoreFieldB.getMeasuredWidth()/2;
	
	// draw stage
	base.stage.update();
}

/**
 * update score fields
 */
Pong.prototype.updateScore = function(){
	var base = this;
	base.scoreFieldA.text = String(base.scoreA);
	base.scoreFieldB.text = String(base.scoreB);
	base.stage.update();
}

/**
 * frame handler (formerly onFrame)
 */
Pong.prototype.tick = function(){
	var base 		 = this;
	var SPRITE_WIDTH = base.SPRITE_WIDTH;
	var PADDLE_SPEED = base.PADDLE_SPEED;
	var PADDLE_HEIGHT= base.PADDLE_HEIGHT;
	var bounds  	 = base.bounds;
	var ball 		 = base.ball;
	var paddleA 	 = base.paddleA;
	var paddleB	 	 = base.paddleB;
	var bx			 = ball._x;
	var by			 = ball._y;
	var nextX		 = base.constrain(bx + base.ballSpeedX, base.bounds.left, base.bounds.right);
	var nextY		 = base.constrain(by + base.ballSpeedY, base.bounds.top, base.bounds.bottom);
	var paddleRectA	 = new Rectangle(base.paddleA._x+base.paddleA._width, base.paddleA._y, 1, PADDLE_HEIGHT);
	var paddleRectB  = new Rectangle(base.paddleB._x, 					  base.paddleB._y, 1, PADDLE_HEIGHT);
	var ballRect	 = new Rectangle(nextX,nextY,ball._width,ball._height);
	
	// collide with frame top/bottom - bounce
	if((nextY >= base.bounds.bottom) || (nextY <= base.bounds.top)) {
		base.ballSpeedY *= -1;
	}
	
	// collide with right edge - score player A
	if(nextX >= base.bounds.right){
		base.ballSpeedX *= -1;
		base.scoreA++;
		base.updateScore();
	}
	// collide with left edge - score player B
	else if(nextX <= base.bounds.left) {
		base.ballSpeedX *= -1;
		base.scoreB++;
		base.updateScore();
	}
	// collide with left paddle
	else if( (base.ballSpeedX < 0) &&  (ballRect.intersects(paddleRectA)) ) {
		nextX = paddleRectA.right;
		base.ballSpeedX *= -1;
		base.ballSpeedY += base.paddleSpeedA * 0.2;
	} 
	// collide with right paddle
	else if((base.ballSpeedX > 0) && (ballRect.intersects(paddleRectB)) ) {
		nextX = paddleRectB.left - SPRITE_WIDTH;
		base.ballSpeedX *= -1;
		// impart velocity
		base.ballSpeedY += base.paddleSpeedB * 0.2;
	}
	
	// move ball
	ball.x(nextX);
	ball.y(nextY);
	
	// move CPU paddle (B) to track ball if ball on approach
	var paddleCenter = paddleB._y + paddleB._height/2;
	if(base.ballSpeedX > 0) {
		base.paddleSpeedB = base.constrain(ball._y-paddleCenter,
											-PADDLE_SPEED,
											PADDLE_SPEED);
	} 
	// otherwise if ball moving away from paddle return to center
	else {
		base.paddleSpeedB = base.constrain(base.stageHeight/2-paddleCenter,
											-PADDLE_SPEED,
											PADDLE_SPEED);
	}
	paddleB.y( base.constrain(paddleB._y+base.paddleSpeedB, 
								base.bounds.top, 
								base.bounds.bottom-paddleB._height+SPRITE_WIDTH) );
	
	// move player paddle (A) to track mouse
	paddleCenter  = paddleA._y + paddleA._height/2;
	var mouseY = base.mouseY || base.stage.mouseY;
	
	base.paddleSpeedA = base.constrain(mouseY-paddleCenter,-PADDLE_SPEED,PADDLE_SPEED);
	paddleA.y( base.constrain(paddleA._y+base.paddleSpeedA, 
								base.bounds.top, 
								base.bounds.bottom-paddleA._height+SPRITE_WIDTH) );
	
	// update stage
	base.stage.update();
}

/**
 * limit a number to defined bounds
 */
Pong.prototype.constrain = function(num, min, max) {
	return Math.max(Math.min(num, max), min);
}

////////////////////////////////////////////////////////////////////////
// PONG SPRITE CLASS
////////////////////////////////////////////////////////////////////////

/** 
 * constructor
 */
function PongSprite(id,w,h,background) {
	var base = this;
	base._id = id || "PongSprite"+Math.floor(Math.random()*1000);
	base.init(w,h,background);
	return base;
}

/**
* prototype  
*/
PongSprite.prototype = {
	element : null,		// jquery element
	_id		: null,		// id string
	
	_width 	: 0,		// pixel width
	_height	: 0,		// pixel height
	_x		: 0,		// x position
	_y		: 0,		// y position
	
	defaultColor : '#FFF'
}

/** 
 * init the sprite 
 */
PongSprite.prototype.init = function(w,h,background){
	var base = this;
	
	if(base.element==null) {
		base.element = new Shape();
	}
	
	// init element
	var g = base.element.graphics;
	g.clear();
	g.beginFill(background || base.defaultColor);
	g.rect(0,0,w,h);
	g.endFill();
	
	// set width/height
	base._width  = w  || base._w;
	base._height = h  || base._h;
	
	return base;
}

/**
 * append sprite element to container
 */
PongSprite.prototype.appendTo = function(container) {
	var base = this;
	container.addChild(base.element);
	return base;
}

/** 
 * get/set width 
 */
PongSprite.prototype.width = function(n){
	var base = this;
	if(!isNaN(parseFloat(n))) {
		base._width = n;
		base.init();
		return base;
	} else {
		return base._width;
	}
}

/** 
 * get/set height 
 */
PongSprite.prototype.height = function(n){
	var base = this;
	if(!isNaN(parseFloat(n))) {
		base._height = n;
		base.init();
		return base;
	} else {
		return base._height;
	}
}

/** 
 * get/set x 
 */
PongSprite.prototype.x = function(n){
	var base = this;
	
	if(n!=null) {
		base._x = n;
		base.element.x = n;
		return base;
	} else {
		return base._x;
	}
}

/** 
 * get/set y 
 */
PongSprite.prototype.y = function(n){
	var base = this;
	
	if(n!=null) {
		base._y = n;
		base.element.y = n;
		return base;
	} else {
		return base._y;
	}
}

////////////////////////////////////////////////////////////////////////
// RECTANGLE CLASS
////////////////////////////////////////////////////////////////////////

function Rectangle(x,y,w,h) {
	var base = this;
	base.x = x;
	base.y = y;
	base.w = base.width  = w;
	base.h = base.height = h;
	base.left = x;
	base.right = x+w;
	base.top = y;
	base.bottom = y+h;
}


Rectangle.prototype = {
	x 		: 0,
	y 		: 0,
	w 		: 0,
	width	: 0,
	h 		: 0,
	height	: 0,
	top 	: 0,
	bottom  : 0,
	left    : 0,
	right 	: 0
}

Rectangle.prototype.toString = function(){
	var base = this;
	return JSON.stringify({
		x 	: base.x,
		y	: base.y,
		w	: base.width,
		h 	: base.height
	});
}

/**
 * test intersection with another Rectangle
 */
Rectangle.prototype.intersects = function(r2) {
	var r1 = this;
	if (    (r1.x + r1.width  >= r2.x)
         && (r1.x 			  <= r2.x + r2.width)
         && (r1.y + r1.height >= r2.y)
         && (r1.y 			  <= r2.y + r2.height)) {
        return true;
	} else {
		return false;
	}
}

