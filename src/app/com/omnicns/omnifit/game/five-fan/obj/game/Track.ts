import {AWStage} from '../../stage/AWStage';
import {AWObj} from '../AWObj';
import {ValidUtil} from '../../../../../../../../../lib-typescript/com/omnicns/valid/ValidUtil';
import {AWStageEvent} from '../../stage/AWStageEvent';
import {Room} from '../../domain/Room';
import {Subscription} from 'rxjs/Subscription';
import {AWResourceManager} from '../../AWResourceManager';
import {Info} from '../../info/Info';

export class Track extends AWObj {
  private roomDetailSubscription: Subscription;
  private room: Room;
  private currentDistance = 0; //초기 화면 보여줄값
  private ic_start_lineImg = AWResourceManager.getInstance().resources('ic_start_lineImg');
  private beforeDistance: number;

  constructor(stage: AWStage, x: number, y: number, z: number, img: HTMLImageElement) {
    super(stage, x, y, z, img);
    this.imgAlign = 'right';
    this.imgBaseline = 'top';
  }

  onDraw(context: CanvasRenderingContext2D): void {
    if (!this.img.complete) { return; }
    this.x = 0;
    this.y = (this.stage.height / 2) + 40;
    while (true) {
      if (this.x >= this.stage.width) {
        break;
      }
      this.x += this.img.width - 1;
      this.drawImage(context);
    }

    const mUnit = this.stage.width / Info.DISPLAY_TRACK_WIDTH_UNIT;
    const speed = this.currentDistance - this.beforeDistance;
    const speedToPixcel = speed * mUnit;
    // console.log(speed + '-' + mUnit + '--' + speedToPixcel)
    // this.drawImage(context, this.ic_start_lineImg, this.mass -= this.currentDistance , 10, 'left', 'middle');
    // console.log('Track currentDistance' + this.currentDistance + ' room ' + this.room);

    if (ValidUtil.isNullOrUndefined(this.room)) { return; }
    console.log('Track currentDistance' + this.currentDistance);
    // if (!this.img.complete) { return; }
    // this.x = this.stage.width / 2;
    // this.y = (this.stage.height / 2) - 30;
    // this.drawImage(context);
    // context.drawImage(this.img, 0, 0);
  }

  onPause(data?: any) {
  }

  onRestart(data?: any) {
  }

  onResume(data?: any) {
  }

  onCreate(data?: any) {
  }

  onStart(data?: any) {
    this.room = undefined;
    this.currentDistance = 0;
    // this.mass = 100;
    const eventObservable  = this.stage.eventObservable(AWStageEvent.EVENT_ROOM_DETAIL);
    if (!ValidUtil.isNullOrUndefined(eventObservable)) {
      this.roomDetailSubscription = eventObservable.filter( (it) => !ValidUtil.isNullOrUndefined(it.local) && !ValidUtil.isNullOrUndefined(it.other) && it.status === 'run').subscribe( (room: Room) => {
        this.room = room;
        this.beforeDistance = this.currentDistance;
        this.currentDistance += this.room.other.headsetConcentration;
      });
    }
  }

  onStop(data?: any) {
    if (!ValidUtil.isNullOrUndefined(this.roomDetailSubscription)) {this.roomDetailSubscription.unsubscribe(); }
  }

  onDestroy(data?: any) {
  }

}
