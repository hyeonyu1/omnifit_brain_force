import {AWStage} from '../../stage/AWStage';
import {AWObj} from '../AWObj';

export class MainBackGround extends AWObj {

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
    context.save();
    context.fillStyle = '#5ac7ee';
    context.fillRect(0, 0, this.stage.width, this.stage.height / 2);
    context.save();
    context.fillStyle = '#38ae56';
    context.fillRect(0, this.stage.height / 2, this.stage.width, this.stage.height);

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
