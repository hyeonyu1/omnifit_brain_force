import {Subscription} from 'rxjs/Subscription';
import {Room} from '../../domain/Room';
import {PointVector} from '../../../../../../../../../lib-typescript/com/omnicns/math/PointVector';
import {ValidUtil} from '../../../../../../../../../lib-typescript/com/omnicns/valid/ValidUtil';
import {AWStage} from '../../stage/AWStage';
import {AWStageEvent} from '../../stage/AWStageEvent';
import {AWObj} from '../AWObj';
import {AWResourceManager} from '../../AWResourceManager';
import {RandomUtil} from '../../../../../../../../../lib-typescript/com/omnicns/random/RandomUtil';

export class Fan extends AWObj {
  private velocity: PointVector;
  private roomDetailSubscription: Subscription;
  private room: Room;
  private stepSize = 30;
  private _order;
  private ic_shelfImg = AWResourceManager.getInstance().resources('ic_shelfImg');
  private ic_fan_onImg = AWResourceManager.getInstance().resources('ic_fan_onImg');
  private ic_fanframe_01Img = AWResourceManager.getInstance().resources('ic_fanframe_01Img');
  private ic_fanframe_02Img = AWResourceManager.getInstance().resources('ic_fanframe_02Img');
  private ic_fanframe_powerImg = AWResourceManager.getInstance().resources('ic_fanframe_powerImg');

  private ic_fan_offImgPos = new PointVector(this.stage.width / 2, (this.stage.height / 2) + (this.stage.height / 10));
  private audio: HTMLAudioElement;

  constructor(stage: AWStage, img: HTMLImageElement, order = 0) {
    super(stage, 0, 0, 0, img);
    this.imgAlign = 'center';
    this.imgBaseline = 'middle';
    this._order = order;
  }

  get order(): number {
    return this._order;
  }

  set order(value: number) {
    this._order = value;
  }

  onDraw(context: CanvasRenderingContext2D): void {
    const x = ((this.stage.width / 2) - 190 + ((this.ic_shelfImg.width - 80) / 5) * (this.order > 5 ? this.order - 5 : this.order));
    const y = (this.stage.height / 2) + (this.order > 5 ? this.ic_fanframe_01Img.height - 10 : -13);

    context.translate(x, y);

    // context.translate(50 * this._order, this.stage.height / 2);
    // console.log('---' + this._order);
    // if (!ValidUtil.isNullOrUndefined(this.room) && this.room.other.successHistory.length >= this.order) {
    //   this.mass += this.stepSize;
    // } else {
    //   this.mass = 0;
    // }

    this.drawRotate(context, (c) => {
      this.drawImage(context, this.mass > 0 ? this.ic_fan_onImg : this.img, this.x, this.y - 7);
    }, this.x, this.y - 7, this.mass);

    if (!(this.mass > 0)) {
      this.drawImage(context, this.ic_fanframe_01Img, this.x, this.y);
    }

    const n = Math.trunc(RandomUtil.random(0, 1.99));
    if (this.mass > 0) {
      if (n <= 0) {
        this.drawImage(context, this.ic_fanframe_01Img, this.x, this.y);
      } else {
        this.drawImage(context, this.ic_fanframe_02Img, this.x, this.y);
      }
      this.drawImage(context, this.ic_fanframe_powerImg, this.x, this.y + 30);
    }
  }

  onStart(data?: any) {
    this.velocity = new PointVector(0, 0);
    this.mass = 0;
    this.room = undefined;
    this.set(0, 0, 0);
    const eventObservable = this.stage.eventObservable(AWStageEvent.EVENT_ROOM_DETAIL);
    if (!ValidUtil.isNullOrUndefined(eventObservable)) {
      this.roomDetailSubscription = eventObservable.filter( (it) => !ValidUtil.isNullOrUndefined(it.local) && !ValidUtil.isNullOrUndefined(it.other) && it.status === 'run').subscribe( (room: Room) => {
        this.room = room;
        // if (this.room.other.successHistory.length === this.order) {
        //   this.audio = AWResourceManager.getInstance().resources('fanSound');
        //   this.audio.play();
        // }
      });
    }
  }

  onStop() {
    // if (!ValidUtil.isNullOrUndefined(this.roomDetailSubscription)) {this.roomDetailSubscription.unsubscribe(); }
    if (this.audio) {this.audio.pause(); this.audio.currentTime = 0; }
  }
  onCreate(data?: any) {}
  onDestroy(data?: any) {}
  onPause(data?: any) {}
  onRestart(data?: any) {}
  onResume(data?: any) {}
}
