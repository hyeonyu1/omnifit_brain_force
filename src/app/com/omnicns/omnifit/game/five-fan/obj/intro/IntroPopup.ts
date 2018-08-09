import {Subscription} from 'rxjs/Subscription';
import {Rect} from '../../../../../../../../../lib-typescript/com/omnicns/graphics/Rect';
import {ValidUtil} from '../../../../../../../../../lib-typescript/com/omnicns/valid/ValidUtil';
import {Level1} from '../../algo/Level1';
import {Level2} from '../../algo/Level2';
import {Level3} from '../../algo/Level3';
import {AWResourceManager} from '../../AWResourceManager';
import {AWStageManager} from '../../AWStageManager';
import {AWStage} from '../../stage/AWStage';
import {AWObj} from '../AWObj';

export class IntroPopup extends AWObj {
  private mousedownSubscription: Subscription;
  private hitArea: Rect;
  private introPopupImg = AWResourceManager.getInstance().resources('ic_intro_popuptext2Img');
  private btn1levelImg = AWResourceManager.getInstance().resources('btn_level_easy_norImg');
  private btn2levelImg = AWResourceManager.getInstance().resources('btn_level_normal_norImg');
  private btn3levelImg = AWResourceManager.getInstance().resources('btn_level_hard_norImg');
  private ic_intro_popuptextImg = AWResourceManager.getInstance().resources('ic_intro_popuptextImg');
  private btn1levelImgHit: Rect;
  private btn2levelImgHit: Rect;
  private btn3levelImgHit: Rect;
  private audio: HTMLAudioElement;

  constructor(stage: AWStage, x: number, y: number, z: number, img: HTMLImageElement) {
    super(stage, x, y, z, img);
  }

  onDraw(context: CanvasRenderingContext2D): void {

    context.beginPath();
    context.rect(0, 0, this.stage.width, this.stage.height);
    context.fillStyle = 'rgba(0,0,0,0.7)';
    context.fill();

    if (!this.img.complete || !this.introPopupImg.complete || !this.btn1levelImg.complete || !this.btn2levelImg.complete || !this.btn3levelImg.complete || !this.ic_intro_popuptextImg.complete) { return; }

    this.x = (this.stage.width / 2) - this.img.width / 2;
    this.y = this.stage.height - (this.img.height) - 50;
    const imgStartX = this.x;
    const imgStartY = this.y;
    const imgEndX = this.x + this.img.width;
    const imgEndY = this.y + this.img.height;
    this.hitArea = new Rect(imgStartX, imgStartY, imgEndX, imgEndY);
    context.drawImage(this.introPopupImg, (this.stage.width / 2) - this.introPopupImg.width / 2, (this.stage.height / 2) - this.introPopupImg.height / 1.2);
    const x1 = (this.stage.width / 2) - (this.btn1levelImg.width / 2) - (this.btn1levelImg.width + 20);
    const x2 = (this.stage.width / 2) - (this.btn2levelImg.width / 2) - (0);
    const x3 = (this.stage.width / 2) - (this.btn3levelImg.width / 2) + (this.btn3levelImg.width + 20);
    const y1 = (this.stage.height / 2) + this.btn1levelImg.height;
    const y2 = (this.stage.height / 2) + this.btn2levelImg.height;
    const y3 = (this.stage.height / 2) + this.btn3levelImg.height;

    context.drawImage(this.btn1levelImg, x1, y1);
    context.drawImage(this.btn2levelImg, x2, y2);
    context.drawImage(this.btn3levelImg, x3, y3);
    context.drawImage(this.ic_intro_popuptextImg, (this.stage.width / 2) - (this.ic_intro_popuptextImg.width / 2), (this.stage.height / 2) - (this.ic_intro_popuptextImg.height / 2) + 100);
    this.btn1levelImgHit = new Rect(x1, y1, x1 + this.btn1levelImg.width, y1 + this.btn1levelImg.height);
    this.btn2levelImgHit = new Rect(x2, y2, x2 + this.btn2levelImg.width, y2 + this.btn2levelImg.height);
    this.btn3levelImgHit = new Rect(x3, y3, x3 + this.btn3levelImg.width, y3 + this.btn3levelImg.height);

    // if ((new Date().getSeconds() % 2) / 0.5) {
    if (Math.floor(new Date().getMilliseconds() / 500)) {
      context.drawImage(this.img, this.x, this.y);
    }
  }

  onStart(data?: any) {
    this.mousedownSubscription = this.stage.canvasEventSubscribe('mousedown', (event: MouseEvent) => {
      // console.log('--' + event.offsetX + ',' + event.offsetY + '   ' + this.hitArea.contains(event.offsetX, event.offsetY) + this.hitArea);
      if (!ValidUtil.isNullOrUndefined(this.btn1levelImgHit) && this.btn1levelImgHit.contains(event.offsetX, event.offsetY)) {
        AWStageManager.getInstance().nextStage(new Level1('1', 'other', 'char_00').onCreate().onStart());
      } else if (!ValidUtil.isNullOrUndefined(this.btn2levelImgHit) && this.btn2levelImgHit.contains(event.offsetX, event.offsetY)) {
        AWStageManager.getInstance().nextStage(new Level2('2', 'other', 'char_01').onCreate().onStart());
      } else if (!ValidUtil.isNullOrUndefined(this.btn3levelImgHit) && this.btn3levelImgHit.contains(event.offsetX, event.offsetY)) {
        AWStageManager.getInstance().nextStage(new Level3('3', 'other', 'char_02').onCreate().onStart());
      }
    });
  }

  onStop() {
    console.log('touchScreen stop');
    if (this.audio) {this.audio.pause(); }
    if (!ValidUtil.isNullOrUndefined(this.mousedownSubscription)) {this.mousedownSubscription.unsubscribe(); }
  }

  onCreate(data?: any) {}
  onDestroy(data?: any) {}
  onPause(data?: any) {}
  onRestart(data?: any) {}
  onResume(data?: any) {}

}
