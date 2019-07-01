import {Subscription} from 'rxjs/Subscription';
import {PointVector} from '../../../../../../../../../lib-typescript/com/omnicns/math/PointVector';
import {ValidUtil} from '../../../../../../../../../lib-typescript/com/omnicns/valid/ValidUtil';
import {AWResourceManager} from '../../AWResourceManager';
import {AWStage} from '../../stage/AWStage';
import {AWObj} from '../AWObj';
import {RandomUtil} from '../../../../../../../../../lib-typescript/com/omnicns/random/RandomUtil';
import {MathUtil} from '../../../../../../../../../lib-typescript/com/omnicns/math/MathUtil';
import {Observable} from 'rxjs/Observable';
import {interval} from 'rxjs/observable/interval';

// import { Point } from '../org/Point';
export class Guest extends AWObj {

  private resizeSubscription: Subscription;
  private translatePosition: PointVector;
  private motion1: HTMLImageElement;
  private motion2: HTMLImageElement;
  private motion: HTMLImageElement;

  private gMotionPosition = new PointVector(0, 0);
  private gMotionVelocity: PointVector;
  private startPosition: number;
  private endPosition: number;
  private gap: number;
  private gMotionIdx = 1;
  // private gMotionMap = [
  //   this.gMotionPosition.get(),
  //   new PointVector(this.gMotionPosition.x + (this.gap * 0), this.gMotionPosition.y - (this.gap * 1)),
  //   new PointVector(this.gMotionPosition.x - (this.gap * 1), this.gMotionPosition.y + (this.gap * 0)),
  //   new PointVector(this.gMotionPosition.x + (this.gap * 1), this.gMotionPosition.y + (this.gap * 0)),
  //   new PointVector(this.gMotionPosition.x + (this.gap * 0), this.gMotionPosition.y + (this.gap * 1)),
  // ];
  private gMotionMap: Array<PointVector>;
  private gMotionTargetPosition: PointVector;
  private imgSubscription: Subscription;
  constructor(stage: AWStage, motion1: HTMLImageElement, motion2: HTMLImageElement, startPosition: number, endPosition: number) {
    super(stage);
    this.gap = RandomUtil.random(0, 5);
    this.gMotionMap = [
      this.gMotionPosition.get(),
      new PointVector(this.gMotionPosition.x + (this.gap * 0), this.gMotionPosition.y - (this.gap * 1)),
      new PointVector(this.gMotionPosition.x + (this.gap * 0), this.gMotionPosition.y + (this.gap * 1))
    ];
    this.gMotionTargetPosition = this.gMotionMap[this.gMotionIdx];
    this.motion = this.motion1 = motion1;
    this.motion2 = motion2;
    this.imgAlign = 'center';
    this.imgBaseline = 'middle';
    this.startPosition = startPosition;
    this.endPosition = endPosition;
  }

  onDraw(context: CanvasRenderingContext2D): void {
    if (!this.motion1.complete || !this.motion2.complete) { return; }

    context.translate(this.translatePosition.x, this.translatePosition.y);
    //////update
    //motion
    const motionDir = PointVector.sub(this.gMotionTargetPosition, this.gMotionPosition);
    motionDir.normalize();
    motionDir.mult(0.5);
    this.gMotionVelocity.add(motionDir);
    this.gMotionVelocity.limit(5);
    const hand1OldPosition = this.gMotionPosition.get();
    this.gMotionPosition.add(this.gMotionVelocity);
    const hand1OldCheck = PointVector.sub(hand1OldPosition, this.gMotionTargetPosition);
    const hand1Check = PointVector.sub(this.gMotionPosition, this.gMotionTargetPosition);
    if (hand1OldCheck.x <= 0 && hand1Check.x > 0 || hand1OldCheck.x >= 0 && hand1Check.x < 0) {
      this.gMotionPosition.x = this.gMotionTargetPosition.x;
      this.gMotionVelocity.x = 0;
    }
    if (hand1OldCheck.y <= 0 && hand1Check.y > 0 || hand1OldCheck.y >= 0 && hand1Check.y < 0) {
      this.gMotionPosition.y = this.gMotionTargetPosition.y;
      this.gMotionVelocity.y = 0;
    }

    if (this.gMotionPosition.x === this.gMotionTargetPosition.x && this.gMotionPosition.y === this.gMotionTargetPosition.y) {
      this.gMotionIdx++;
      this.gMotionIdx = (this.gMotionIdx + 1 > this.gMotionMap.length ? 0 : this.gMotionIdx);
      this.gMotionTargetPosition = this.gMotionMap[this.gMotionIdx];
    }
    this.drawImage(context, this.motion, this.gMotionPosition.x, this.gMotionPosition.y);
    context.fillStyle = '#FFFF00';
    context.beginPath();
    context.fill();
    //checkEdges
    if (this.x > this.stage.width) {
      this.initSetting();
    }

  }

  onCreate(data?: any) {
  }

  onDestroy(data?: any) {
  }

  onPause(data?: any) {
  }

  onRestart(data?: any) {
  }

  onResume(data?: any) {
  }

  onStart(data?: any) {
    this.initSetting();
    this.imgSubscription = interval(RandomUtil.random(1500, 2000)).subscribe( (n) => {
      if (this.motion === this.motion1) {
        this.motion = this.motion2;
      }else {
        this.motion = this.motion1;
      }
    });
    this.resizeSubscription = this.stage.canvasEventSubscribe('resize', (event: Event) => this.initSetting());
  }

  onStop(data?: any) {
    if (!ValidUtil.isNullOrUndefined(this.imgSubscription)) {this.imgSubscription.unsubscribe(); }
    if (!ValidUtil.isNullOrUndefined(this.resizeSubscription)) {this.resizeSubscription.unsubscribe(); }
  }

  initSetting() {
    this.gMotionVelocity = new PointVector(0, 0);
    const hh = (this.stage.height / 2);
    this.translatePosition = new PointVector(RandomUtil.random(0, this.stage.width),  RandomUtil.random(hh + this.startPosition, hh + (this.endPosition)));
    this.mass = Math.random();
  }
}
