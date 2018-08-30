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
import {MathUtil} from '../../../../../../../../../lib-typescript/com/omnicns/math/MathUtil';
import {interval} from 'rxjs/observable/interval';
import {RandomUtil} from '../../../../../../../../../lib-typescript/com/omnicns/random/RandomUtil';
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
  private ranking_shape_02_arrowImg = AWResourceManager.getInstance().resources('ranking_shape_02_arrowImg');
  private characterReady: HTMLImageElement;
  private characterFinish: HTMLImageElement;
  private characterRun: HTMLImageElement;
  private characterRun1: HTMLImageElement;
  private characterRun2: HTMLImageElement;
  private characterTire1: HTMLImageElement;
  private characterTire2: HTMLImageElement;
  private centerYMargin = 0;
  private flagBoard = new Array<MoveObjImg>();
  private character = new MoveObjImg();
  private resizeSubscription: Subscription;
  private velocity: PointVector;
  // public algo: Algo;
  public finish = false;
  private characterIntervalObservable: Observable<number>;
  private chracterSubscription: Subscription;
  private algo: Algo;
  // private algo: Algo;
  constructor(stage: AWStage, characterReady: HTMLImageElement, characterRun1: HTMLImageElement, characterRun2: HTMLImageElement, characterFinish: HTMLImageElement, characterTire1: HTMLImageElement, characterTire2: HTMLImageElement, centerYMargin = 0) {
    super(stage);
    this.characterReady = characterReady;
    this.characterFinish = characterFinish;
    this.characterRun = characterRun1;
    this.characterRun1 = characterRun1;
    this.characterRun2 = characterRun2;
    this.characterTire1 = characterTire1;
    this.characterTire2 = characterTire2;
    this.centerYMargin = centerYMargin;
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
      this.drawImage(context, this.ic_track_01Img, trackX, this.centerY, 'right', 'middle');
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
    this.character.y = this.centerY - 60 + RandomUtil.random(0, 3);
    this.character.add(pixelDiff);
    this.character.x = Math.max(Math.min(this.stage.width - this.shiftEnd, this.character.x), this.shiftStart);
    if (this.room && this.room.status === RoomStatusCode.WAIT) {
      this.character.img = this.characterReady;
    }else if (this.room && this.room.status === RoomStatusCode.RUN) {
      this.character.img = this.characterRun;
    }else if (this.room && this.room.status === RoomStatusCode.END) {
      Observable.from(this.flagBoard).find((it) => it.index === Info.FINISH_TRACK_UNIT).subscribe((it) => {
        // if (it.x < this.character.x) {
        //   this.character.img = this.characterFinish;
        //   this.finish = true;
        // }else {
        //   if (Math.floor(new Date().getMilliseconds() / 500)) {
        //     this.character.img = this.characterTire1;
        //   }else {
        //     this.character.img = this.characterTire2;
        //   }
        //   this.finish = false;
        // }
        if (this.currentPoint.x > this.currentOtherPoint.x) {
          this.character.img = this.characterFinish;
          this.finish = true;
        }else {
          if (Math.floor(new Date().getMilliseconds() / 500)) {
            this.character.img = this.characterTire1;
          }else {
            this.character.img = this.characterTire2;
          }
          this.finish = false;
        }
      });
    }

    //board
    let bCnt = 10;
    let fCnt = 10;
    let isOver = false;
    for (let i = 0; i < this.flagBoard.length; i++) {
      const it = this.flagBoard[i];
      it.y = this.centerY;
      let boardText = '';
      if (it.index > 0 && it.index < Info.FINISH_TRACK_UNIT) {
        it.y += 35;
        boardText = it.index.toLocaleString();
      }
      it.x = this.metreToPixel * it.index + this.shiftStart;
      if (this.room && this.room.status === RoomStatusCode.RUN) {
        it.mass++;
        it.mass += this.speed.x;
        it.x -= it.mass * (MathUtil.getValueByTotInPercent(this.stage.width, this.defaultSppedPercent));
      } else {
        it.x -= it.mass * (MathUtil.getValueByTotInPercent(this.stage.width, this.defaultSppedPercent));
      }
      if (it.x <= this.character.x) {
        bCnt--;
      }
      if (it.x > this.character.x) {
        fCnt--;
        if (isOver === false && this.algo) {
         isOver = true;
          const diff = it.x - this.character.x;
          // console.log('----index ' + it.index + '     ' + it.x);
          const a = (it.index * diff) / it.x;
          // this.algo.successScore = it.index + a - a;//(it.index * this.character.x) / it.x;
          // this.algo.successScore = (this.flagBoard[i - 1].index * this.character.x) / this.flagBoard[i - 1].x;
          const bit = this.flagBoard[i - 1];
          const idiff = it.x - bit.x;
          const cdiff = this.character.x - bit.x;
          const p = MathUtil.getPercentByTot(it.x, this.character.x);
          if (this.id === 'local')
          console.log('------ ' + p )
          // this.algo.successScore = '(' + bit.index + ')' + bit.index + MathUtil.getValuePercentUp(Info.DISPLAY_TRACK_FLAG_UNIT, p);
          this.algo.successScore = Number(bit.index +  MathUtil.getValuePercentUp(Info.DISPLAY_TRACK_FLAG_UNIT, p) - Info.DISPLAY_TRACK_FLAG_UNIT);
          // this.algo.successScore = this.flagBoard[i - 1].index;
          // this.algo.successScore = it.index - 3;
        }
      }
      if (bCnt > 0 || fCnt > 0) {
        it.drawImage(context);
        context.fillText(boardText,  it.x, it.y - 7);
      }
    }

    Observable.from(this.flagBoard).find((it) => it.index === Info.FINISH_TRACK_UNIT).subscribe((it) => {
      if (this.room && it.x < this.character.x) {
        this.room.status = RoomStatusCode.END;
        this.room.onStop(this);
      }
    });
    this.character.drawImage(context);
    if (this.id === 'local') {
      this.drawImage(context, this.ranking_shape_02_arrowImg, this.character.x, this.character.y - this.character.img.height / 2, this.character.imgAlign, this.character.imgBaseline);
    }
    // context.fillText(this.currentPoint.x.toLocaleString(), 20, this.centerY - 10);
    // context.fillText(this.speed.toLocaleString(), this.stage.width / 2 , this.centerY - 65);
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
    console.log('onstart Tack');
    this.velocity = new PointVector(0, 0);
    this.set(0, this.stage.height / 2 + this.centerYMargin);
    this.room = undefined;
    this.beforePoint = new PointVector();
    this.currentPoint = new PointVector(); //초기 거리
    this.beforeOtherPoint = new PointVector();
    this.currentOtherPoint = new PointVector();  //초기 거리
    this.character = new MoveObjImg(0, this.centerY - 60);
    this.character.img = this.characterReady; this.character.imgAlign = 'center'; this.character.imgBaseline = 'middle';
    this.flagBoard = new Array<MoveObjImg>();
    this.characterIntervalObservable  = interval(100);
    if (this.chracterSubscription) { this.chracterSubscription.unsubscribe(); }
    this.chracterSubscription = this.characterIntervalObservable.subscribe((it) => {
      // if (Math.trunc(it / (20 - (this.speed.x * 10)))) {
      if (it % ((this.speed.x || 1) * 100)) {
        this.characterRun = this.characterRun === this.characterRun1 ? this.characterRun2 : this.characterRun1;
      }
    });
    console.log(Info.STEP_UNIT + ' ' + this.stage.clockInterval);
    for (let i = 0; i <= Info.FINISH_TRACK_UNIT; i++) {
      if (i % Info.DISPLAY_TRACK_FLAG_UNIT === 0) {
        const o = new MoveObjImg(); o.index = i;
        this.flagBoard.push(this.resetImgPositionFlagObj(o));
      }
    }
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
        // console.log('cp: ' + this.currentPoint +  ' cop:' + this.currentOtherPoint);
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
