/**
 * A wrapper for the Pong game
 */
package
{
	import com.firefly.games.pong.Pong;
	
	import flash.display.Sprite;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;

	[SWF(backgroundColor="#000000", frameRate="60", width="640", height="480")]
	
	public class PongGame extends Sprite{
		
		public function PongGame() {
			stage.align 	= StageAlign.TOP_LEFT;
			stage.scaleMode = StageScaleMode.NO_SCALE;
			
			_pong = new Pong();
			addChild(_pong);
			
			// debug overlay (FPS)
			addChild(new BasicInfo());
		}
		
		protected var _pong:Pong;
	}
}