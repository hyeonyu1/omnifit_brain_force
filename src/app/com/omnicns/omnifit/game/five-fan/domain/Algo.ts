import {LifeCycle} from '../../../../../../../../lib-typescript/com/omnicns/event/life/LifeCycle';

export abstract class Algo implements LifeCycle {
  public uuid: string;
  public name: string;
  public host: string;
  public headsetConcentration = 0;
  public headsetConcentrationHistory = new Array<number>();
  public success = 0;
  public successScore = 0;
  public successHistory = new Array<number>();
  constructor(uuid = 'local', host = 'local') {
    this.uuid = uuid;
    this.host = host;
  }
  public clearConcentration() {
    this.headsetConcentration = 0;
    this.headsetConcentrationHistory.length = 0;
    this.headsetConcentrationHistory = new Array<number>();
  }
  public clearSuccessHistory() {
    this.successHistory.length = 0;
    this.successHistory = new Array<number>();
  }
  abstract onCreate(...data: any[]);

  abstract onDestroy(data?: any);

  abstract onPause(data?: any);

  abstract onRestart(data?: any);

  abstract onResume(data?: any);

  abstract onStart(data?: any);

  abstract onStop(data?: any);

  toString(): string {
    return 'uuid: ' + this.uuid + ' name:' + this.name + ' host:' + this.host + ' headsetConcentration:' + this.headsetConcentration + ' headsetConcentrationHistory:' + this.headsetConcentrationHistory + 'success:' + this.success + 'successHistory:' + this.successHistory;
  }
}
