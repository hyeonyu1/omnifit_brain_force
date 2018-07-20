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

export class Score extends AWObj {

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
    const gageBg = AWResourceManager.getInstance().resources('ic_gageImg');
    const badge = (this.room && this.room.other.successHistory.length >= 10) ? AWResourceManager.getInstance().resources('ic_gage_medal_onImg') : AWResourceManager.getInstance().resources('ic_gage_medal_offImg');

    const gageBgX = (this.stage.width / 2) - (gageBg.width / 2);
    const gageBgY = this.stage.height - gageBg.height - 10;
    const bageX = gageBgX - (badge.width / 4.5);
    const bageY = gageBgY - (badge.height / 5);
    const gageBgCenterX = gageBgX + gageBg.width / 2;
    const gageBgCenterY = gageBgY + gageBg.height / 2;
    context.drawImage(gageBg, gageBgX, gageBgY, gageBg.width, gageBg.height);
    const scoreX = gageBgX + 40;
    const scoreWidth = gageBg.width - 55;
    const scoreY = gageBgY + 16;
    const scoreHeight = gageBg.height - 35;
    //////update
    // //targetPosition
    const stepVal = (scoreWidth) / 10;
    const targetPosition = new PointVector(stepVal * headsetConcentration, scoreY);
    // //방향
    const dir = PointVector.sub(targetPosition, this);
    dir.normalize();
    dir.mult(0.7);
    this.acceleration = dir;
    this.velocity.add(this.acceleration);
    this.velocity.limit(7);
    const oldPosition = this.get();
    this.add(this.velocity);
    const oldCheck = PointVector.sub(oldPosition, targetPosition);
    const check = PointVector.sub(this, targetPosition);
    if (oldCheck.x <= 0 && check.x > 0 || oldCheck.x >= 0 && check.x < 0) {
      this.x = targetPosition.x;
      this.velocity.x = 0;
    }
    if (oldCheck.y <= 0 && check.y > 0 || oldCheck.y >= 0 && check.y < 0) {
      this.y = targetPosition.y;
      this.velocity.y = 0;
    }
    if (this.x > 1) {
      this.roundedRect(context, scoreX, scoreY, this.x, scoreHeight, 9);
      const grds = context.createLinearGradient(scoreX + scoreWidth, scoreY, scoreX + scoreWidth, scoreY + scoreHeight);
      grds.addColorStop(0, '#96F3F3');
      grds.addColorStop(0.5, '#17BCD4');
      grds.addColorStop(1, '#51CFDE');
      context.fillStyle = grds;
      context.fill();
    }

    context.drawImage(badge, bageX, bageY);

  }

  onStart(data?: any) {
    this.beforeHeadsetConcentration = 0;
    this.accelerationStep = new PointVector(0.2, 0.2, 0);
    this.acceleration = new PointVector(0, 0);
    this.velocity = new PointVector(0, 0);
    this.room = undefined;
    //집중도
    this.roomDetailSubscription = this.stage.eventObservable(AWStageEvent.EVENT_ROOM_DETAIL).filter((it) => !ValidUtil.isNullOrUndefined(it.local) && !ValidUtil.isNullOrUndefined(it.other)).subscribe( (room: Room) => {
      console.log('score room ' + room.status + ' ' + room.local.headsetConcentration);
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
