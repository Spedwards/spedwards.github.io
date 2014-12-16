package com.firefly.games.pong {
	import flash.display.BitmapData;
	import flash.geom.Rectangle;
	
	import starling.display.Image;
	import starling.display.Sprite;
	import starling.events.Event;
	import starling.events.Touch;
	import starling.events.TouchEvent;
	import starling.text.TextField;
	import starling.textures.Texture;
	
	public class PongStarling extends Sprite {
		
		// =====================================================
		// P U B L I C
		// =====================================================
		
		/**
		 * constructor
		 */
		public function PongStarling() {
			if(stage==null) addEventListener(Event.ADDED_TO_STAGE, _init);
			else 			_init();
		}
		
		// =====================================================
		// E M B E D S
		// =====================================================
		
		// background
		[Embed(source="../../../../../../../assets/background.jpg")]
		protected static var Background:Class;
		
		// font
		[Embed(source="../../../../../../../assets/Orbitron-Regular.ttf", fontName="ScoreFont", mimeType="application/x-font-truetype", unicodeRange="U+002E,U+0030-0039", embedAsCFF="false")]
		protected static var ScoreFont:String;
		
		// =====================================================
		// P R O T E C T E D
		// =====================================================
		
		// CONSTANTS
		protected const SPRITE_COLOR	:int 	= 0x8899DFFB; // 32bit with alpha channel
		protected const SPRITE_WIDTH	:int	= 20;
		protected const PADDLE_HEIGHT 	:int 	= 100;
		protected const PADDLE_SPEED	:Number	= 5;	// speed of CPU paddle in pixels per frame
		
		// UI
		protected var _ui			:Sprite;	// game UI
		protected var _background	:Image;		// background image
		protected var _border		:Image;		// play field boundary
		protected var _paddleA		:Image;		// player paddle
		protected var _paddleB		:Image;		// CPU paddle
		protected var _ball			:Image;		// ball
		protected var _scoreFieldA	:TextField; // player score display
		protected var _scoreFieldB	:TextField; // player score display
		
		// State
		protected var _mouseY		:Number=0;	// mouse position (Y)
		protected var _scoreA 		:int = 0;	// player score
		protected var _scoreB		:int = 0; 	// CPU score
		protected var _ballSpeedX	:Number=0;	// ball X speed
		protected var _ballSpeedY	:Number=0;	// ball Y speed
		protected var _paddleSpeedA	:Number=0;	// Y speed of paddle A
		protected var _paddleSpeedB	:Number=0;	// Y speed of paddle B
		protected var _bounds 		:Rectangle;	// bounds (top/bottom/left/right) - pixel values updated on resize
		
		/**
		 * initialise the game and the UI
		 */
		protected function _init(e:Event=null) : void {
			if(stage==null) return;
			
			// remove event listener
			removeEventListener(Event.ADDED_TO_STAGE, _init);
			
			// create master UI clip
			_ui = this;
			
			// add listeners
			stage.addEventListener(Event.RESIZE, 		_draw);
			stage.addEventListener(Event.ENTER_FRAME, 	_onFrame);
			stage.addEventListener(TouchEvent.TOUCH, 	_onTouch);
			
			// add background
			_background = Image.fromBitmap( new Background() );
			_ui.addChild(_background);
			
			// add paddles
			var paddleTexture:Texture = Texture.fromBitmapData( _initBitmapData(SPRITE_WIDTH,PADDLE_HEIGHT));
			_paddleA = new Image(paddleTexture);
			_paddleB = new Image(paddleTexture);
			_paddleA.x = SPRITE_WIDTH*2;
			_paddleB.x = stage.stageWidth-SPRITE_WIDTH*3;
			_paddleA.y = _paddleB.y = stage.stageHeight/2-PADDLE_HEIGHT/2;
			_ui.addChild(_paddleA);
			_ui.addChild(_paddleB);
			
			// add ball
			var ballTexture:Texture = Texture.fromBitmapData( _initBitmapData(SPRITE_WIDTH,SPRITE_WIDTH));
			_ball = new Image(ballTexture);
			_ball.x = stage.stageWidth/2-SPRITE_WIDTH/2;
			_ball.y = stage.stageHeight/2-SPRITE_WIDTH/2;
			_ui.addChild(_ball);
			
			// add border
			var borderTexture:Texture = Texture.fromBitmapData(_initBitmapData(stage.stageWidth,stage.stageHeight));
			_border = new Image(borderTexture);
			_ui.addChild(_border);
			
			// add score fields
			_scoreFieldA = new TextField(100,100,"0","ScoreFont",50,SPRITE_COLOR);
			_scoreFieldB = new TextField(100,100,"0","ScoreFont",50,SPRITE_COLOR);
			for each (var scoreField:TextField in [_scoreFieldA,_scoreFieldB]) {
				scoreField.y 		= SPRITE_WIDTH*2;
				_ui.addChild(scoreField);
			}
			
			// init speeds
			_ballSpeedX = 3;
			_ballSpeedY = 1;
			_paddleSpeedA = 0;
			_paddleSpeedB = 0;
			
			// draw updates
			_updateScore();
			_draw();
		}
		
		/**
		 * redraw elements, to fit current stage size
		 */
		protected function _draw(e:Event=null) : void {
			if(stage==null) return;
			
			var bmd:BitmapData;
			
			// set bounds (bounding coordinates for ball)
			_bounds = new Rectangle(SPRITE_WIDTH, SPRITE_WIDTH, stage.stageWidth - SPRITE_WIDTH*3, stage.stageHeight - SPRITE_WIDTH*3)
			
			// draw border
			bmd = _initBitmapData(stage.stageWidth, stage.stageHeight);
			_drawRect(bmd,0,0,stage.stageWidth,stage.stageHeight);
			_drawRect(bmd,SPRITE_WIDTH, SPRITE_WIDTH, stage.stageWidth-SPRITE_WIDTH*2,stage.stageHeight-SPRITE_WIDTH*2,0);
			_border.width = stage.stageWidth;
			_border.height = stage.stageHeight;
			_border.texture = Texture.fromBitmapData(bmd);
			
			// reset Y position of paddle
			for each (var paddle:Image in [_paddleA,_paddleB]){
				paddle.y = Math.max(SPRITE_WIDTH, Math.min(paddle.y, stage.stageHeight-SPRITE_WIDTH-PADDLE_HEIGHT));
			}
			
			// reset X position of paddle B
			_paddleB.x = stage.stageWidth-SPRITE_WIDTH*3;
			
			// position score fields
			_scoreFieldA.x = stage.stageWidth/2 - _scoreFieldA.width-SPRITE_WIDTH;
			_scoreFieldB.x = stage.stageWidth/2 + SPRITE_WIDTH;
			
			// resize background (TODO: keep in proportion)
			_background.width  = stage.stageWidth;
			_background.height = stage.stageHeight;
		}
		
		/**
		 * update score fields
		 */
		protected function _updateScore() : void {
			_scoreFieldA.text = String(_scoreA);
			_scoreFieldB.text = String(_scoreB);
		}
		
		/**
		 * touch/mouse move handler
		 */
		protected function _onTouch(e:TouchEvent) : void {
			var touch:Touch = e.getTouch(stage);
			if(touch) {
				_mouseY = touch.globalY;
			}
			/*var touches:Vector.<Touch> = e.getTouches(this);
			for each (var touch:Touch in touches) {
				if (touch.phase == TouchPhase.HOVER ){
					var location:Point = touch.getLocation(this);
					_mouseY = location.y;
				}
			}*/

		}
		
		/**
		 * frame handler
		 */
		protected function _onFrame(e:Event) : void {
			if(stage==null) return;
			
			var bx	  :Number 	= _ball.x;
			var by	  :Number 	= _ball.y;
			var nextX :Number 	= _constrain(bx + _ballSpeedX, _bounds.left, _bounds.right);
			var nextY :Number 	= _constrain(by + _ballSpeedY, _bounds.top, _bounds.bottom);
			var paddleRectA:Rectangle 	= new Rectangle(_paddleA.x+_paddleA.width, _paddleA.y, 1, PADDLE_HEIGHT);
			var paddleRectB:Rectangle 	= new Rectangle(_paddleB.x, 			   _paddleB.y, 1, PADDLE_HEIGHT);
			var ballRect   :Rectangle	= new Rectangle(nextX,nextY,_ball.width,_ball.height);
			
			// collide with frame top/bottom - bounce
			if((nextY >= _bounds.bottom) || (nextY <= _bounds.top)) {
				_ballSpeedY *= -1;
			}
			
			// collide with right edge - score player A
			if(nextX >= _bounds.right){
				_ballSpeedX *= -1;
				_scoreA++;
				_updateScore();
			}
			// collide with left edge - score player B
			else if(nextX <= _bounds.left) {
				_ballSpeedX *= -1;
				_scoreB++;
				_updateScore();
			}
			// collide with left paddle
			else if( (_ballSpeedX < 0) &&  (ballRect.intersects(paddleRectA)) ) {
				nextX = paddleRectA.right;
				_ballSpeedX *= -1;
				_ballSpeedY += _paddleSpeedA * 0.2;
			} 
			// collide with right paddle
			else if((_ballSpeedX > 0) && (ballRect.intersects(paddleRectB)) ) {
				nextX = paddleRectB.left - SPRITE_WIDTH;
				_ballSpeedX *= -1;
				// impart velocity
				_ballSpeedY += _paddleSpeedB * 0.2;
			}
			
			// move ball
			_ball.x = nextX;
			_ball.y = nextY;
			
			// move CPU paddle (B) to track ball
			var paddleCenter:Number = _paddleB.y + _paddleB.height/2;
			if(_ballSpeedX > 0) {
				_paddleSpeedB = _constrain(_ball.y-paddleCenter,-PADDLE_SPEED,PADDLE_SPEED);
			} else {
				_paddleSpeedB = _constrain(stage.stageHeight/2-paddleCenter,-PADDLE_SPEED,PADDLE_SPEED);
			}
			_paddleB.y 		 = _constrain(_paddleB.y+_paddleSpeedB, _bounds.top, _bounds.bottom-_paddleB.height+SPRITE_WIDTH);
			
			// move player paddle (A) to track mouse
			paddleCenter  = _paddleA.y + _paddleA.height/2;
			_paddleSpeedA = _constrain(_mouseY-paddleCenter,-PADDLE_SPEED,PADDLE_SPEED);
			_paddleA.y 	  = _constrain(_paddleA.y+_paddleSpeedA, _bounds.top, _bounds.bottom-_paddleA.height+SPRITE_WIDTH);
		}
		
		// =====================================================
		// P R O T E C T E D - utils
		// =====================================================
		
		/**
		 * limit a number to defined bounds
		 */
		protected function _constrain(num:Number, min:Number, max:Number) : Number {
			return Math.max(Math.min(num, max), min);
		}
		
		/**
		 * initialise a bitmap data object
		 */
		protected function _initBitmapData(w:Number=0, h:Number=0,color:int=SPRITE_COLOR) :BitmapData {
			var bmd:BitmapData = new BitmapData(w,h,true,color);
			return bmd;
		}
		
		/**
		 * draw a rectangle into a bitmap 
		 */
		protected function _drawRect(bmd:BitmapData, x:Number, y:Number, w:Number, h:Number,color:Number=SPRITE_COLOR) : void {
			var rect:Rectangle = new Rectangle(x,y,w,h);
			bmd.fillRect(rect, color);
		}
		
	}
}