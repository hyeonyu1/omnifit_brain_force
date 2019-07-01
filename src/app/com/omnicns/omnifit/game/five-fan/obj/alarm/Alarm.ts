import {Subscription} from 'rxjs/Subscription';
import {PointVector} from '../../../../../../../../../lib-typescript/com/omnicns/math/PointVector';
import {ValidUtil} from '../../../../../../../../../lib-typescript/com/omnicns/valid/ValidUtil';
import {RandomUtil} from '../../../../../../../../../lib-typescript/com/omnicns/random/RandomUtil';
import {AWStage} from '../../stage/AWStage';
import {AWStageEvent} from '../../stage/AWStageEvent';
import {AWObj} from '../AWObj';
import {Info} from '../../info/Info';
import {Room} from '../../domain/Room';
import {RoomStatusCode} from '../../code/RoomStatusCode';
import {Observable} from 'rxjs/Observable';

export class Alarm extends AWObj {

  private roomDetailSubscription: Subscription;
  private start: number;
  private timer: Subscription;
  constructor(stage: AWStage, x: number, y: number, z: number, img: HTMLImageElement) {
    super(stage, x, y, z, img);
  }

  onDraw(context: CanvasRenderingContext2D): void {

    if (this.start >= 0) {
      const fontPT = (this.start >= 100) ? 16 : 18;
      context.save();
      context.font = fontPT + 'pt Multicolore';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillStyle = '#020f1c';
      context.lineWidth = 0;
      if (this.start < 10) {
        context.translate((this.start % 2) * 5, 0);
      }
      context.drawImage(this.img, this.stage.width - this.img.width - 10 , this.y);
      context.fillText(String(this.start), this.stage.width - (this.img.width / 2) - 10, this.y + (this.img.height / 2));
      context.restore();
    }
  }

  onStart(data?: any) {
    this.x = 20;
    this.y = 20;
    this.start = Info.END_CNT;
    //집중도
    console.log('--alarm id- ' + this.id);
    this.roomDetailSubscription = this.stage.eventObservable(AWStageEvent.EVENT_ROOM_DETAIL).filter( (it: Room) => it.status === RoomStatusCode.RUN).subscribe( (room) => {
      if (this.start > 0) {
        this.start--;
      }else {
        room.status = RoomStatusCode.END;
        room.onStop(this);
      }
    });
  }

  onStop(data?: any) {
    if (!ValidUtil.isNullOrUndefined(this.roomDetailSubscription)) {this.roomDetailSubscription.unsubscribe(); }
    if (!ValidUtil.isNullOrUndefined(this.timer)) {this.timer.unsubscribe(); }
  }
  onCreate(data?: any) {}
  onDestroy(data?: any) {}
  onPause(data?: any) {}
  onRestart(data?: any) {}
  onResume(data?: any) {}
}
