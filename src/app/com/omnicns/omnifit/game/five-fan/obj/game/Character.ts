import {AWStage} from '../../stage/AWStage';
import {AWObj} from '../AWObj';
import {ValidUtil} from '../../../../../../../../../lib-typescript/com/omnicns/valid/ValidUtil';
import {AWStageEvent} from '../../stage/AWStageEvent';
import {Room} from '../../domain/Room';
import {Subscription} from 'rxjs/Subscription';
import {AWResourceManager} from '../../AWResourceManager';
import {Info} from '../../info/Info';
import {PointVector} from '../../../../../../../../../lib-typescript/com/omnicns/math/PointVector';
import {RoomStatusCode} from '../../code/RoomStatusCode';
import {Observable} from 'rxjs/Observable';
import {ObjImg} from '../../../../../../../../../lib-typescript/com/omnicns/graphics/ObjImg';
import {interval} from 'rxjs/observable/interval';
import {Algo} from '../../domain/Algo';

export class MoveObjImg extends ObjImg {
  private _velocity = new PointVector();
  get velocity() {
    return this._velocity;
  }
  set velocity(value) {
    this._velocity = value;
  }
}
export class Character extends AWObj {
  private roomRunDetailSubscription: Subscription;
  private room: Room;
  private currentPoint = new PointVector(); //초기 거리
  private beforePoint = new PointVector();
  private currentOtherPoint = new PointVector();  //초기 거리
  private beforeOtherPoint = new PointVector();
  private ic_track_01Img = AWResourceManager.getInstance().resources('ic_track_01Img');
  private ic_start_lineImg = AWResourceManager.getInstance().resources('ic_start_lineImg');
  private ic_finish_lineImg = AWResourceManager.getInstance().resources('ic_finish_lineImg');
  private ic_boardImg = AWResourceManager.getInstance().resources('ic_boardImg');
  private ranking_shape_02_arrowImg = AWResourceManager.getInstance().resources('ranking_shape_02_arrowImg');
  private characterReady: HTMLImageElement;
  private characterFinish: HTMLImageElement;
  private characterRun: HTMLImageElement;
  private characterRun1: HTMLImageElement;
  private characterRun2: HTMLImageElement;
  private characterTire1: HTMLImageElement;
  private characterTire2: HTMLImageElement;
  private centerYMargin = 0;
  private character = new MoveObjImg();
  private resizeSubscription: Subscription;
  private velocity: PointVector;
  private characterIntervalObservable: Observable<number>;
  private chracterSubscription: Subscription;
  private algo: Algo;
  bot: boolean;
  constructor(stage: AWStage, characterReady: HTMLImageElement, characterRun1: HTMLImageElement, characterRun2: HTMLImageElement, characterFinish: HTMLImageElement, characterTire1: HTMLImageElement, characterTire2: HTMLImageElement, centerYMargin = 0, bot : boolean) {
    super(stage);
    this.characterReady = characterReady;
    this.characterFinish = characterFinish;
    this.characterRun = characterRun1;
    this.characterRun1 = characterRun1;
    this.characterRun2 = characterRun2;
    this.characterTire1 = characterTire1;
    this.characterTire2 = characterTire2;
    this.centerYMargin = centerYMargin;
    this.bot = bot;
  }

