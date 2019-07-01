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
  private room: Room;
  constructor(stage: AWStage, x: number, y: number, z: number, img?: HTMLImageElement) {
    super(stage, x, y, z, img);
    console.log('timer create');
  }

  onDraw(context: CanvasRenderingContext2D): void {
    if (ValidUtil.isNullOrUndefined(this.room) || (this.room && this.room.startCnt < 0)) {
      return;
    }
    const fontPT = this.sizejump--;
    const tw = (context.measureText(this.btnText).width / 2);
    const th = fontPT * 1.5;

    this.x = this.stage.width / 2;
    this.y = this.stage.height / 2;

    context.strokeStyle = '#000000';

    context.font = fontPT + 'pt Multicolore';
    context.textAlign = 'center';
    context.textBaseline = 'middle' ;
    context.fillStyle = '#FFFFFF';
    context.lineWidth = 1;
    context.fillText(this.btnText, this.stage.width / 2, this.stage.height / 2);
    context.strokeText(this.btnText, this.stage.width / 2, this.stage.height / 2);
  }

  onStart(data?: any) {
    this.x  = RandomUtil.random(this.stage.width);
    this.y = this.stage.height;
    this.velocity = new PointVector(0, 0);
    this.acceleration = new PointVector(0, 0);

    AWResourceManager.getInstance().resources('ready_startSound').play();
    this.roomDetailSubscription = this.stage.eventObservable(AWStageEvent.EVENT_ROOM_DETAIL).filter( (it: Room) => it.status === 'wait' || it.status === 'run').subscribe( (room: Room) => {
      this.room = room;
      this.btnText = String(room.startCnt); // as string;
      this.sizejump = 100;
      if (room.startCnt === 0) {
        AWResourceManager.getInstance().resources('applauseSound').play();
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
