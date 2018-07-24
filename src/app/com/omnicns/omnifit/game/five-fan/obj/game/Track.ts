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

export class Track extends AWObj {
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
  private characterReady: HTMLImageElement;
  private characterFinish: HTMLImageElement;
  private characterRun1: HTMLImageElement;
  private characterRun2: HTMLImageElement;
  private characterTire1: HTMLImageElement;
  private characterTire2: HTMLImageElement;
  private centerYMargin = 0;
  private flagBoard = new Array<PointVector>();

  private characterPoint = new PointVector();
  constructor(stage: AWStage, characterReady: HTMLImageElement, characterRun1: HTMLImageElement, characterRun2: HTMLImageElement, characterFinish: HTMLImageElement, characterTire1: HTMLImageElement, characterTire2: HTMLImageElement, centerYMargin = 0) {
    super(stage);
    this.characterReady = characterReady;
    this.characterFinish = characterFinish;
    this.characterRun1 = characterRun1;
    this.characterRun2 = characterRun2;
    this.characterTire1 = characterTire1;
    this.characterTire2 = characterTire2;
    this.centerYMargin = centerYMargin;
  }

  onDraw(context: CanvasRenderingContext2D): void {
    if (!this.ic_track_01Img.complete) { return; }
    let trackX = 0;
    const trackY = (this.stage.height / 2) + this.centerYMargin;
    while (true) {
      if (trackX >= this.stage.width) {
        break;
      }
      trackX += this.ic_track_01Img.width - 1;
      this.drawImage(context, this.ic_track_01Img, trackX, trackY, 'right', 'middle');
    }

    ////////// setting
    // const timeUnit = Info.STEP_UNIT / this.stage.clockInterval;
    const timeUnit          = Info.STEP_UNIT / this.stage.clockInterval; // 몇번에 나눠서 그려야되는지.
    const metreToPixel     = this.stage.width / Info.DISPLAY_TRACK_WIDTH_UNIT; //캔버스 width값에 따른  미터당 몇 픽셀인지.
    const speed             = PointVector.sub(this.currentPoint, this.beforePoint); // 전보다 몇미터 이동했는지
    const speedOther        = PointVector.sub(this.currentOtherPoint, this.beforeOtherPoint);
    const speedToPixel      = speed.x * metreToPixel; //전보다 몇미터 -> 몇 픽셀 이동했는지.
    const speedToPicelOther = speedOther.x * metreToPixel;
    const pixel             = speedToPixel / timeUnit;
    const pixelOther        = speedToPicelOther / timeUnit;
    //////////////////////////
    const mDiff             = Math.max(Math.min(10, this.currentPoint.x - this.currentOtherPoint.x), -10);  // 몇미터 상대방과 차이나는지.
    const diffToPixel       = mDiff * metreToPixel; // 몇미터 -> 몇픽셀 차이나는지.
    const pixelDiff         = diffToPixel / timeUnit; // 몇번에 나눠서 그려야되는지.
    let characterImg = this.characterReady;
    if (this.currentPoint.x <= 0) {
      characterImg = this.characterReady;
    }else if (this.currentPoint.x > 0 && this.currentPoint.x < 100) {
      characterImg = this.characterRun1;
    }else if (this.currentPoint.x >= 100) {
      characterImg = this.characterFinish;
    }
    // this.characterPoint.x = this.characterPoint.x || (this.stage.width / 2) - 100;
    this.characterPoint.x = this.characterPoint.x || characterImg.width / 2;
    this.characterPoint.y = ((this.stage.height / 2) + this.centerYMargin) - 50;
    this.characterPoint.add(pixelDiff);
    this.characterPoint.x = Math.max(Math.min(this.stage.width - (characterImg.width / 2), this.characterPoint.x), characterImg.width / 2);
    this.drawImage(context, characterImg, this.characterPoint.x, this.characterPoint.y, 'center', 'middle');

    //mboard
    const fontPT          = 15;
    context.strokeStyle   = '#261813';
    context.font          = fontPT + 'pt Multicolore';
    context.textAlign     = 'center';
    context.textBaseline  = 'middle';
    context.fillStyle     = '#ffffff';
    context.lineWidth     = 1;
    context.fillText(this.currentPoint.x.toLocaleString(), this.characterPoint.x, this.characterPoint.y);
    // const tM = Math.trunc(this.currentPoint.x);
    // for (let i = Math.max(tM - 10, 0); i <= Math.min(tM + 10, Info.FINISH_TRACK_UNIT); i++) {
    //   const flagPoint = new PointVector();
    //   if (i % Info.DISPLAY_TRACK_FLAG_UNIT === 0) {
    //     if (i - tM < 0) {
    //       flagPoint.x = this.characterPoint.x - metreToPixel * Math.abs(i - tM);
    //     }else {
    //       flagPoint.x = this.characterPoint.x + metreToPixel * Math.abs(i - tM);
    //     }
    //
    //     this.drawImage(context, this.ic_boardImg, flagPoint.x, this.characterPoint.y, 'center', 'middle');
    //     context.fillText(i.toLocaleString(),  flagPoint.x, this.characterPoint.y - 10);
    //   }
    // }
    const tM = Math.trunc(this.currentPoint.x);
    for (let i = Math.max(tM - 10, 0); i <= Math.min(tM + 10, Info.FINISH_TRACK_UNIT); i++) {if (i % Info.DISPLAY_TRACK_FLAG_UNIT === 0) {
      Observable.from(this.flagBoard).find((x) => x.z === i).subscribe((it) => {if (!ValidUtil.isNullOrUndefined(it)) {
        const distPixcel = this.characterPoint.x + metreToPixel * (i - tM);
        it.add(distPixcel / timeUnit);
        this.drawImage(context, this.ic_boardImg, it.x, this.characterPoint.y, 'center', 'middle');
        context.fillText(i.toLocaleString(), it.x, this.characterPoint.y - 10);
      }});
    }}

    // for (let i = Math.max(tM - 10, 0); i <= Math.min(tM + 10, Info.FINISH_TRACK_UNIT); i++) {
    //   const flagPoint = new PointVector();
    //   // this.drawImage(context, this.ic_boardImg, flagPoint.x, this.characterPoint.y, 'center', 'middle');
    //   flagPoint.x = this.characterPoint.x + metreToPixel * (i - tM);
    //   context.fillText(i.toLocaleString(),  flagPoint.x, this.characterPoint.y - 10);
    // }
    //
    //
    //
    if (ValidUtil.isNullOrUndefined(this.room)) { return; }
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
    console.log('onstart Tack')
    this.room = undefined;
    this.beforePoint = new PointVector();
    this.currentPoint = new PointVector(); //초기 거리
    this.beforeOtherPoint = new PointVector();
    this.currentOtherPoint = new PointVector();  //초기 거리
    this.characterPoint = new PointVector();
    this.flagBoard = new Array<PointVector>();
    for (let i = 0; i <= Info.FINISH_TRACK_UNIT; i++) {
      if (i % Info.DISPLAY_TRACK_FLAG_UNIT === 0) {
        this.flagBoard.push(new PointVector(0, 0, i));
      }
    }
    // this.mass = 100;
    const eventObservable  = this.stage.eventObservable(AWStageEvent.EVENT_ROOM_DETAIL);
    if (!ValidUtil.isNullOrUndefined(eventObservable)) {
      this.roomRunDetailSubscription = eventObservable.filter( (it) => !ValidUtil.isNullOrUndefined(it.local) && !ValidUtil.isNullOrUndefined(it.other) && it.status === RoomStatusCode.RUN || it.status === RoomStatusCode.END).subscribe( (room: Room) => {
        this.room = room;
        this.beforePoint = this.currentPoint.get();
        this.beforeOtherPoint = this.currentOtherPoint.get();
        if (this.id === 'local') {
          this.currentPoint.add(this.room.local.headsetConcentration);
          this.currentOtherPoint.add(this.room.other.headsetConcentration);
        }else {
          this.currentPoint.add(this.room.other.headsetConcentration);
          this.currentOtherPoint.add(this.room.local.headsetConcentration);
        }
        console.log('cp: ' + this.currentPoint +  ' cop:' + this.currentOtherPoint);
      });
    }
  }

  onStop(data?: any) {
    if (!ValidUtil.isNullOrUndefined(this.roomRunDetailSubscription)) {this.roomRunDetailSubscription.unsubscribe(); }
  }

  onDestroy(data?: any) {
  }

}
