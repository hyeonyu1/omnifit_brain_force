import 'rxjs/add/observable/bindCallback';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/range';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {interval} from 'rxjs/observable/interval';
import {Subscription} from 'rxjs/Subscription';
import {PointVector} from '../../../../../../../../lib-typescript/com/omnicns/math/PointVector';
import {ValidUtil} from '../../../../../../../../lib-typescript/com/omnicns/valid/ValidUtil';
import {RandomUtil} from '../../../../../../../../lib-typescript/com/omnicns/random/RandomUtil';
import {Local} from '../algo/Local';
import {AWStageManager} from '../AWStageManager';
import {ResultPopup} from '../obj/game/ResultPopup';
import {AWStage} from './AWStage';
import {AWStageEvent} from './AWStageEvent';
import {Algo} from '../domain/Algo';
import {Room} from '../domain/Room';
import {RoomStatusCode} from '../code/RoomStatusCode';
import {Info} from '../info/Info';
import {CollectionUtil} from '../../../../../../../../lib-typescript/com/omnicns/collection/CollectionUtil';
import {DeviceManager} from '../../../drive/DeviceManager';
import {AWResourceManager} from '../AWResourceManager';
import {timer} from 'rxjs/observable/timer';

//공기 및 유체 저항
//https://ko.khanacademy.org/computing/computer-programming/programming-natural-simulations/programming-forces/a/air-and-fluid-resistance
export class AWStageGame extends AWStage {

  private localAlgo: Algo;
  private otherAlgo: Algo;
  private resizeSubscription: Subscription;
  private eventSubscribes: Map<string, Observable<any>>;
  private clockSubscription: Subscription;
  private roomDetailSubject: BehaviorSubject<Room>;
  private roomDetailSubScription: Subscription;
  private localRoomIntervalSubScription: Subscription;
  private room = new Room();
  private audio: HTMLAudioElement;
  private resultPopup: ResultPopup;

  onDraw(): void {
    const context: CanvasRenderingContext2D = this.bufferCanvas.getContext('2d');
    AWStageManager.getInstance().getAllObjs(this).forEach( (it) => {
      this.resetContext(context);
      it.onDraw(context);
    });
    this.flushBufferToCanvas();
  }

  onCreate(data?: any): void {
    this.objs.forEach((it) => it.onCreate(data));
    this.localAlgo = new Local('local', 'local');
    this.localAlgo.onCreate();
  }
  onStart(data: Algo): void {
    console.log('game start ' + data.constructor.name + ' ' + data.uuid);
    DeviceManager.getInstance().on('gameStart');
    this.audio = AWResourceManager.getInstance().resources('main_bgmSound');
    this.audio.autoplay = true;
    this.audio.loop = true;
    this.audio.play();

    this.room = new Room();
    this.otherAlgo = data;
    this.room.local = this.localAlgo;
    this.room.other = this.otherAlgo;
    this.room.local.clearConcentration();
    // this.room.local.clearSuccessHistory();
    this.room.other.clearConcentration();
    // this.room.other.clearSuccessHistory();
    // this.objs.filter( (it) => it instanceof Arm).forEach( (it) => it.id = this.otherAlgo.name);
    // this.audio = ResourceManager.getInstance().resources('CSC018Sound');
    // this.audio.play();
    this.eventSubscribes = new Map<string, Observable<any>>();
    // this.concentrationSubject = new BehaviorSubject(new AlgoDataSet(this.localAlgo, this.otherAlgo));
    // this.eventSubscribes.set(AWStageEvent.EVENT_CONCENTRATION, this.concentrationSubject);
    this.roomDetailSubject = new BehaviorSubject(new Room());
    this.eventSubscribes.set(AWStageEvent.EVENT_ROOM_DETAIL, this.roomDetailSubject);
    this.resultPopup = undefined;
    this.room = new Room();
    this.objs.forEach((it) => it.onStart());
    this.clockSubscription = this.clockIntervalSubscribe((date: number) => this.onDraw());
    this.resizeSubscription = this.canvasEventSubscribe('resize', (event: Event) => this.onDraw());

    this.localRoomIntervalSubScription = interval(Info.STEP_UNIT).subscribe( (it) => {
    // this.localRoomIntervalSubScription = interval(10).subscribe( (it) => {
      // console.log(this.room.users.length + ' ' + this.room.startCnt + ' ' + this.room.endCnt);
      this.room.local = this.localAlgo;
      this.room.other = this.otherAlgo;
      if (this.room.startCnt >= 0) {
        this.room.startCnt = (--this.room.startCnt);
        this.room.status = RoomStatusCode.WAIT;
        if (this.room.startCnt === 2) {
          DeviceManager.getInstance().on('onGameStart', this.otherAlgo.uuid);
        }
      }else if (this.room.status === RoomStatusCode.WAIT && this.room.startCnt <= 0) { // 처음 카운트 다운끝나고 RUN
        this.room.local.clearConcentration();
        this.room.other.clearConcentration();
        this.room.local.clearSuccessHistory();
        this.room.other.clearSuccessHistory();
        this.room.status = RoomStatusCode.RUN;
      // }else if (this.room.status === RoomStatusCode.RUN && this.room.local.successHistory.reduce((a, b) => a + b, 0) > Info.FINISH_TRACK_UNIT || this.room.other.successHistory.reduce((a, b) => a + b, 0) > Info.FINISH_TRACK_UNIT) {
      //   this.room.status = RoomStatusCode.END;
      //   this.room.local.onStop();
      //   this.room.other.onStop();
      //   this.localRoomIntervalSubScription.unsubscribe();
      }
      this.roomDetailSubject.next(this.room);
    });

    this.roomDetailSubScription = this.roomDetailSubject.filter( (it) => !ValidUtil.isNullOrUndefined(it.local) && !ValidUtil.isNullOrUndefined(it.other)).subscribe( (room: Room) => {
      this.room = room;
      if ((RoomStatusCode.END === room.status) && ValidUtil.isNullOrUndefined(this.resultPopup)) {
        timer(1000).subscribe((it) => {
          this.resultPopup = this.pushResultPopupOnCreateStart(this.room);
          DeviceManager.getInstance().on('onGameEnd', this.room.local.successScore.toLocaleString());
        });
      }
    });
    // if (!ValidUtil.isNullOrUndefined(this.arm)) {
    //   this.removeObjOnStopDestory(this.arm);
    // }
    // this.arm = new Arm(this, this.otherAlgo.name);
    // this.pushObjCreateStart(this.arm);
  }

