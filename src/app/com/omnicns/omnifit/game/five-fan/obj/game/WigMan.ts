import {Subscription} from 'rxjs/Subscription';
import {Room} from '../../domain/Room';
import {ValidUtil} from '../../../../../../../../../lib-typescript/com/omnicns/valid/ValidUtil';
import {PointVector} from '../../../../../../../../../lib-typescript/com/omnicns/math/PointVector';
import {AWResourceManager} from '../../AWResourceManager';
import {AWStage} from '../../stage/AWStage';
import {AWStageEvent} from '../../stage/AWStageEvent';
import {AWObj} from '../AWObj';
import {RandomUtil} from '../../../../../../../../../lib-typescript/com/omnicns/random/RandomUtil';

export class WigMan extends AWObj {
  private velocity: PointVector;
  private roomDetailSubscription: Subscription;
  private room: Room;
  private ic_maincharacter_2Img = AWResourceManager.getInstance().resources('ic_maincharacter_2Img');
  private ic_maincharacter_3_1Img = AWResourceManager.getInstance().resources('ic_maincharacter_3_1Img');
  private ic_maincharacter_3_2Img = AWResourceManager.getInstance().resources('ic_maincharacter_3_2Img');
  private ic_maincharacter_4Img = AWResourceManager.getInstance().resources('ic_maincharacter_4Img');
  private ic_maincharacter_5Img = AWResourceManager.getInstance().resources('ic_maincharacter_5Img');

  constructor(stage: AWStage, img: HTMLImageElement, order = 0) {
    super(stage, 0, 0, 0, img);
    this.imgAlign = 'center';
    this.imgBaseline = 'bottom';
  }


  onDraw(context: CanvasRenderingContext2D): void {
    const stepSize = ((this.stage.height / 2) / 10);
    const targetPosition = new PointVector(this.stage.width / 2, this.stage.height - 50);

      // if (this.room && this.room.other.successHistory.length > 6 && this.room.other.successHistory.length <= 8) {
      //   targetPosition.x = (this.stage.width / 2) + Math.trunc(RandomUtil.random(-1.99, 1.99));
      // } else if (this.room && this.room.other.successHistory.length > 8 && this.room.other.successHistory.length <= 9) {
      //   targetPosition.x = (this.stage.width / 2) + Math.trunc(RandomUtil.random(-5.99, 5.99));
      // } else if (this.room && this.room.other.successHistory.length > 9) {
      //   targetPosition.x = (this.stage.width / 2) + Math.trunc(RandomUtil.random(-10.99, 10.99));
      // } else {
      //   targetPosition.x = this.stage.width / 2;
      // }

    //targetPosition
    //////update
    const dir = PointVector.sub(targetPosition, this);
    dir.normalize();
    dir.mult(1.5);
    this.velocity.add(dir);
    this.velocity.limit(5);
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

    // if (this.room && this.room.other.successHistory.length >= 0 && this.room.other.successHistory.length <= 2) {
    //   this.drawImage(context, this.img, this.x, this.y);
    // }else if (this.room && this.room.other.successHistory.length > 2 && this.room.other.successHistory.length <= 4) {
    //   this.drawImage(context, this.ic_maincharacter_2Img, this.x, this.y);
    // }else if (this.room && this.room.other.successHistory.length > 4 && this.room.other.successHistory.length <= 6) {
    //   this.drawImage(context, this.ic_maincharacter_3_1Img, this.x, this.y);
    // }else if (this.room && this.room.other.successHistory.length > 6 && this.room.other.successHistory.length <= 8) {
    //   this.drawImage(context, this.ic_maincharacter_3_2Img, this.x, this.y);
    // }else if (this.room && this.room.other.successHistory.length > 8 && this.room.other.successHistory.length <= 9) {
    //   this.drawImage(context, this.ic_maincharacter_4Img, this.x, this.y);
    // }else if (this.room && this.room.other.successHistory.length > 9) {
    //   this.drawImage(context, this.ic_maincharacter_5Img, this.x, this.y);
    // }else {
    //   this.drawImage(context, this.img, this.x, this.y);
    // }
  }

  onStart(data?: any) {
    this.velocity = new PointVector(0, 0);
    this.room = undefined;
    this.set(this.stage.width / 2, (this.stage.height) + 100);
    this.roomDetailSubscription = this.stage.eventObservable(AWStageEvent.EVENT_ROOM_DETAIL).filter( (it) => !ValidUtil.isNullOrUndefined(it.local) && !ValidUtil.isNullOrUndefined(it.other) && it.status === 'run').subscribe( (room: Room) => {
      this.room = room;
    });
    // console.log('this.stage.height => ' + this.stage.height);
    // console.log('this.stage.height / 4 => ' + this.stage.height / 4);
    // console.log('this.room.other.successHistory.length => ' + this.room.other.successHistory.length);
  }

  onStop() {
    // if (!ValidUtil.isNullOrUndefined(this.roomDetailSubscription)) {this.roomDetailSubscription.unsubscribe(); }
  }
  onCreate(data?: any) {}
  onDestroy(data?: any) {}
  onPause(data?: any) {}
  onRestart(data?: any) {}
  onResume(data?: any) {}
}
