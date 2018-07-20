import {AWStage} from '../../stage/AWStage';
import {AWObj} from '../AWObj';
import {AWResourceManager} from '../../AWResourceManager';
import {RandomUtil} from '../../../../../../../../../lib-typescript/com/omnicns/random/RandomUtil';

export class Flags extends AWObj {

 private flag1: HTMLImageElement = AWResourceManager.getInstance().resources('ic_flag_01Img');
 private flag2: HTMLImageElement = AWResourceManager.getInstance().resources('ic_flag_02Img');

  constructor(stage: AWStage, x: number, y: number, z: number, img?: HTMLImageElement) {
    super(stage, x, y, z, img);
    this.imgAlign = 'right';
    this.imgBaseline = 'bottom';
  }

  onCreate(data?: any) {
  }

  onDestroy(data?: any) {
  }

  onDraw(context: CanvasRenderingContext2D): void {
    this.x = 0;
    this.y = (this.stage.height / 2) - 230;
    // this.y = this.flag1.height;
    while (true) {
      if (this.x >= this.stage.width) {
        break;
      }
      const flag = RandomUtil.random(0, 10) <= 1 ? this.flag1 : this.flag2;
      this.drawImage(context, flag);
      this.x += flag.width + 35;
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