  onDraw(context: CanvasRenderingContext2D): void {
    if (!this.ic_track_01Img.complete) { return; }
    //track
    let trackX = 0;
    while (true) {
      if (trackX >= this.stage.width) {
        break;
      }
      trackX += this.ic_track_01Img.width - 1;
    }

    //debug guide view
    // context.beginPath();
    // context.strokeStyle     = '#FF0000';
    // context.moveTo(this.shiftStart, this.centerY);
    // context.lineTo(this.shiftStart, this.centerY + 20);
    // context.stroke();

    //setting
    const fontPT            = 15;
    context.strokeStyle     = '#261813';
    context.font            = fontPT + 'pt Multicolore';
    context.textAlign       = 'center';
    context.textBaseline    = 'middle';
    context.fillStyle       = '#ffffff';
    context.lineWidth       = 1;
    const speedToPixel      = this.speed.x * this.metreToPixel; //전보다 몇미터 -> 몇 픽셀 이동했는지.
    const speedToPicelOther = this.speedOther.x * this.metreToPixel;
    const pixel             = speedToPixel / this.timeUnit;
    const pixelOther        = speedToPicelOther / this.timeUnit;
    const omDiff            = this.currentPoint.x - this.currentOtherPoint.x;
    const mDiff             = Math.max(Math.min(10, omDiff), -10);  // 몇미터 상대방과 차이나는지.
    const diffToPixel       = mDiff * this.metreToPixel; // 몇미터 -> 몇픽셀 차이나는지.
    const pixelDiff         = diffToPixel / this.timeUnit; // 몇번에 나눠서 그려야되는지.



    //character position
    this.character.img = this.characterReady;


    if (this.room && this.room.status === RoomStatusCode.WAIT) {
      this.character.img = this.characterReady;
    }else if (this.room && this.room.status === RoomStatusCode.RUN) {
      this.character.img = this.characterRun;
    }


    // user
    if (this.bot) {
      this.character.y = (this.stage.height / 2) +  1.5 * (this.stage.height / 7); //3 * (AWResourceManager.getInstance().resources('laserBar').height / 10);
    } else {
      this.character.y = (this.stage.height / 2) - 1.5 * (this.stage.height / 7) - (this.character.img.height);
    }
    this.character.x = this.stage.width / 2 - (this.character.img.width / 2);


    context.drawImage( this.character.img, this.character.x, this.character.y);


  //   if (this.id === 'local') {
  //     this.drawImage(context, this.ranking_shape_02_arrowImg, this.character.x, this.character.y - this.character.img.height / 2, this.character.imgAlign, this.character.imgBaseline);
  //   }
  //   context.fillText(this.currentPoint.x.toLocaleString(), 20, this.centerY - 10);
  //   context.fillText(this.speed.toLocaleString(), this.stage.width / 2 , this.centerY - 65);
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
    this.character = new MoveObjImg(0, this.centerY - 60);
    this.characterIntervalObservable  = interval(100);
    if (this.chracterSubscription) { this.chracterSubscription.unsubscribe(); }
    this.chracterSubscription = this.characterIntervalObservable.subscribe((it) => {
      // if (Math.trunc(it / (20 - (this.speed.x * 10)))) {
      if (it % ((this.speed.x || 1) * 100)) {
        this.characterRun = this.characterRun === this.characterRun1 ? this.characterRun2 : this.characterRun1;
      }
    });

    const eventObservable  = this.stage.eventObservable(AWStageEvent.EVENT_ROOM_DETAIL);
    if (!ValidUtil.isNullOrUndefined(eventObservable)) {
      this.roomRunDetailSubscription = eventObservable.filter( (it) => !ValidUtil.isNullOrUndefined(it.local) && !ValidUtil.isNullOrUndefined(it.other) && it.status === RoomStatusCode.RUN || it.status === RoomStatusCode.END).subscribe((room: Room) => {
        this.room = room;
        if (this.room.status === RoomStatusCode.RUN) {
          this.beforePoint = this.currentPoint.get();
          this.beforeOtherPoint = this.currentOtherPoint.get();
          if (this.id === 'local') {
            this.algo = this.room.local;
            this.currentPoint.add(this.room.local.success);
            this.currentOtherPoint.add(this.room.other.success);
          }else {
            this.algo = this.room.other;
            this.currentPoint.add(this.room.other.success);
            this.currentOtherPoint.add(this.room.local.success);
           }
        }
      });
    }

    this.resizeSubscription = this.stage.canvasEventSubscribe('resize', (evnet: Event) => {
    });
  }

  onStop(data?: any) {
    if (!ValidUtil.isNullOrUndefined(this.roomRunDetailSubscription)) {this.roomRunDetailSubscription.unsubscribe(); }
    if (!ValidUtil.isNullOrUndefined(this.resizeSubscription)) { this.resizeSubscription.unsubscribe(); }
    if (!ValidUtil.isNullOrUndefined(this.chracterSubscription)) { this.chracterSubscription.unsubscribe(); }
  }

  onDestroy(data?: any) {
  }
  get centerY() {
    return (this.stage.height / 2) + this.centerYMargin;
  }
  get shiftStart() {
    return 90;
  }
  get shiftEnd() {
    return 100;
  }
  get defaultSppedPercent() {
    return 0.5;
  }
  get timeUnit() {
    return Info.STEP_UNIT / this.stage.clockInterval;
  }
  get metreToPixel() {
    return this.stage.width / Info.DISPLAY_TRACK_WIDTH_UNIT; //캔버스 width값에 따른  미터당 몇 픽셀인지.
  }
  get speed(): PointVector {
    return PointVector.sub(this.currentPoint, this.beforePoint); // 전보다 몇미터 이동했는지
  }
  get speedOther(): PointVector {
    return PointVector.sub(this.currentOtherPoint, this.beforeOtherPoint); // 전보다 몇미터 이동했는지
  }
  private resetImgPositionFlagObj(objImg: MoveObjImg) {
    // objImg.index = meter; //index를 meter로 쓴다.
    if (objImg.index === 0) {
      objImg.img = this.ic_start_lineImg; objImg.imgAlign = 'left'; objImg.imgBaseline = 'middle';
      objImg.y = this.centerY;
    }else if (objImg.index === Info.FINISH_TRACK_UNIT) {
      objImg.img = this.ic_finish_lineImg; objImg.imgAlign = 'left'; objImg.imgBaseline = 'middle';
      objImg.y = this.centerY;
    }else {
      objImg.img = this.ic_boardImg; objImg.imgAlign = 'center'; objImg.imgBaseline = 'middle';
      objImg.y = this.centerY + 35;
    }
    objImg.x = (this.metreToPixel * objImg.index) + this.shiftStart;
    return objImg;
  }
}
