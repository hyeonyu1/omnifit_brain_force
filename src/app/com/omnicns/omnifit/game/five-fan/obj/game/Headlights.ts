import {AWStage} from '../../stage/AWStage';
import {AWObj} from '../AWObj';
import {AWResourceManager} from '../../AWResourceManager';
import {RandomUtil} from '../../../../../../../../../lib-typescript/com/omnicns/random/RandomUtil';

export class Headlights extends AWObj {


  constructor(stage: AWStage, x: number, y: number, z: number, img?: HTMLImageElement) {
    super(stage, x, y, z, img);
    this.imgAlign = 'center';
    this.imgBaseline = 'bottom';
  }

  onCreate(data?: any) {
  }

  onDestroy(data?: any) {
  }

  onDraw(context: CanvasRenderingContext2D): void {
    if (this.img.complete) {
      this.x = 0 + this.img.width / 1.5;
      this.y = (this.stage.height / 2) - 230;
      this.drawImage(context);

      this.x = this.stage.width - this.img.width / 1.5;
      this.y = (this.stage.height / 2) - 230;
      this.drawImage(context);
    }
  }

  onPause(data?: any) {
  }

  onRestart(data?: any) {
  }

  onResume(data?: any) {
  }

  onStart(data?: any) {
  }

  onStop(data?: any) {
  }

}
