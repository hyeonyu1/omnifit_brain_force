// import {AWStage} from '../../stage/AWStage';
// import {AWObj} from '../AWObj';
// import {ValidUtil} from '../../../../../../../../../lib-typescript/com/omnicns/valid/ValidUtil';
// import {AWStageEvent} from '../../stage/AWStageEvent';
// import {Room} from '../../domain/Room';
// import {Subscription} from 'rxjs/Subscription';
// import {AWResourceManager} from '../../AWResourceManager';
// import {Info} from '../../info/Info';
// import {PointVector} from '../../../../../../../../../lib-typescript/com/omnicns/math/PointVector';
// import {RoomStatusCode} from '../../code/RoomStatusCode';
// import {Observable} from 'rxjs/Observable';
// import {ObjImg} from '../../../../../../../../../lib-typescript/com/omnicns/graphics/ObjImg';
//
// export class Track extends AWObj {
//   private roomRunDetailSubscription: Subscription;
//   private room: Room;
//   private currentPoint = new PointVector(); //초기 거리
//   private beforePoint = new PointVector();
//   private currentOtherPoint = new PointVector();  //초기 거리
//   private beforeOtherPoint = new PointVector();
//   private ic_track_01Img = AWResourceManager.getInstance().resources('ic_track_01Img');
//   private ic_start_lineImg = AWResourceManager.getInstance().resources('ic_start_lineImg');
//   private ic_finish_lineImg = AWResourceManager.getInstance().resources('ic_finish_lineImg');
//   private ic_boardImg = AWResourceManager.getInstance().resources('ic_boardImg');
//   private characterReady: HTMLImageElement;
//   private characterFinish: HTMLImageElement;
//   private characterRun1: HTMLImageElement;
//   private characterRun2: HTMLImageElement;
//   private characterTire1: HTMLImageElement;
//   private characterTire2: HTMLImageElement;
//   private centerYMargin = 0;
//   private flagBoard = new Array<ObjImg>();
//   private metreToPixel: number;
//
//   private characterPoint = new PointVector();
//   private resizeSubscription: Subscription;
//   constructor(stage: AWStage, characterReady: HTMLImageElement, characterRun1: HTMLImageElement, characterRun2: HTMLImageElement, characterFinish: HTMLImageElement, characterTire1: HTMLImageElement, characterTire2: HTMLImageElement, centerYMargin = 0) {
//     super(stage);
//     this.characterReady = characterReady;
//     this.characterFinish = characterFinish;
//     this.characterRun1 = characterRun1;
//     this.characterRun2 = characterRun2;
//     this.characterTire1 = characterTire1;
//     this.characterTire2 = characterTire2;
//     this.centerYMargin = centerYMargin;
//   }
//
//   onDraw(context: CanvasRenderingContext2D): void {
//     if (!this.ic_track_01Img.complete) { return; }
//     let trackX = 0;
//     const trackY = (this.stage.height / 2) + this.centerYMargin;
//     while (true) {
//       if (trackX >= this.stage.width) {
//         break;
//       }
//       trackX += this.ic_track_01Img.width - 1;
//       this.drawImage(context, this.ic_track_01Img, trackX, trackY, 'right', 'middle');
//     }
//
//     ////////// setting
//     // const timeUnit = Info.STEP_UNIT / this.stage.clockInterval;
//     const timeUnit          = Info.STEP_UNIT / this.stage.clockInterval; // 몇번에 나눠서 그려야되는지.
//     const speed             = PointVector.sub(this.currentPoint, this.beforePoint); // 전보다 몇미터 이동했는지
//     const speedOther        = PointVector.sub(this.currentOtherPoint, this.beforeOtherPoint);
//     const speedToPixel      = speed.x * this.metreToPixel; //전보다 몇미터 -> 몇 픽셀 이동했는지.
//     const speedToPicelOther = speedOther.x * this.metreToPixel;
//     const pixel             = speedToPixel / timeUnit;
//     const pixelOther        = speedToPicelOther / timeUnit;
//     //////////////////////////
//     const omDiff            = this.currentPoint.x - this.currentOtherPoint.x;
//     const mDiff             = Math.max(Math.min(10, omDiff), -10);  // 몇미터 상대방과 차이나는지.
//     const diffToPixel       = mDiff * this.metreToPixel; // 몇미터 -> 몇픽셀 차이나는지.
//     const pixelDiff         = diffToPixel / timeUnit; // 몇번에 나눠서 그려야되는지.
//
//
//
//     //mboard
//     const fontPT          = 15;
//     context.strokeStyle   = '#261813';
//     context.font          = fontPT + 'pt Multicolore';
//     context.textAlign     = 'center';
//     context.textBaseline  = 'middle';
//     context.fillStyle     = '#ffffff';
//     context.lineWidth     = 1;
//     context.fillText(this.currentPoint.x.toLocaleString(), this.characterPoint.x, this.characterPoint.y);
//
//     let characterImg = this.characterReady;
//     if (this.currentPoint.x <= 0) {
//       characterImg = this.characterReady;
//     }else if (this.currentPoint.x > 0 && this.currentPoint.x < Info.FINISH_TRACK_UNIT) {
//       characterImg = this.characterRun1;
//     }else if (this.currentPoint.x >= Info.FINISH_TRACK_UNIT) {
//       characterImg = this.characterFinish;
//     }
//
//     // const startMargin = characterImg.width / 2;
//     // this.characterPoint.x = this.characterPoint.x || startMargin;
//     this.characterPoint.y = ((this.stage.height / 2) + this.centerYMargin) - 50;
//     // const oldCharacterX = this.characterPoint.x;
//     // if (omDiff > 100) {
//     this.characterPoint.add(pixelDiff);
//     this.characterPoint.x = Math.max(Math.min(this.stage.width - (characterImg.width / 2), this.characterPoint.x), characterImg.width / 2);
//     // }
//     // this.characterPoint.x = Math.min(this.stage.width - (characterImg.width / 2), this.characterPoint.x);
//
//     /////////////board2
//     this.flagBoard.forEach((it: ObjImg) => {
//       // console.log('this.characterPoint.x '+this.characterPoint.x)
//       // if (this.id === 'local') {console.log('kkk  ' + this.characterPoint.x + ' + ' + oldCharacterX); }
//       // it.mass += 1;
//       it.sub(pixel);
//       // if (this.id === 'other') {console.log('kkk  ' + (this.characterPoint.x - oldCharacterX)); }
//       // if (this.id === 'other') {console.log('kkk pixel:' + pixel + ' > ' + it.index + '  ' + it.mass); }
//       // it.add(this.characterPoint.x - oldCharacterX);
//       // const d = this.characterPoint.x + oldCharacterX;
//       // it.drawImage(context, it.img, it.x - (pixel * it.mass));
//       // console.log('>>> ' + (this.characterPoint.x - characterImg.width / 2));
//       // const dd = (this.characterPoint.x - characterImg.width / 2);
//       // it.drawImage(context, it.img, it.x - (this.characterPoint.x - 70));
//       // it.drawImage(context, it.img, it.x + dd);
//       // context.fillText(it.index.toLocaleString(),  it.x + dd, it.y - 10);
//       it.drawImage(context, it.img);
//       context.fillText(it.index.toLocaleString(),  it.x, it.y - 10);
//       // if (this.id === 'other') {console.log('kkk ' + it.x + '  ' + it.y); }
//     });
//
//     this.drawImage(context, characterImg, this.characterPoint.x, this.characterPoint.y, 'center', 'middle');
//     context.fillText(speed.x.toLocaleString() + ' : ' + this.currentPoint.x.toLocaleString(), this.characterPoint.x, this.characterPoint.y);
//     // for (let i = Math.max(tM - 10, 0); i <= Math.min(tM + 10, Info.FINISH_TRACK_UNIT); i++) {
//     //   const flagPoint = new PointVector();
//     //   // this.drawImage(context, this.ic_boardImg, flagPoint.x, this.characterPoint.y, 'center', 'middle');
//     //   flagPoint.x = this.characterPoint.x + metreToPixel * (i - tM);
//     //   context.fillText(i.toLocaleString(),  flagPoint.x, this.characterPoint.y - 10);
//     // }
//     //
//     //
//     //
//     // if (ValidUtil.isNullOrUndefined(this.room)) { return; }
//   }
//
//   onPause(data?: any) {
//   }
//
//   onRestart(data?: any) {
//   }
//
//   onResume(data?: any) {
//   }
//
//   onCreate(data?: any) {
//   }
//
//   onStart(data?: any) {
//     console.log('onstart Tack')
//     this.room = undefined;
//     this.beforePoint = new PointVector();
//     this.currentPoint = new PointVector(); //초기 거리
//     this.beforeOtherPoint = new PointVector();
//     this.currentOtherPoint = new PointVector();  //초기 거리
//     this.characterPoint = new PointVector(70);
//     this.flagBoard = new Array<ObjImg>();
//     this.metreToPixel = this.stage.width / Info.DISPLAY_TRACK_WIDTH_UNIT; //캔버스 width값에 따른  미터당 몇 픽셀인지.
//     for (let i = 0; i <= Info.FINISH_TRACK_UNIT; i++) {
//       if (i % Info.DISPLAY_TRACK_FLAG_UNIT === 0) {
//       // if (i % Info.DISPLAY_TRACK_FLAG_UNIT === 0 && i === 6) {
//         const o = new ObjImg(); o.index = i;
//         this.flagBoard.push(this.resetImgPositionFlagObj(o));
//       }
//     }
//     // this.mass = 100;
//     const eventObservable  = this.stage.eventObservable(AWStageEvent.EVENT_ROOM_DETAIL);
//     if (!ValidUtil.isNullOrUndefined(eventObservable)) {
//       this.roomRunDetailSubscription = eventObservable.filter( (it) => !ValidUtil.isNullOrUndefined(it.local) && !ValidUtil.isNullOrUndefined(it.other) && it.status === RoomStatusCode.RUN || it.status === RoomStatusCode.END).subscribe((room: Room) => {
//         this.room = room;
//         this.beforePoint = this.currentPoint.get();
//         this.beforeOtherPoint = this.currentOtherPoint.get();
//         console.log('Track EventRoomDetail ' + this.room);
//         if (this.id === 'local') {
//           this.currentPoint.add(this.room.local.success);
//           this.currentOtherPoint.add(this.room.other.success);
//         }else {
//           this.currentPoint.add(this.room.other.success);
//           this.currentOtherPoint.add(this.room.local.success);
//         }
//         console.log('cp: ' + this.currentPoint +  ' cop:' + this.currentOtherPoint);
//       });
//     }
//
//     this.resizeSubscription = this.stage.canvasEventSubscribe('resize', (evnet: Event) => {
//       this.metreToPixel = this.stage.width / Info.DISPLAY_TRACK_WIDTH_UNIT; //캔버스 width값에 따른  미터당 몇 픽셀인지.
//       this.flagBoard.forEach((it) => {
//         this.resetImgPositionFlagObj(it);
//       });
//     });
//   }
//
//   onStop(data?: any) {
//     if (!ValidUtil.isNullOrUndefined(this.roomRunDetailSubscription)) {this.roomRunDetailSubscription.unsubscribe(); }
//     if (!ValidUtil.isNullOrUndefined(this.resizeSubscription)) { this.resizeSubscription.unsubscribe(); }
//   }
//
//   onDestroy(data?: any) {
//   }
//
//   private resetImgPositionFlagObj(objImg: ObjImg) {
//     const centerY = (this.stage.height / 2) + this.centerYMargin;
//     // objImg.index = meter; //index를 meter로 쓴다.
//     if (objImg.index === 0) {
//       objImg.img = this.ic_start_lineImg; objImg.imgAlign = 'left'; objImg.imgBaseline = 'middle';
//       objImg.y = centerY;
//     }else if (objImg.index === Info.FINISH_TRACK_UNIT) {
//       objImg.img = this.ic_finish_lineImg; objImg.imgAlign = 'left'; objImg.imgBaseline = 'middle';
//       objImg.y = centerY;
//     }else {
//       objImg.img = this.ic_boardImg; objImg.imgAlign = 'center'; objImg.imgBaseline = 'middle';
//       objImg.y = centerY + 50;
//     }
//     objImg.x = (this.metreToPixel * objImg.index) + 100;
//     return objImg;
//   }
// }
