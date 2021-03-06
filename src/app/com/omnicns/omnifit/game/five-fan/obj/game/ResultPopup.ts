import {Subscription} from 'rxjs/Subscription';
import {Room} from '../../domain/Room';
import {Rect} from '../../../../../../../../../lib-typescript/com/omnicns/graphics/Rect';
import {PointVector} from '../../../../../../../../../lib-typescript/com/omnicns/math/PointVector';
import {ValidUtil} from '../../../../../../../../../lib-typescript/com/omnicns/valid/ValidUtil';
import {DeviceManager} from '../../../../drive/DeviceManager';
import {AWResourceManager} from '../../AWResourceManager';
import {AWStageManager} from '../../AWStageManager';
import {AWStage} from '../../stage/AWStage';
import {AWObj} from '../AWObj';
import {Info} from '../../info/Info';

export interface UserResult {
  uuid: string;
  name: string;
  host: string;
  rank: number;
  score: number;
}

export class ResultPopup extends AWObj {
  // private position: PointVector;
  private velocity: PointVector;
  private acceleration: PointVector;
  private accelerationStep: PointVector;
  private ic_result_popup_bgImg = AWResourceManager.getInstance().resources('ic_result_popup_bgImg');
  private ranking_icon_01Img = AWResourceManager.getInstance().resources('ranking_icon_01Img');
  private ranking_icon_02Img = AWResourceManager.getInstance().resources('ranking_icon_02Img');
  private ranking_icon_03Img = AWResourceManager.getInstance().resources('ranking_icon_03Img');
  private ranking_shape_01Img = AWResourceManager.getInstance().resources('ranking_shape_01Img');
  private ranking_shape_02Img = AWResourceManager.getInstance().resources('ranking_shape_02Img');
  private ranking_shape_02_arrowImg = AWResourceManager.getInstance().resources('ranking_shape_02_arrowImg');
  private ic_result_popup_score_bgImg = AWResourceManager.getInstance().resources('ic_result_popup_score_bgImg');
  private btn_result_popup_again_norImg = AWResourceManager.getInstance().resources('btn_result_popup_again_norImg');
  private btn_result_popup_exit_norImg = AWResourceManager.getInstance().resources('btn_result_popup_exit_norImg');
  private ic_result_popup_firecrackerImg = AWResourceManager.getInstance().resources('ic_result_popup_firecrackerImg');
  private ic_result_popup_characterImg = AWResourceManager.getInstance().resources('ic_result_popup_characterImg');
  private ic_result_popup_medal_1stImg = AWResourceManager.getInstance().resources('ic_result_popup_medal_1stImg');
  private ic_result_popup_medal_2ndImg = AWResourceManager.getInstance().resources('ic_result_popup_medal_2ndImg');

  private ic_scoretext_excellentImg = AWResourceManager.getInstance().resources('ic_scoretext_excellentImg');
  private ic_scoretext_verygoodImg = AWResourceManager.getInstance().resources('ic_scoretext_verygoodImg');
  private ic_scoretext_goodImg = AWResourceManager.getInstance().resources('ic_scoretext_goodImg');
  private ic_scoretext_notgoodImg = AWResourceManager.getInstance().resources('ic_scoretext_notgoodImg');
  private ic_scoretext_badImg = AWResourceManager.getInstance().resources('ic_scoretext_badImg');
  private ic_scoretext_badge_02_1Img = AWResourceManager.getInstance().resources('ic_scoretext_badge_02_1Img');
  private ic_scoretext_badge_02_2Img = AWResourceManager.getInstance().resources('ic_scoretext_badge_02_2Img');

  private targetPosition: PointVector;
  private hitArea: Rect;
  private hitExitArea: Rect;
  private hitReStartArea: Rect;
  private mousedownSubscription: Subscription;
  private room: Room;

  private hi = 0;
  private hello = 0;
  constructor(stage: AWStage, x: number, y: number, z: number, img?: HTMLImageElement) {
    super(stage, x, y, z, img);
  }

