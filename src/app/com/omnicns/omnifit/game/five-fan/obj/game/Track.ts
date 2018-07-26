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
  private characterReady: HTMLImageElement;
  private characterFinish: HTMLImageElement;
  private characterRun1: HTMLImageElement;
  private characterRun2: HTMLImageElement;
  private characterTire1: HTMLImageElement;
  private characterTire2: HTMLImageElement;
  private centerYMargin = 0;
  private flagBoard = new Array<MoveObjImg>();
  private character = new MoveObjImg();
  private resizeSubscription: Subscription;
  private velocity: PointVector;
  // private algo: Algo;
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
    context.beginPath();
    context.strokeStyle = '#FF0000';
    context.moveTo(this.shiftStart, this.centerY);
    context.lineTo(this.shiftStart, this.centerY + 20);
    context.stroke();

    //setting
    const fontPT          = 15;
    context.strokeStyle   = '#261813';
    context.font          = fontPT + 'pt Multicolore';
    context.textAlign     = 'center';
    context.textBaseline  = 'middle';
    context.fillStyle     = '#ffffff';
    context.lineWidth     = 1;
    const speed             = PointVector.sub(this.currentPoint, this.beforePoint); // 전보다 몇미터 이동했는지
    const speedOther        = PointVector.sub(this.currentOtherPoint, this.beforeOtherPoint);
    const speedToPixel      = speed.x * this.metreToPixel; //전보다 몇미터 -> 몇 픽셀 이동했는지.
    const speedToPicelOther = speedOther.x * this.metreToPixel;
    const pixel             = speedToPixel / this.timeUnit;
    const pixelOther        = speedToPicelOther / this.timeUnit;
    const omDiff            = this.currentPoint.x - this.currentOtherPoint.x;
    const mDiff             = Math.max(Math.min(10, omDiff), -10);  // 몇미터 상대방과 차이나는지.
    const diffToPixel       = mDiff * this.metreToPixel; // 몇미터 -> 몇픽셀 차이나는지.
    const pixelDiff         = diffToPixel / this.timeUnit; // 몇번에 나눠서 그려야되는지.


    //character
    this.character.img = this.characterReady;
    this.character.y = this.centerY - 50;
    if (this.currentPoint.x <= 0) {
      this.character.img = this.characterReady; this.character.imgAlign = 'center'; this.character.imgBaseline = 'middle';
      // this.character.x = this.shiftStart;
    }else if (this.currentPoint.x > 0 && this.currentPoint.x < Info.FINISH_TRACK_UNIT) {
      this.character.img = this.characterRun1;
      this.character.imgAlign = 'left'; this.character.imgBaseline = 'middle';
    }else if (this.currentPoint.x >= Info.FINISH_TRACK_UNIT) {
      this.character.img = this.characterFinish;
      this.character.imgAlign = 'left'; this.character.imgBaseline = 'middle';
    }
    this.character.add(pixelDiff);
    this.character.x = Math.max(Math.min(this.stage.width - (this.character.img.width) - this.shiftEnd, this.character.x), this.shiftStart);

    //board
    this.flagBoard.forEach((it) => {
      it.y = this.centerY;
      if (it.index > 0 && it.index < Info.FINISH_TRACK_UNIT) {
        it.y += 50;
      }
      it.x = this.metreToPixel * it.index + this.shiftStart;
      // targetPosition.x -= this.currentPoint.x * this.metreToPixel;
      // it.sub(pixel);
      // if (omDiff > 10) {
      //   it.add(oldChracterX - this.character.x);
      // }
      // it.sub(pixel);
      if (this.room && this.room.status === RoomStatusCode.RUN) {
        it.mass++;
        it.mass += speed.x;
        it.x -= it.mass * (MathUtil.getValueByTotInPercent(this.stage.width, this.defaultSppedPercent));
        // it.x -= it.mass * this.defaultSppedPercent + MathUtil.getValueByTotInPercent(this.stage.width, this.currentPoint.x);
        //it.velocity
        // it.x -= it.mass * (MathUtil.getValueByTotInPercent(this.stage.width, this.defaultSppedPercent)); // + (MathUtil.getValueByTotInPercent(this.stage.width, speed.x) / this.timeUnit)));
        // it.x -= MathUtil.getValueByTotInPercent(it.mass * (MathUtil.getValueByTotInPercent(this.stage.width, this.defaultSppedPercent)), speed.x);
        // it.x -= it.mass * MathUtil.getValueByTotInPercent(MathUtil.getValueByTotInPercent(this.stage.width, this.defaultSppedPercent), speed.x);
        // let s = it.mass * MathUtil.getValueByTotInPercent(this.stage.width, speed.x);
        // let s = it.mass * (MathUtil.getValueByTotInPercent(this.stage.width, this.defaultSppedPercent));
        // s += it.mass * MathUtil.getValueByTotInPercent(s, speed.x);
        // it.x = it.mass * (MathUtil.getValueByTotInPercent(this.stage.width, this.defaultSppedPercent));
        // it.velocity.x = MathUtil.getValueByTotInPercent(this.stage.width, speed.x);
        // if (it.index === 0) {
        //   context.fillText(s.toLocaleString(), this.stage.width - 40 , this.centerY - 10);
        // };
        // it.x -= s;
        // it.x -= MathUtil.getValueByTotInPercent(this.stage.width, speed.x);
        // it.add(it.velocity);
        ////////////
        // it.x -= it.mass * (MathUtil.getValueByTotInPercent(this.stage.width, this.defaultSppedPercent));
        // const targetPosition = it.get();
        // targetPosition.x -= MathUtil.getValueByTotInPercent(this.stage.width, speed.x * 10);
        // const dir = PointVector.sub(targetPosition, it);
        // //if (this.id === 'other') {console.log('--> ' + dir.x); }
        // dir.normalize();
        // dir.mult(new PointVector(0.1, 1, 1));
        // it.velocity.add(dir); //속도
        // it.add(it.velocity);
        // const oldPosition = it.get();
        // const oldCheck = PointVector.sub(oldPosition, targetPosition);
        // const check = PointVector.sub(it, targetPosition);
        // if (oldCheck.x <= 0 && check.x > 0 || oldCheck.x >= 0 && check.x < 0) {
        //   it.x = targetPosition.x;
        //   it.velocity.x = 0;
        // }
        // if (oldCheck.y <= 0 && check.y > 0 || oldCheck.y >= 0 && check.y < 0) {
        //   it.y = targetPosition.y;
        //   it.velocity.y = 0;
        // }

        // it.x -= it.mass;// * 1;
      }
      //   it.x -= 10; // + MathUtil.getValueByTotInPercent(this.stage.width, this.currentPoint.x);
      //---------
      // const dir = PointVector.sub(targetPosition, it);
      // dir.normalize(); dir.mult(new PointVector(0.2, 0.2, 0));
      // it.velocity.add(dir);
      // // it.velocity.limit(2);
      // const oldPosition = it.get();
      // it.add(it.velocity);
      // const oldCheck = PointVector.sub(oldPosition, targetPosition);
      // const check = PointVector.sub(it, targetPosition);
      // if (oldCheck.x <= 0 && check.x > 0 || oldCheck.x >= 0 && check.x < 0) {
      //   it.x = targetPosition.x;
      //   it.velocity.x = 0;
      // }
      // if (oldCheck.y <= 0 && check.y > 0 || oldCheck.y >= 0 && check.y < 0) {
      //   it.y = targetPosition.y;
      //   it.velocity.x = 0;
      // }
      it.drawImage(context);
      context.fillText(it.index.toLocaleString(),  it.x, it.y - 10);
    });


    this.character.drawImage(context);
    context.fillText(this.currentPoint.x.toLocaleString(), 20, this.centerY - 10);
    context.fillText(speed.toLocaleString(), this.stage.width / 2 , this.centerY - 65);

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
    this.character = new MoveObjImg(0, this.centerY - 50);
    this.flagBoard = new Array<MoveObjImg>();
    console.log(Info.STEP_UNIT + ' ' + this.stage.clockInterval);
    for (let i = 0; i <= Info.FINISH_TRACK_UNIT; i++) {
      if (i % Info.DISPLAY_TRACK_FLAG_UNIT === 0) {
      // if (i % Info.DISPLAY_TRACK_FLAG_UNIT === 0 && i === 6) {
        const o = new MoveObjImg(); o.index = i;
        this.flagBoard.push(this.resetImgPositionFlagObj(o));
      }
    }
    // this.mass = 100;
    const eventObservable  = this.stage.eventObservable(AWStageEvent.EVENT_ROOM_DETAIL);
    if (!ValidUtil.isNullOrUndefined(eventObservable)) {
      this.roomRunDetailSubscription = eventObservable.filter( (it) => !ValidUtil.isNullOrUndefined(it.local) && !ValidUtil.isNullOrUndefined(it.other) && it.status === RoomStatusCode.RUN || it.status === RoomStatusCode.END).subscribe((room: Room) => {
        this.room = room;
        this.beforePoint = this.currentPoint.get();
        this.beforeOtherPoint = this.currentOtherPoint.get();
        // console.log('Track EventRoomDetail ' + this.room);
        if (this.id === 'local') {
          // this.algo = this.room.local;
          this.currentPoint.add(this.room.local.success);
          this.currentOtherPoint.add(this.room.other.success);
        }else {
          // this.algo = this.room.other;
          this.currentPoint.add(this.room.other.success);
          this.currentOtherPoint.add(this.room.local.success);
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
  }

  onDestroy(data?: any) {
  }
  get centerY() {
    return (this.stage.height / 2) + this.centerYMargin;
  }
  get shiftStart() {
    return 60;
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
      objImg.y = this.centerY + 50;
    }
    objImg.x = (this.metreToPixel * objImg.index) + this.shiftStart;
    return objImg;
  }
}
