import {Subscription} from 'rxjs/Subscription';
import {PointVector} from '../../../../../../../../../lib-typescript/com/omnicns/math/PointVector';
import {ValidUtil} from '../../../../../../../../../lib-typescript/com/omnicns/valid/ValidUtil';
import {RandomUtil} from '../../../../../../../../../lib-typescript/com/omnicns/random/RandomUtil';
import {AWStage} from '../../stage/AWStage';
import {AWStageEvent} from '../../stage/AWStageEvent';
import {AWObj} from '../AWObj';
import {Info} from '../../info/Info';
import {Room} from '../../domain/Room';
import {AWResourceManager} from '../../AWResourceManager';
import {RoomStatusCode} from '../../code/RoomStatusCode';

export class Timer extends AWObj {
  // private position: PointVector;
  private velocity: PointVector;
  private acceleration: PointVector;
  private beforeConcentration = 0;
  private concentration = 0;
  private btnText = '-';
  private roomDetailSubscription: Subscription;
  private sizejump = 100;
  constructor(stage: AWStage, x: number, y: number, z: number, img?: HTMLImageElement) {
    super(stage, x, y, z, img);
    console.log('timer create');
  }

  onDraw(context: CanvasRenderingContext2D): void {
    if (this.btnText.length <= 0) {
      //this.stage.removeObjOnStopDestory(this);
      return;
    }
    const fontPT = this.sizejump--;
    const tw = (context.measureText(this.btnText).width / 2);
    const th = fontPT * 1.5;

    this.x = this.stage.width / 2;
    this.y = this.stage.height / 2;
    // const imgStartX = this.x - tw;
    // const imgStartY = this.y - th;
    // const imgEndX = this.x + this.img.width + tw ;
    // const imgEndY = this.y + this.img.height + th ;

    // context.fillStyle = 'blue';
    // context.fillText(this.btnText, this.stage.width / 2, this.stage.height / 2);
    //
    context.strokeStyle = '#000000';
    // context.shadowColor = '#000000';
    // context.shadowOffsetX = -1;
    // context.shadowOffsetY = -1;
    // context.font = 'bold  ' + fontPT + 'pt Multicolore';
    context.font = fontPT + 'pt Multicolore';
    context.textAlign = 'center';
    context.textBaseline = 'middle' ;
    context.fillStyle = '#FFFFFF';
    context.lineWidth = 1;
    context.fillText(this.btnText, this.stage.width / 2, this.stage.height / 2);
    context.strokeText(this.btnText, this.stage.width / 2, this.stage.height / 2);
  }

  onStart(data?: any) {
    // this.position = this.position || new PointVector(RandomUtil.random(this.stage.width), RandomUtil.random(this.stage.height));
    //console.log('drone start id ' + this.id);
    this.x  = RandomUtil.random(this.stage.width);
    this.y = this.stage.height;
    this.velocity = new PointVector(0, 0);
    this.acceleration = new PointVector(0, 0);

    AWResourceManager.getInstance().resources('ready_startSound').play();
    this.roomDetailSubscription = this.stage.eventObservable(AWStageEvent.EVENT_ROOM_DETAIL).filter( (it: Room) => it.status === 'wait' || it.status === 'run').subscribe( (room) => {
      //console.log(room.status + ' ' + room.startCnt + '  ' + room.endCnt);
      this.btnText = room.startCnt;
      this.sizejump = 100;
      if (room.endCnt < Info.END_CNT) {
        this.btnText = '';
      }
      if (room.startCnt === 8) {
        AWResourceManager.getInstance().resources('applauseSound').play();
      }
      if (room.status === RoomStatusCode.RUN && room.endCnt === Info.END_CNT - 1) {
        AWResourceManager.getInstance().resources('startSound').play();
      }
    });

  }

  onStop() {
    if (!ValidUtil.isNullOrUndefined(this.roomDetailSubscription)) {this.roomDetailSubscription.unsubscribe(); }
  }
  onCreate(data?: any) {}
  onDestroy(data?: any) {}
  onPause(data?: any) {}
  onRestart(data?: any) {}
  onResume(data?: any) {}
}