  onDraw(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.rect(0, 0, this.stage.width, this.stage.height);
    context.fillStyle = 'rgba(0,0,0,0.7)';
    context.fill();
    //////update
    this.targetPosition = new PointVector(this.stage.width / 2 , this.stage.height / 2);
    //방향
    const dir = PointVector.sub(this.targetPosition, this);
    const mag = dir.mag();
    dir.normalize();
    dir.mult(this.accelerationStep);
    // dir.mult(0.2);
    this.acceleration = dir; //가속도
    const oldVelocity = this.velocity.get();
    this.velocity.add(this.acceleration); //속도
    const oldPosition = this.get();
    this.add(this.velocity);
    const oldCheck = PointVector.sub(oldPosition, this.targetPosition);
    const check = PointVector.sub(this, this.targetPosition);
    if (oldCheck.x <= 0 && check.x > 0 || oldCheck.x >= 0 && check.x < 0) {
      this.x = this.targetPosition.x;
      this.velocity.x = 0;
    }
    if (oldCheck.y <= 0 && check.y > 0 || oldCheck.y >= 0 && check.y < 0) {
      this.y = this.targetPosition.y;
      this.velocity.y = 0;
    }

    //data setting
    const localSum = this.room.local.headsetConcentrationHistory.reduce((a, b) => a + b, 0);
    //const localSum = this.room.local.successScore;
    //const localSum = Math.sum(this.room.local.headsetConcentrationHistory);
    const otherSum = this.room.other.headsetConcentrationHistory.reduce((a, b) => a + b, 0);




    //draw popup background
    const popup_x = this.x - (this.ic_result_popup_bgImg.width / 2);
    const popup_y = this.y - (this.ic_result_popup_bgImg.height / 2) - 50;
    context.drawImage(this.ic_result_popup_bgImg, popup_x, popup_y);
    this.hitArea = new Rect(popup_x, popup_y, popup_x + this.ic_result_popup_bgImg.width, popup_y + this.ic_result_popup_bgImg.height);
    this.hitExitArea = new Rect(popup_x, popup_y + this.ic_result_popup_bgImg.height, popup_x + this.ic_result_popup_bgImg.width - 185, popup_y + this.ic_result_popup_bgImg.height + 60);
    this.hitReStartArea = new Rect(popup_x + 185, popup_y + this.ic_result_popup_bgImg.height, popup_x + this.ic_result_popup_bgImg.width, popup_y + this.ic_result_popup_bgImg.height + 60);

    context.drawImage(this.ic_result_popup_score_bgImg, popup_x + 45, popup_y + 308);
    context.drawImage(this.btn_result_popup_exit_norImg, popup_x + 7, popup_y + 542);
    context.drawImage(this.btn_result_popup_again_norImg, popup_x + 180, popup_y + 542);
    context.drawImage(this.ic_result_popup_firecrackerImg, popup_x + 55, popup_y + 100);
    context.drawImage(this.ic_result_popup_characterImg, popup_x + 95, popup_y + 150);
    let medalImg = this.ic_result_popup_medal_1stImg;
    if (localSum < otherSum) {
      medalImg = this.ic_result_popup_medal_2ndImg;
    }
    context.drawImage(medalImg, popup_x + 158, popup_y + 224);

    // VeryGood = 850
    // Good = 700
    // NotGood = 550
    // Bad = 400
    // 점수에 따라 멘트와 등급 표시
    if (localSum >= 0 && localSum <= Info.BAD) {
      context.drawImage(this.ic_scoretext_badImg, popup_x + 40, popup_y + 265);
      context.drawImage(this.ic_scoretext_badge_02_2Img, popup_x + 25, popup_y + 486);
    } else if (localSum > Info.BAD && localSum <= Info.NOT_GOOD) {
      context.drawImage(this.ic_scoretext_notgoodImg, popup_x + 40, popup_y + 265);
      context.drawImage(this.ic_scoretext_badge_02_2Img, popup_x + 25, popup_y + 462);
    } else if (localSum > Info.NOT_GOOD && localSum <= Info.GOOD) {
      context.drawImage(this.ic_scoretext_goodImg, popup_x + 40, popup_y + 265);
      context.drawImage(this.ic_scoretext_badge_02_1Img, popup_x + 25, popup_y + 439);
    } else if (localSum > Info.GOOD && localSum <= Info.VERY_GOOD) {
      context.drawImage(this.ic_scoretext_verygoodImg, popup_x + 40, popup_y + 265);
      context.drawImage(this.ic_scoretext_badge_02_1Img, popup_x + 25, popup_y + 416);
    } else if (localSum > Info.VERY_GOOD) {
      context.drawImage(this.ic_scoretext_excellentImg, popup_x + 40, popup_y + 265);
      context.drawImage(this.ic_scoretext_badge_02_1Img, popup_x + 25, popup_y + 393);
    }

    context.save();
    const fontPT = 'normal 35';
    context.strokeStyle = '#261813';
    // context.shadowColor = '#000000';
    // context.shadowOffsetX = -1;
    // context.shadowOffsetY = -1;
    context.font = fontPT + 'px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    // const gradient = context.createLinearGradient(0, 0, 0, this.stage.height);
    // gradient.addColorStop(0, '#1e4877');
    // gradient.addColorStop(1, '#4584b4');
    context.fillStyle = '#ffb746';
    // context.fillStyle = gradient;
    context.lineWidth = 1;
    context.fillText(localSum.toLocaleString() + ' points', popup_x + 178, popup_y + 350);
    // context.strokeText(localSum.toLocaleString() + ' m', popup_x + 220, popup_y + 372);
    context.restore();
  }

  onStart(room: Room) {
    AWResourceManager.getInstance().resources('applause_upSound').play();
    this.set(this.startPosition());
    this.accelerationStep = new PointVector(0.2, 0.2, 0);
    this.acceleration = new PointVector(0, 0);
    this.velocity = new PointVector(0, 0);
    this.targetPosition = undefined;
    this.hitArea = new Rect(0, 0, 0, 0);
    this.mousedownSubscription = this.stage.canvasEventSubscribe('mousedown', (event: MouseEvent) => {
      if (!ValidUtil.isNullOrUndefined(this.hitExitArea) && this.hitExitArea.contains(event.offsetX, event.offsetY) ) {
        DeviceManager.getInstance().onDestroy();
        this.stage.onDestroy();
      }
      if (!ValidUtil.isNullOrUndefined(this.hitReStartArea) && this.hitReStartArea.contains(event.offsetX, event.offsetY) ) {
        AWStageManager.getInstance().goStage(1, '11');
      }
    });
    this.room = room;
  }

  startPosition(): PointVector {
    return new PointVector(this.stage.width, this.stage.height / 2);
  }
  onStop() {
    if (!ValidUtil.isNullOrUndefined(this.mousedownSubscription)) {this.mousedownSubscription.unsubscribe(); }
  }
  onCreate(data?: any) {}
  onDestroy(data?: any) {}
  onPause(data?: any) {}
  onRestart(data?: any) {}
  onResume(data?: any) {}
}
