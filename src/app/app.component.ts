// import * as Processing from 'assets/javascript/processing-1.4.1';
import {AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
// import {hello} from 'assets/javascript/omnifit';
// Observable operators
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import {DeviceManager} from './com/omnicns/omnifit/drive/DeviceManager';
import {AWResourceManager} from './com/omnicns/omnifit/game/five-fan/AWResourceManager';
import {AWStageManager} from './com/omnicns/omnifit/game/five-fan/AWStageManager';
import {BackGround} from './com/omnicns/omnifit/game/five-fan/obj/background/BackGround';
import {MainBackGround} from './com/omnicns/omnifit/game/five-fan/obj/game/MainBackGround';
import {Leaf} from './com/omnicns/omnifit/game/five-fan/obj/intro/Leaf';
import {IntroPopup} from './com/omnicns/omnifit/game/five-fan/obj/intro/IntroPopup';
import {Star} from './com/omnicns/omnifit/game/five-fan/obj/intro/Star';
import {Title} from './com/omnicns/omnifit/game/five-fan/obj/intro/Title';
import {Score} from './com/omnicns/omnifit/game/five-fan/obj/score/Score';
import {Timer} from './com/omnicns/omnifit/game/five-fan/obj/timer/Timer';
import {AWStageGame} from './com/omnicns/omnifit/game/five-fan/stage/AWStageGame';
import {AWStageIntro} from './com/omnicns/omnifit/game/five-fan/stage/AWStageIntro';
import {Fan} from './com/omnicns/omnifit/game/five-fan/obj/game/Fan';
import {WigMan} from './com/omnicns/omnifit/game/five-fan/obj/game/WigMan';
import {Track} from './com/omnicns/omnifit/game/five-fan/obj/game/Track';
import {Rail} from './com/omnicns/omnifit/game/five-fan/obj/game/Rail';
import {Bench} from './com/omnicns/omnifit/game/five-fan/obj/game/Bench';
import {Flags} from './com/omnicns/omnifit/game/five-fan/obj/game/Flags';
import {Cloud} from './com/omnicns/omnifit/game/five-fan/obj/game/Cloud';
import {Headlights} from './com/omnicns/omnifit/game/five-fan/obj/game/Headlights';
import {Guest} from './com/omnicns/omnifit/game/five-fan/obj/game/Guest';
import {AWStageLogo} from './com/omnicns/omnifit/game/five-fan/stage/AWStageLogo';
import {Logo} from './com/omnicns/omnifit/game/five-fan/obj/logo/Logo';

// https://medium.com/@tarik.nzl/creating-a-canvas-component-with-free-hand-drawing-with-rxjs-and-angular-61279f577415
// typescript observable subscribe example
// https://xgrommx.github.io/rx-book/content/getting_started_with_rxjs/creating_and_querying_observable_sequences/creating_and_subscribing_to_simple_observable_sequences.html
// https://wonism.github.io/rxjs-5/
// https://angular-2-training-book.rangle.io/handout/observables/using_observables.html
// https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/creating.md
// https://github.com/Reactive-Extensions/RxJS/tree/master/doc/api/core/operators
// http://reactivex.io/
declare var Processing: any;   // not required
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  private title = 'app';

  private canvas: HTMLCanvasElement;
  private stageManager: AWStageManager;
  private context: CanvasRenderingContext2D | null;
  @ViewChild('canvas') public canvasElementRef: ElementRef;
  private resourceManager: AWResourceManager;
  private deviceManager: DeviceManager;
  constructor(private hostElement: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.canvas = this.canvasElementRef.nativeElement;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context = this.canvas.getContext('2d');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    //trigger
    this.canvas.dispatchEvent(new Event('resize'));
  }

  ngAfterViewInit(): void {
    //game initialize
    this.stageManager = AWStageManager.getInstance(this.canvas);
    this.deviceManager = DeviceManager.getInstance();
    this.resourceManager = AWResourceManager.getInstance();

    /////////////////stage Logo
    const stageLogo = new AWStageLogo(this.canvas);
    const logo = new Logo(stageLogo, 0, 0, 0);
    logo.index = 0;
    stageLogo.pushObj(logo);

    /////////////////stage Intro
    const stageIntro = new AWStageIntro(this.canvas);
    const background = new BackGround(stageIntro, 0, 0, 0);
    background.index = 0;
    stageIntro.pushObj(background);

    const imainBackGround = new MainBackGround(stageIntro, 0, 0, 0);
    imainBackGround.index = 2;
    stageIntro.pushObj(imainBackGround);

    const iheadlights = new Headlights(stageIntro, 0, 0, 0, AWResourceManager.getInstance().resources('ic_lighttowerImg'));
    iheadlights.index = 28;
    stageIntro.pushObj(iheadlights);

    const iflags = new Flags(stageIntro, 0, 0, 0);
    iflags.index = 29;
    stageIntro.pushObj(iflags);

    const ibench = new Bench(stageIntro, 0, 0, 0, AWResourceManager.getInstance().resources('ic_audienceseatImg'));
    ibench.index = 30;
    stageIntro.pushObj(ibench);

    ///geust
    let igeustIndex = 31;
    let igeust: Guest;
    // geust = new Guest(droneStageGame, AWResourceManager.getInstance().resources('ic_crowdcharacter_1_1Img'), AWResourceManager.getInstance().resources('ic_crowdcharacter_1_2Img'), -250, -70);
    igeust = new Guest(stageIntro, AWResourceManager.getInstance().resources('ic_crowdcharacter_1_1Img'), AWResourceManager.getInstance().resources('ic_crowdcharacter_1_2Img'), -250, -240);
    igeust.index = igeustIndex++;
    stageIntro.pushObj(igeust);
    igeust = new Guest(stageIntro, AWResourceManager.getInstance().resources('ic_crowdcharacter_2_1Img'), AWResourceManager.getInstance().resources('ic_crowdcharacter_2_2Img'), -230, -220);
    igeust.index = igeustIndex++;
    stageIntro.pushObj(igeust);
    igeust = new Guest(stageIntro, AWResourceManager.getInstance().resources('ic_crowdcharacter_3_1Img'), AWResourceManager.getInstance().resources('ic_crowdcharacter_3_2Img'), -210, -200);
    igeust.index = igeustIndex++;
    stageIntro.pushObj(igeust);
    igeust = new Guest(stageIntro, AWResourceManager.getInstance().resources('ic_crowdcharacter_4_1Img'), AWResourceManager.getInstance().resources('ic_crowdcharacter_4_2Img'), -190, -180);
    igeust.index = igeustIndex++;
    stageIntro.pushObj(igeust);
    igeust = new Guest(stageIntro, AWResourceManager.getInstance().resources('ic_crowdcharacter_5_1Img'), AWResourceManager.getInstance().resources('ic_crowdcharacter_5_2Img'), -170, -160);
    igeust.index = igeustIndex++;
    stageIntro.pushObj(igeust);
    igeust = new Guest(stageIntro, AWResourceManager.getInstance().resources('ic_crowdcharacter_6_1Img'), AWResourceManager.getInstance().resources('ic_crowdcharacter_6_2Img'), -150, -140);
    igeust.index = igeustIndex++;
    stageIntro.pushObj(igeust);
    igeust = new Guest(stageIntro, AWResourceManager.getInstance().resources('ic_crowdcharacter_7_1Img'), AWResourceManager.getInstance().resources('ic_crowdcharacter_7_2Img'), -130, -120);
    igeust.index = igeustIndex++;
    stageIntro.pushObj(igeust);
    igeust = new Guest(stageIntro, AWResourceManager.getInstance().resources('ic_crowdcharacter_8_1Img'), AWResourceManager.getInstance().resources('ic_crowdcharacter_8_2Img'), -110, -100);
    igeust.index = igeustIndex++;
    stageIntro.pushObj(igeust);
    igeust = new Guest(stageIntro, AWResourceManager.getInstance().resources('ic_crowdcharacter_9_1Img'), AWResourceManager.getInstance().resources('ic_crowdcharacter_9_2Img'), -90, -70);
    igeust.index = igeustIndex++;
    stageIntro.pushObj(igeust);

    const irail = new Rail(stageIntro, 0, 0, 0, AWResourceManager.getInstance().resources('ic_displayboardImg'));
    irail.index = 50;
    stageIntro.pushObj(irail);
    const itrack = new Track(stageIntro,
      AWResourceManager.getInstance().resources('ic_track_character1_01Img'),
      AWResourceManager.getInstance().resources('ic_track_character1_02Img'),
      AWResourceManager.getInstance().resources('ic_track_character1_03Img'),
      AWResourceManager.getInstance().resources('ic_track_character1_04Img'),
      AWResourceManager.getInstance().resources('ic_track_character1_05Img'),
      AWResourceManager.getInstance().resources('ic_track_character1_06Img'),
      100);
    itrack.id = 'local';
    itrack.index = 100;
    stageIntro.pushObj(itrack);
    const itrack2 = new Track(stageIntro,
      AWResourceManager.getInstance().resources('ic_track_character2_01Img'),
      AWResourceManager.getInstance().resources('ic_track_character2_02Img'),
      AWResourceManager.getInstance().resources('ic_track_character2_03Img'),
      AWResourceManager.getInstance().resources('ic_track_character2_04Img'),
      AWResourceManager.getInstance().resources('ic_track_character2_05Img'),
      AWResourceManager.getInstance().resources('ic_track_character2_06Img'),
      250);
    itrack2.id = 'other';
    itrack2.index = 101;
    stageIntro.pushObj(itrack2);

    // let ifanOrder = 1;
    // for (let i = 500; i <= 509; i++) {
    //   const fan = new Fan(stageIntro, AWResourceManager.getInstance().resources('ic_fan_offImg'), ifanOrder++);
    //   fan.index = i;
    //   console.log(fan.order);
    //   stageIntro.pushObj(fan);
    // }

    const instroPopup = new IntroPopup(stageIntro, 0, 0, 0, AWResourceManager.getInstance().resources('intro_text_02Img'));
    instroPopup.index = 600;
    stageIntro.pushObj(instroPopup);
    // const introTitle = new Title(droneStageIntro, 0, 0, 0, AWResourceManager.getInstance().resources('titleImg'));
    // introTitle.index = 50;
    // droneStageIntro.pushObj(introTitle);
    // const touchScreen = new IntroPopup(droneStageIntro, 0, 0, 0, AWResourceManager.getInstance().resources('intro_text_02Img'));
    // touchScreen.index = 150;
    // droneStageIntro.pushObj(touchScreen);
    // //cloud
    // for (let i = 51; i < 100 ; i++) {
    //   const cloud = new Leaf(droneStageIntro, 0, 0, 0, AWResourceManager.getInstance().resources('ef_smokeImg'));
    //   cloud.index = i;
    //   droneStageIntro.pushObj(cloud);
    // }
    // //star
    // for (let i = 100; i < 120 ; i++) {
    //   const star = new Star(droneStageIntro, 0, 0, 0);
    //   star.index = i;
    //   droneStageIntro.pushObj(star);
    // }

    ///////////////Stage Game
    const stageGame = new AWStageGame(this.canvas);
    //background
    stageGame.pushObj(background);

    const mainBackGround = new MainBackGround(stageIntro, 0, 0, 0);
    mainBackGround.index = 2;
    stageGame.pushObj(mainBackGround);

    for (let i = 15; i < 25 ; i++) {
      const cloud = new Cloud(stageGame, 0, 0, 0, AWResourceManager.getInstance().resources('game_bg_cloud_05Img'));
      cloud.index = i;
      stageGame.pushObj(cloud);
    }

    const headlights = new Headlights(stageGame, 0, 0, 0, AWResourceManager.getInstance().resources('ic_lighttowerImg'));
    headlights.index = 28;
    stageGame.pushObj(headlights);

    const flags = new Flags(stageGame, 0, 0, 0);
    flags.index = 29;
    stageGame.pushObj(flags);

    const bench = new Bench(stageGame, 0, 0, 0, AWResourceManager.getInstance().resources('ic_audienceseatImg'));
    bench.index = 30;
    stageGame.pushObj(bench);

    ///geust
    let geustIndex = 31;
    let geust: Guest;
    // geust = new Guest(droneStageGame, AWResourceManager.getInstance().resources('ic_crowdcharacter_1_1Img'), AWResourceManager.getInstance().resources('ic_crowdcharacter_1_2Img'), -250, -70);
    geust = new Guest(stageGame, AWResourceManager.getInstance().resources('ic_crowdcharacter_1_1Img'), AWResourceManager.getInstance().resources('ic_crowdcharacter_1_2Img'), -250, -240);
    geust.index = geustIndex++;
    stageGame.pushObj(geust);
    geust = new Guest(stageGame, AWResourceManager.getInstance().resources('ic_crowdcharacter_2_1Img'), AWResourceManager.getInstance().resources('ic_crowdcharacter_2_2Img'), -230, -220);
    geust.index = geustIndex++;
    stageGame.pushObj(geust);
    geust = new Guest(stageGame, AWResourceManager.getInstance().resources('ic_crowdcharacter_3_1Img'), AWResourceManager.getInstance().resources('ic_crowdcharacter_3_2Img'), -210, -200);
    geust.index = geustIndex++;
    stageGame.pushObj(geust);
    geust = new Guest(stageGame, AWResourceManager.getInstance().resources('ic_crowdcharacter_4_1Img'), AWResourceManager.getInstance().resources('ic_crowdcharacter_4_2Img'), -190, -180);
    geust.index = geustIndex++;
    stageGame.pushObj(geust);
    geust = new Guest(stageGame, AWResourceManager.getInstance().resources('ic_crowdcharacter_5_1Img'), AWResourceManager.getInstance().resources('ic_crowdcharacter_5_2Img'), -170, -160);
    geust.index = geustIndex++;
    stageGame.pushObj(geust);
    geust = new Guest(stageGame, AWResourceManager.getInstance().resources('ic_crowdcharacter_6_1Img'), AWResourceManager.getInstance().resources('ic_crowdcharacter_6_2Img'), -150, -140);
    geust.index = geustIndex++;
    stageGame.pushObj(geust);
    geust = new Guest(stageGame, AWResourceManager.getInstance().resources('ic_crowdcharacter_7_1Img'), AWResourceManager.getInstance().resources('ic_crowdcharacter_7_2Img'), -130, -120);
    geust.index = geustIndex++;
    stageGame.pushObj(geust);
    geust = new Guest(stageGame, AWResourceManager.getInstance().resources('ic_crowdcharacter_8_1Img'), AWResourceManager.getInstance().resources('ic_crowdcharacter_8_2Img'), -110, -100);
    geust.index = geustIndex++;
    stageGame.pushObj(geust);
    geust = new Guest(stageGame, AWResourceManager.getInstance().resources('ic_crowdcharacter_9_1Img'), AWResourceManager.getInstance().resources('ic_crowdcharacter_9_2Img'), -90, -70);
    geust.index = geustIndex++;
    stageGame.pushObj(geust);

    const rail = new Rail(stageGame, 0, 0, 0, AWResourceManager.getInstance().resources('ic_displayboardImg'));
    rail.index = 50;
    stageGame.pushObj(rail);

    const track = new Track(stageGame,
      AWResourceManager.getInstance().resources('ic_track_character1_01Img'),
      AWResourceManager.getInstance().resources('ic_track_character1_02Img'),
      AWResourceManager.getInstance().resources('ic_track_character1_03Img'),
      AWResourceManager.getInstance().resources('ic_track_character1_04Img'),
      AWResourceManager.getInstance().resources('ic_track_character1_05Img'),
      AWResourceManager.getInstance().resources('ic_track_character1_06Img'),
      100);
    track.id = 'local';
    track.index = 100;
    stageGame.pushObj(track);
    const track2 = new Track(stageGame,
      AWResourceManager.getInstance().resources('ic_track_character2_01Img'),
      AWResourceManager.getInstance().resources('ic_track_character2_02Img'),
      AWResourceManager.getInstance().resources('ic_track_character2_03Img'),
      AWResourceManager.getInstance().resources('ic_track_character2_04Img'),
      AWResourceManager.getInstance().resources('ic_track_character2_05Img'),
      AWResourceManager.getInstance().resources('ic_track_character2_06Img'),
      250);
    track2.id = 'other';
    track2.index = 101;
    stageGame.pushObj(track2);

    // let fanOrder = 1;
    // for (let i = 500; i <= 509; i++) {
    //   const fan = new Fan(stageGame, AWResourceManager.getInstance().resources('ic_fan_offImg'), fanOrder++);
    //   fan.index = i;
    //   console.log(fan.order);
    //   stageGame.pushObj(fan);
    // }

    //man
    // const winMan = new WigMan(stageGame, AWResourceManager.getInstance().resources('ic_maincharacter_1Img'), fanOrder++);
    // winMan.index = 600;
    // stageGame.pushObj(winMan);

    const score = new Score(stageGame, 0, 0, 0, AWResourceManager.getInstance().resources('gage_00Img'));
    score.index = 1001;
    stageGame.pushObj(score);


    const timer = new Timer(stageGame, 0, 0, 0, AWResourceManager.getInstance().resources('gage_00Img'));
    timer.index = 1003;
    stageGame.pushObj(timer);

    this.stageManager.pushStage(stageLogo);
    this.stageManager.pushStage(stageIntro);
    this.stageManager.pushStage(stageGame);
    this.stageManager.onCreate();
    this.stageManager.onStart();

  }

}
