import {AWStage} from '../../stage/AWStage';
import {AWObj} from '../AWObj';
import {ValidUtil} from '../../../../../../../../../lib-typescript/com/omnicns/valid/ValidUtil';
import {AWStageEvent} from '../../stage/AWStageEvent';
import {Room} from '../../domain/Room';
import {Subscription} from 'rxjs/Subscription';
import {AWResourceManager} from '../../AWResourceManager';
import {Info} from '../../info/Info';
import {PointVector} from '../../../../../../../../../lib-typescript/com/omnicns/math/PointVector';

export class Track extends AWObj {
  private roomDetailSubscription: Subscription;
  private room: Room;
  private currentPoint = new PointVector(); //초기 거리
  private beforePoint = new PointVector();
  private currentOtherPoint = new PointVector();  //초기 거리
  private beforeOtherPoint = new PointVector();
  private ic_track_01Img = AWResourceManager.getInstance().resources('ic_track_01Img');
  private ic_start_lineImg = AWResourceManager.getInstance().resources('ic_start_lineImg');
  private characterReady: HTMLImageElement;
  private characterFinish: HTMLImageElement;
  private characterRun1: HTMLImageElement;
  private characterRun2: HTMLImageElement;
  private characterTire1: HTMLImageElement;
  private characterTire2: HTMLImageElement;
  private centerYMargin = 0;

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
    const timeUnit = Info.STEP_UNIT / this.stage.clockInterval;
    const mPerPixelUnit = this.stage.width / Info.DISPLAY_TRACK_WIDTH_UNIT;
    const speed =  PointVector.sub(this.currentPoint, this.beforePoint);
    const speedOther = PointVector.sub(this.currentOtherPoint, this.beforeOtherPoint);
    const speedToPixel = speed.x * mPerPixelUnit;
    const speedToPicelOther = speedOther.x * mPerPixelUnit;
    const pixel = speedToPixel / timeUnit;
    const pixelOther = speedToPicelOther / timeUnit;
    //////////////////////////
    const mDiff = Math.max(Math.min(10, this.currentPoint.x - this.currentOtherPoint.x), -10);
    const diffToPixel = mDiff * mPerPixelUnit;
    const pixelDiff = diffToPixel / timeUnit;
    let characterImg = this.characterReady;
    if (this.currentPoint.x <= 0) {
      characterImg = this.characterReady;
    }else if (this.currentPoint.x > 0 && this.currentPoint.x < 100) {
      characterImg = this.characterRun1;
    }else if (this.currentPoint.x >= 100) {
      characterImg = this.characterFinish;
    }
    this.characterPoint.x = this.characterPoint.x || (this.stage.width / 2);
    this.characterPoint.y = ((this.stage.height / 2) + this.centerYMargin) - 50;
    this.characterPoint.add(pixelDiff);
    this.characterPoint.x = Math.max(Math.min(this.stage.width -  (characterImg.width / 2), this.characterPoint.x), characterImg.width / 2);
    this.drawImage(context, characterImg, this.characterPoint.x, this.characterPoint.y, 'center', 'middle');
    // console.log(speed + '-' + mUnit + '--' + speedToPixcel)
    // this.drawImage(context, this.ic_start_lineImg, this.mass -= this.currentDistance , 10, 'left', 'middle');
    // console.log('Track currentDistance' + this.currentDistance + ' room ' + this.room);

    if (ValidUtil.isNullOrUndefined(this.room)) { return; }
    //console.log('Track currentDistance' + this.currentDistance);
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
    this.beforePoint = new PointVector();
    this.currentPoint = new PointVector(); //초기 거리
    this.beforeOtherPoint = new PointVector();
    this.currentOtherPoint = new PointVector();  //초기 거리
    // this.mass = 100;
    const eventObservable  = this.stage.eventObservable(AWStageEvent.EVENT_ROOM_DETAIL);
    if (!ValidUtil.isNullOrUndefined(eventObservable)) {
      this.roomDetailSubscription = eventObservable.filter( (it) => !ValidUtil.isNullOrUndefined(it.local) && !ValidUtil.isNullOrUndefined(it.other) && it.status === 'run').subscribe( (room: Room) => {
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
        console.log('cp: ' + this.currentPoint +  ' cop:' + this.currentPoint);
      });
    }
  }

  onStop(data?: any) {
    if (!ValidUtil.isNullOrUndefined(this.roomDetailSubscription)) {this.roomDetailSubscription.unsubscribe(); }
  }

  onDestroy(data?: any) {
  }

}
