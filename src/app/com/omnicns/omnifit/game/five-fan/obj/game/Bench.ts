import {AWStage} from '../../stage/AWStage';
import {AWObj} from '../AWObj';

export class Bench extends AWObj {

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
    if (this.img.complete) {
      this.x = 0;
      this.y = (this.stage.height / 2) - 50;
      while (true) {
        if (this.x >= this.stage.width) {
          break;
        }
        this.x += this.img.width - 1;
        this.drawImage(context);
      }
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
