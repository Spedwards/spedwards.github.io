/**
 * A wrapper for the Pong game
 */
package
{
	import com.firefly.games.pong.PongStarling;
	
	import flash.display.Sprite;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.events.Event;
	import flash.geom.Rectangle;
	
	import starling.core.Starling;

	[SWF(backgroundColor="#000000", frameRate="60", width="640", height="480")]
	
	public class PongGameStarling extends Sprite{
		
		public function PongGameStarling() {
			stage.align 	= StageAlign.TOP_LEFT;
			stage.scaleMode = StageScaleMode.NO_SCALE;
			
			stage.addEventListener(Event.RESIZE, _onResize);
			
			_starling = new Starling(PongStarling, stage);
			_starling.start();
			
			// debug overlay (FPS)
			addChild(new BasicInfo());
		}
		
		protected function _onResize(e:Event) : void {
			Starling.current.viewPort 		= new Rectangle(0, 0, stage.stageWidth, stage.stageHeight);; 
			Starling.current.stage.stageWidth  = stage.stageWidth;
			Starling.current.stage.stageHeight = stage.stageHeight; 
		}
		
		protected var _starling:Starling;

	}
}