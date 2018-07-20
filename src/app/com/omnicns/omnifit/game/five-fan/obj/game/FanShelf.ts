import {AWStage} from '../../stage/AWStage';
import {AWObj} from '../AWObj';

export class FanShelf extends AWObj {

  constructor(stage: AWStage, x: number, y: number, z: number, img: HTMLImageElement) {
    super(stage, x, y, z, img);
    this.imgAlign = 'center';
    this.imgBaseline = 'hanging';
  }

  onCreate(data?: any) {
  }

  onDestroy(data?: any) {
  }

  onDraw(context: CanvasRenderingContext2D): void {
    if (!this.img.complete) { return; }
    this.x = this.stage.width / 2;
    this.y = (this.stage.height / 2) - 30;
    this.drawImage(context);
    // context.drawImage(this.img, 0, 0);
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
