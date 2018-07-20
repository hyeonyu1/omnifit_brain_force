import {Subscription} from 'rxjs/Subscription';
import {Rect} from '../../../../../../../../../lib-typescript/com/omnicns/graphics/Rect';
import {ValidUtil} from '../../../../../../../../../lib-typescript/com/omnicns/valid/ValidUtil';
import {Level1} from '../../algo/Level1';
import {Level2} from '../../algo/Level2';
import {Level3} from '../../algo/Level3';
import {AWResourceManager} from '../../AWResourceManager';
import {AWStageManager} from '../../AWStageManager';
import {AWStage} from '../../stage/AWStage';
import {AWObj} from '../AWObj';

export class Logo extends AWObj {
  private mousedownSubscription: Subscription;
  private intro_bg = AWResourceManager.getInstance().resources('intro_bgImg');
  private intro_text_02 = AWResourceManager.getInstance().resources('intro_text_02Img');
  private audio: HTMLAudioElement;

  constructor(stage: AWStage, x: number, y: number, z: number) {
    super(stage, x, y, z);
  }

  onDraw(context: CanvasRenderingContext2D): void {
    if (!this.intro_text_02.complete || !this.intro_bg.complete) { return; }
    context.drawImage(this.intro_bg, 0, 0, this.stage.width, this.intro_bg.height * (this.stage.width / this.intro_bg.width));
    if (Math.floor(new Date().getMilliseconds() / 500)) {
      this.x = (this.stage.width / 2) - this.intro_text_02.width / 2;
      this.y = this.stage.height - (this.intro_text_02.height) - 50;
      context.drawImage(this.intro_text_02, this.x, this.y);
    }
  }

  onStart(data?: any) {
    this.mousedownSubscription = this.stage.canvasEventSubscribe('mousedown', (event: MouseEvent) => {
      AWStageManager.getInstance().nextStage();
    });
  }

  onStop() {
    console.log('touchScreen stop');
    if (this.audio) {this.audio.pause(); }
    if (!ValidUtil.isNullOrUndefined(this.mousedownSubscription)) {this.mousedownSubscription.unsubscribe(); }
  }

  onCreate(data?: any) {}
  onDestroy(data?: any) {}
  onPause(data?: any) {}
  onRestart(data?: any) {}
  onResume(data?: any) {}

}
