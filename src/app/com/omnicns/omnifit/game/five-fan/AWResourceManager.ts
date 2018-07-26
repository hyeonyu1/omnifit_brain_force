import { Observable } from 'rxjs/Rx';
import {LifeCycle} from '../../../../../../../lib-typescript/com/omnicns/event/life/LifeCycle';

export class AWResourceManager implements LifeCycle {
  private static instance: AWResourceManager;

  private _resources: Map<string, any>;

//singletone pattern
  //https://basarat.gitbooks.io/typescript/docs/tips/singleton.html
  static getInstance() {
    if (!AWResourceManager.instance) {
      AWResourceManager.instance = new AWResourceManager();
    }
    return AWResourceManager.instance;
  }

  private constructor() {
    const ic_boardImg                               = new Image(); ic_boardImg.src = 'assets/image/ic_board.png';
    const ranking_shape_02_arrowImg                               = new Image(); ranking_shape_02_arrowImg.src = 'assets/image/ranking_shape_02_arrow.png';
    const ic_result_popup_medal_1stImg              = new Image(); ic_result_popup_medal_1stImg.src = 'assets/image/ic_result_popup_medal_1st.png';
    const ic_result_popup_medal_2ndImg              = new Image(); ic_result_popup_medal_2ndImg.src = 'assets/image/ic_result_popup_medal_2nd.png';
    const ic_track_character1_01Img                 = new Image(); ic_track_character1_01Img.src = 'assets/image/ic_track_character1_01.png';
    const ic_track_character1_02Img                 = new Image(); ic_track_character1_02Img.src = 'assets/image/ic_track_character1_02.png';
    const ic_track_character1_03Img                 = new Image(); ic_track_character1_03Img.src = 'assets/image/ic_track_character1_03.png';
    const ic_track_character1_04Img                 = new Image(); ic_track_character1_04Img.src = 'assets/image/ic_track_character1_04.png';
    const ic_track_character1_05Img                 = new Image(); ic_track_character1_05Img.src = 'assets/image/ic_track_character1_05.png';
    const ic_track_character1_06Img                 = new Image(); ic_track_character1_06Img.src = 'assets/image/ic_track_character1_06.png';
    const ic_track_character2_01Img                 = new Image(); ic_track_character2_01Img.src = 'assets/image/ic_track_character2_01.png';
    const ic_track_character2_02Img                 = new Image(); ic_track_character2_02Img.src = 'assets/image/ic_track_character2_02.png';
    const ic_track_character2_03Img                 = new Image(); ic_track_character2_03Img.src = 'assets/image/ic_track_character2_03.png';
    const ic_track_character2_04Img                 = new Image(); ic_track_character2_04Img.src = 'assets/image/ic_track_character2_04.png';
    const ic_track_character2_05Img                 = new Image(); ic_track_character2_05Img.src = 'assets/image/ic_track_character2_05.png';
    const ic_track_character2_06Img                 = new Image(); ic_track_character2_06Img.src = 'assets/image/ic_track_character2_06.png';
    const ic_track_01Img                 = new Image(); ic_track_01Img.src = 'assets/image/ic_track_01.png';
    const ic_start_lineImg                 = new Image(); ic_start_lineImg.src = 'assets/image/ic_start_line.png';
    const ic_finish_lineImg                 = new Image(); ic_finish_lineImg.src = 'assets/image/ic_finish_line.png';
    const intro_bgImg                 = new Image(); intro_bgImg.src = 'assets/image/intro_bg.png';
    const btn_level_hard_norImg        = new Image(); btn_level_hard_norImg.src = 'assets/image/btn_level_hard_nor.png';
    const btn_level_normal_norImg        = new Image(); btn_level_normal_norImg.src = 'assets/image/btn_level_normal_nor.png';
    const btn_level_easy_norImg        = new Image(); btn_level_easy_norImg.src = 'assets/image/btn_level_easy_nor.png';
    const ic_intro_popuptextImg        = new Image(); ic_intro_popuptextImg.src = 'assets/image/ic_intro_popuptext.png';
    const ic_intro_popuptext2Img        = new Image(); ic_intro_popuptext2Img.src = 'assets/image/ic_intro_popuptext2.png';
    const ic_displayboardImg        = new Image(); ic_displayboardImg.src = 'assets/image/ic_displayboard.png';
    const ic_gage_medal_offImg      = new Image(); ic_gage_medal_offImg.src = 'assets/image/ic_gage_medal_off.png';
    const ic_gage_medal_onImg       = new Image(); ic_gage_medal_onImg.src = 'assets/image/ic_gage_medal_on.png';
    const ic_gageImg                = new Image(); ic_gageImg.src = 'assets/image/ic_gage.png';
    const ic_audienceseatImg        = new Image(); ic_audienceseatImg.src = 'assets/image/ic_audienceseat.png';
    const ic_flag_01Img             = new Image(); ic_flag_01Img.src = 'assets/image/ic_flag_01.png';
    const ic_flag_02Img             = new Image(); ic_flag_02Img.src = 'assets/image/ic_flag_02.png';
    const ic_lighttowerImg         = new Image(); ic_lighttowerImg.src = 'assets/image/ic_lighttower.png';
    const ic_crowdcharacter_1_1Img = new Image(); ic_crowdcharacter_1_1Img.src = 'assets/image/ic_crowdcharacter_1_1.png';
    const ic_crowdcharacter_1_2Img = new Image(); ic_crowdcharacter_1_2Img.src = 'assets/image/ic_crowdcharacter_1_2.png';
    const ic_crowdcharacter_2_1Img = new Image(); ic_crowdcharacter_2_1Img.src = 'assets/image/ic_crowdcharacter_2_1.png';
    const ic_crowdcharacter_2_2Img = new Image(); ic_crowdcharacter_2_2Img.src = 'assets/image/ic_crowdcharacter_2_2.png';
    const ic_crowdcharacter_3_1Img = new Image(); ic_crowdcharacter_3_1Img.src = 'assets/image/ic_crowdcharacter_3_1.png';
    const ic_crowdcharacter_3_2Img = new Image(); ic_crowdcharacter_3_2Img.src = 'assets/image/ic_crowdcharacter_3_2.png';
    const ic_crowdcharacter_4_1Img = new Image(); ic_crowdcharacter_4_1Img.src = 'assets/image/ic_crowdcharacter_4_1.png';
    const ic_crowdcharacter_4_2Img = new Image(); ic_crowdcharacter_4_2Img.src = 'assets/image/ic_crowdcharacter_4_2.png';
    const ic_crowdcharacter_5_1Img = new Image(); ic_crowdcharacter_5_1Img.src = 'assets/image/ic_crowdcharacter_5_1.png';
    const ic_crowdcharacter_5_2Img = new Image(); ic_crowdcharacter_5_2Img.src = 'assets/image/ic_crowdcharacter_5_2.png';
    const ic_crowdcharacter_6_1Img = new Image(); ic_crowdcharacter_6_1Img.src = 'assets/image/ic_crowdcharacter_6_1.png';
    const ic_crowdcharacter_6_2Img = new Image(); ic_crowdcharacter_6_2Img.src = 'assets/image/ic_crowdcharacter_6_2.png';
    const ic_crowdcharacter_7_1Img = new Image(); ic_crowdcharacter_7_1Img.src = 'assets/image/ic_crowdcharacter_7_1.png';
    const ic_crowdcharacter_7_2Img = new Image(); ic_crowdcharacter_7_2Img.src = 'assets/image/ic_crowdcharacter_7_2.png';
    const ic_crowdcharacter_8_1Img = new Image(); ic_crowdcharacter_8_1Img.src = 'assets/image/ic_crowdcharacter_8_1.png';
    const ic_crowdcharacter_8_2Img = new Image(); ic_crowdcharacter_8_2Img.src = 'assets/image/ic_crowdcharacter_8_2.png';
    const ic_crowdcharacter_9_1Img = new Image(); ic_crowdcharacter_9_1Img.src = 'assets/image/ic_crowdcharacter_9_1.png';
    const ic_crowdcharacter_9_2Img = new Image(); ic_crowdcharacter_9_2Img.src = 'assets/image/ic_crowdcharacter_9_2.png';

    const intro_text_02Img = new Image(); intro_text_02Img.src = 'assets/image/intro_text_02.png';
    const game_bg_cloud_04Img = new Image(); game_bg_cloud_04Img.src = 'assets/image/game_bg_cloud_04.png';
    const game_bg_cloud_05Img = new Image(); game_bg_cloud_05Img.src = 'assets/image/game_bg_cloud_05.png';
    const alarm_iconImg = new Image(); alarm_iconImg.src = 'assets/image/alarm_icon.png';
    const ic_maincharacter_1Img = new Image(); ic_maincharacter_1Img.src = 'assets/image/ic_maincharacter_1.png';
    const ic_maincharacter_2Img = new Image(); ic_maincharacter_2Img.src = 'assets/image/ic_maincharacter_2.png';
    const ic_maincharacter_3_1Img = new Image(); ic_maincharacter_3_1Img.src = 'assets/image/ic_maincharacter_3_1.png';
    const ic_maincharacter_3_2Img = new Image(); ic_maincharacter_3_2Img.src = 'assets/image/ic_maincharacter_3_2.png';
    const ic_maincharacter_4Img = new Image(); ic_maincharacter_4Img.src = 'assets/image/ic_maincharacter_4.png';
    const ic_maincharacter_5Img = new Image(); ic_maincharacter_5Img.src = 'assets/image/ic_maincharacter_5.png';
    const ic_fan_onImg = new Image(); ic_fan_onImg.src = 'assets/image/ic_fan_on.png';
    const ic_fan_offImg = new Image(); ic_fan_offImg.src = 'assets/image/ic_fan_off.png';
    const ic_fanframe_01Img = new Image(); ic_fanframe_01Img.src = 'assets/image/ic_fanframe_01.png';
    const ic_fanframe_02Img = new Image(); ic_fanframe_02Img.src = 'assets/image/ic_fanframe_02.png';
    const ic_fanframe_powerImg = new Image(); ic_fanframe_powerImg.src = 'assets/image/ic_fanframe_power.png';

    const btn_result_popup_again_norImg = new Image(); btn_result_popup_again_norImg.src = 'assets/image/btn_result_popup_again_nor.png';
    const btn_result_popup_exit_norImg = new Image(); btn_result_popup_exit_norImg.src = 'assets/image/btn_result_popup_exit_nor.png';
    const ic_result_popup_bgImg = new Image(); ic_result_popup_bgImg.src = 'assets/image/ic_result_popup_bg.png';
    const ic_result_popup_characterImg = new Image(); ic_result_popup_characterImg.src = 'assets/image/ic_result_popup_character.png';
    const ic_result_popup_firecrackerImg = new Image(); ic_result_popup_firecrackerImg.src = 'assets/image/ic_result_popup_firecracker.png';
    const ic_result_popup_score_bgImg = new Image(); ic_result_popup_score_bgImg.src = 'assets/image/ic_result_popup_score_bg.png';

    const applauseSound = new Audio('assets/audio/applause.mp3');
    const applause_upSound = new Audio('assets/audio/applause_up.mp3');
    const fanSound = new Audio('assets/audio/fan.mp3');
    const intro_bgmSound = new Audio('assets/audio/intro_bgm.mp3');
    const main_bgmSound = new Audio('assets/audio/main_bgm.mp3');
    const ready_startSound = new Audio('assets/audio/ready_start.mp3');
    const startSound = new Audio('assets/audio/start.mp3');

    this._resources = new Map<string, HTMLImageElement>();
    this.setResources('intro_text_02Img', intro_text_02Img);
    this.setResources('game_bg_cloud_04Img', game_bg_cloud_04Img);
    this.setResources('game_bg_cloud_05Img', game_bg_cloud_05Img);
    this.setResources('alarm_iconImg', alarm_iconImg);
    this.setResources('ic_maincharacter_1Img', ic_maincharacter_1Img);
    this.setResources('ic_maincharacter_2Img', ic_maincharacter_2Img);
    this.setResources('ic_maincharacter_3_1Img', ic_maincharacter_3_1Img);
    this.setResources('ic_maincharacter_3_2Img', ic_maincharacter_3_2Img);
    this.setResources('ic_maincharacter_4Img', ic_maincharacter_4Img);
    this.setResources('ic_maincharacter_5Img', ic_maincharacter_5Img);
    this.setResources('ic_maincharacter_5Img', ic_maincharacter_5Img);
    this.setResources('ic_fan_onImg', ic_fan_onImg);
    this.setResources('ic_fan_offImg', ic_fan_offImg);
    this.setResources('ic_fanframe_01Img', ic_fanframe_01Img);
    this.setResources('ic_fanframe_02Img', ic_fanframe_02Img);
    this.setResources('ic_fanframe_powerImg', ic_fanframe_powerImg);

    this.setResources('btn_result_popup_again_norImg', btn_result_popup_again_norImg);
    this.setResources('btn_result_popup_exit_norImg', btn_result_popup_exit_norImg);
    this.setResources('ic_result_popup_bgImg', ic_result_popup_bgImg);
    this.setResources('ic_result_popup_characterImg', ic_result_popup_characterImg);
    this.setResources('ic_result_popup_firecrackerImg', ic_result_popup_firecrackerImg);
    this.setResources('ic_result_popup_score_bgImg', ic_result_popup_score_bgImg);

    this.setResources('applauseSound', applauseSound);
    this.setResources('applause_upSound', applause_upSound);
    this.setResources('fanSound', fanSound);
    this.setResources('intro_bgmSound', intro_bgmSound);
    this.setResources('ready_startSound', ready_startSound);
    this.setResources('main_bgmSound', main_bgmSound);
    this.setResources('startSound', startSound);

    this.setResources('ic_displayboardImg', ic_displayboardImg);
    this.setResources('ic_gage_medal_offImg', ic_gage_medal_offImg);
    this.setResources('ic_gage_medal_onImg', ic_gage_medal_onImg);
    this.setResources('ic_gageImg', ic_gageImg);
    this.setResources('ic_audienceseatImg', ic_audienceseatImg);
    this.setResources('ic_flag_01Img', ic_flag_01Img);
    this.setResources('ic_flag_02Img', ic_flag_02Img);
    this.setResources('ic_lighttowerImg', ic_lighttowerImg);

    this.setResources('ic_crowdcharacter_1_1Img', ic_crowdcharacter_1_1Img);
    this.setResources('ic_crowdcharacter_1_2Img', ic_crowdcharacter_1_2Img);
    this.setResources('ic_crowdcharacter_2_1Img', ic_crowdcharacter_2_1Img);
    this.setResources('ic_crowdcharacter_2_2Img', ic_crowdcharacter_2_2Img);
    this.setResources('ic_crowdcharacter_3_1Img', ic_crowdcharacter_3_1Img);
    this.setResources('ic_crowdcharacter_3_2Img', ic_crowdcharacter_3_2Img);
    this.setResources('ic_crowdcharacter_4_1Img', ic_crowdcharacter_4_1Img);
    this.setResources('ic_crowdcharacter_4_2Img', ic_crowdcharacter_4_2Img);
    this.setResources('ic_crowdcharacter_5_1Img', ic_crowdcharacter_5_1Img);
    this.setResources('ic_crowdcharacter_5_2Img', ic_crowdcharacter_5_2Img);
    this.setResources('ic_crowdcharacter_6_1Img', ic_crowdcharacter_6_1Img);
    this.setResources('ic_crowdcharacter_6_2Img', ic_crowdcharacter_6_2Img);
    this.setResources('ic_crowdcharacter_7_1Img', ic_crowdcharacter_7_1Img);
    this.setResources('ic_crowdcharacter_7_2Img', ic_crowdcharacter_7_2Img);
    this.setResources('ic_crowdcharacter_8_1Img', ic_crowdcharacter_8_1Img);
    this.setResources('ic_crowdcharacter_8_2Img', ic_crowdcharacter_8_2Img);
    this.setResources('ic_crowdcharacter_9_1Img', ic_crowdcharacter_9_1Img);
    this.setResources('ic_crowdcharacter_9_2Img', ic_crowdcharacter_9_2Img);
    this.setResources('ic_intro_popuptextImg', ic_intro_popuptextImg);
    this.setResources('ic_intro_popuptext2Img', ic_intro_popuptext2Img);
    this.setResources('btn_level_easy_norImg', btn_level_easy_norImg);
    this.setResources('btn_level_normal_norImg', btn_level_normal_norImg);
    this.setResources('btn_level_hard_norImg', btn_level_hard_norImg);
    this.setResources('intro_bgImg', intro_bgImg);
    this.setResources('ic_track_01Img', ic_track_01Img);
    this.setResources('ic_start_lineImg', ic_start_lineImg);
    this.setResources('ic_finish_lineImg', ic_finish_lineImg);
    this.setResources('ic_track_character1_01Img', ic_track_character1_01Img);
    this.setResources('ic_track_character1_02Img', ic_track_character1_02Img);
    this.setResources('ic_track_character1_03Img', ic_track_character1_03Img);
    this.setResources('ic_track_character1_04Img', ic_track_character1_04Img);
    this.setResources('ic_track_character1_05Img', ic_track_character1_05Img);
    this.setResources('ic_track_character1_06Img', ic_track_character1_06Img);
    this.setResources('ic_track_character2_01Img', ic_track_character2_01Img);
    this.setResources('ic_track_character2_02Img', ic_track_character2_02Img);
    this.setResources('ic_track_character2_03Img', ic_track_character2_03Img);
    this.setResources('ic_track_character2_04Img', ic_track_character2_04Img);
    this.setResources('ic_track_character2_05Img', ic_track_character2_05Img);
    this.setResources('ic_track_character2_06Img', ic_track_character2_06Img);
    this.setResources('ic_boardImg', ic_boardImg);
    this.setResources('ic_result_popup_medal_1stImg', ic_result_popup_medal_1stImg);
    this.setResources('ic_result_popup_medal_2ndImg', ic_result_popup_medal_2ndImg);
    this.setResources('ranking_shape_02_arrowImg', ranking_shape_02_arrowImg);

    // this._resources.forEach((v, k) => {
    //   Observable.fromEvent(v, 'load').subscribe( (it: Event) => {
    //     //it.srcElement;
    //     console.log(it);
    //   });
    // });
  }

  resources(name: string): any {
    return this._resources.get(name);
  }
  setResources(key: string, rs: any): any {
    this._resources.set(key, rs);
  }

  setImageResources(name: string, src: string, load: (it: Event) => void): HTMLImageElement {
    const img = new Image(); img.src = src;
    Observable.fromEvent(img, 'load').subscribe(load);
    this._resources.set(name, img);
    return img;
  }

  onCreate(...data: any[]) {
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
  }

  onStop(data?: any) {
  }
}
