import 'rxjs/add/operator/distinct';
import 'rxjs/add/operator/find';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toArray';
import {Subscription} from 'rxjs/Subscription';
import {PointVector} from '../../../../../../../../../lib-typescript/com/omnicns/math/PointVector';
import {ValidUtil} from '../../../../../../../../../lib-typescript/com/omnicns/valid/ValidUtil';
import {RandomUtil} from '../../../../../../../../../lib-typescript/com/omnicns/random/RandomUtil';
import {AWResourceManager} from '../../AWResourceManager';
import {AWStage} from '../../stage/AWStage';
import {AWStageEvent} from '../../stage/AWStageEvent';
import {AWObj} from '../AWObj';
import {MathUtil} from '../../../../../../../../../lib-typescript/com/omnicns/math/MathUtil';
import {Room} from '../../domain/Room';
import {RoomStatusCode} from '../../code/RoomStatusCode';

export class LaserBar extends AWObj {

  private velocity: PointVector;
  private acceleration: PointVector;
  private accelerationStep: PointVector;
  private resizeSubscription: Subscription;
  private beforeHeadsetConcentration = 0;
  private roomDetailSubscription: Subscription;
  private room: Room;



  constructor(stage: AWStage, x: number, y: number, z: number, img: HTMLImageElement) {
    super(stage, x, y, z, img);
  }

  onDraw(context: CanvasRenderingContext2D): void {
    let headsetConcentration = this.room && (this.room.status === 'run' || this.room.status === 'end') ? this.room.local.headsetConcentration : 0;
    headsetConcentration = Math.min(10, headsetConcentration);
    // console.log('head score ' + headsetConcentration)
    const gageBg = AWResourceManager.getInstance().resources('laserBar');

    const gageBgX = (this.stage.width / 2) - (gageBg.width / 2);
    const gageBgY = (this.stage.height / 2) - (gageBg.height / 2);


    context.drawImage(gageBg, gageBgX, gageBgY, gageBg.width, gageBg.height);


    //
    const scoreX = gageBgX;
    const scoreWidth = gageBg.width;

    let scoreY = gageBgY + (gageBg.height / 2);
    let scoreHeight = gageBg.height / 2;

    const addValue = (scoreHeight / 10);

    //if (this.room && this.room.local && this.room.other && this.room.local.headsetConcentration  > this.room.other.headsetConcentration) {
      scoreY = scoreY - addValue;
      scoreHeight = scoreHeight + addValue;
      context.fillStyle = '#FFFF00';
      //context.fillRect(scoreX, scoreY, scoreWidth, scoreHeight);
    //}
    // } else if (this.room && this.room.local && this.room.other && this.room.local.headsetConcentration  < this.room.other.headsetConcentration) {
    //     scoreY = scoreY + addValue;
    //     scoreHeight = scoreHeight - addValue;
    //     context.fillStyle = '#FFFF00';
    //     context.fillRect(scoreX, scoreY, scoreWidth, scoreHeight);
    // } else {
    //     context.fillStyle = '#FFFF00';
    //     context.fillRect(scoreX, scoreY, scoreWidth, scoreHeight);
    // }



  }

  onStart(data?: any) {
    this.beforeHeadsetConcentration = 0;
    this.accelerationStep = new PointVector(0.2, 0.2, 0);
    this.acceleration = new PointVector(0, 0);
    this.velocity = new PointVector(0, 0);
    this.room = undefined;
    //집중도
    this.roomDetailSubscription = this.stage.eventObservable(AWStageEvent.EVENT_ROOM_DETAIL).filter((it) => !ValidUtil.isNullOrUndefined(it.local) && !ValidUtil.isNullOrUndefined(it.other)).subscribe( (room: Room) => {
      console.log('laserbar score room ' + room.local.headsetConcentration + ' ' + room.other.headsetConcentration);
      if (room.status === RoomStatusCode.RUN) {
        this.room = room;
      }else {
        this.room = undefined;
      }
    });

  }

  onStop(data?: any) {
    if (!ValidUtil.isNullOrUndefined(this.roomDetailSubscription)) {this.roomDetailSubscription.unsubscribe(); }
    if (!ValidUtil.isNullOrUndefined(this.resizeSubscription)) {this.resizeSubscription.unsubscribe(); }
  }

  onCreate(data?: any) {}
  onDestroy(data?: any) {}
  onPause(data?: any) {}
  onRestart(data?: any) {}
  onResume(data?: any) {}
}