  onStop(data?: any): void {
    console.log('game stop');
    // this.audio.pause();
    if (this.audio) {this.audio.pause(); this.audio.currentTime = 0; }
    this.localAlgo.onStop();
    this.otherAlgo.onStop();
    this.localAlgo.clearConcentration();
    this.otherAlgo.clearConcentration();
    this.objs.forEach((it) => it.onStop(data));
    if (this.resultPopup) {
      CollectionUtil.removeArrayItem(this.objs, this.resultPopup);
    }

    if (!ValidUtil.isNullOrUndefined(this.resizeSubscription)) {this.resizeSubscription.unsubscribe(); }
    if (!ValidUtil.isNullOrUndefined(this.clockSubscription)) {this.clockSubscription.unsubscribe(); }
    if (!ValidUtil.isNullOrUndefined(this.localRoomIntervalSubScription)) {this.localRoomIntervalSubScription.unsubscribe(); }
    if (!ValidUtil.isNullOrUndefined(this.roomDetailSubScription)) {this.roomDetailSubScription.unsubscribe(); }
  }

  private createRandomWind(): PointVector {
    return new PointVector(Math.floor(RandomUtil.random((this.width / 3) * -1, this.width / 3)));
  }

  eventObservable(eventName: string): Observable<any> {
    // return this.eventSubscribes.get(eventName).subscribe(next, error, complete);
    return this.eventSubscribes.get(eventName);
  }
  pushResultPopupOnCreateStart(room: Room): ResultPopup {
    const resultPopup = new ResultPopup(this, 0, 0, 0);
    resultPopup.index = 1101;
    resultPopup.onCreate(room);
    resultPopup.onStart(room);
    this.pushObj(resultPopup);
    return resultPopup;
  }

  onDestroy(data?: any) {
    this.localAlgo.onDestroy();
    this.otherAlgo.onDestroy();
    this.objs.forEach((it) => it.onDestroy(data));
    if (!ValidUtil.isNullOrUndefined(this.audio)) {
      this.audio.pause();
    }
  }

  onPause(data?: any) {
    this.objs.forEach((it) => it.onPause(data));
  }

  onRestart(data?: any) {
    this.objs.forEach((it) => it.onRestart(data));
  }

  onResume(data?: any) {
    this.objs.forEach((it) => it.onResume(data));
  }
}
