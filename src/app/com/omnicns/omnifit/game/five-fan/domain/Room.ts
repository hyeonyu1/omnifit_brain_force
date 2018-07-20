import {Info} from '../info/Info';
import {Algo} from './Algo';
import {LifeCycle} from '../../../../../../../../lib-typescript/com/omnicns/event/life/LifeCycle';

export class Room implements LifeCycle {

  public uuid: string;
  public status: string;
  public startCnt: number;
  public endCnt: number;
  public local: Algo;
  public other: Algo;

  constructor(uuid = '', status = 'wait', startCnt = Info.START_CNT, endCnt = Info.END_CNT, local?: Algo, other?: Algo) {
    this.uuid = uuid;
    this.status = status;
    this.startCnt = startCnt;
    this.endCnt = endCnt;
    this.local = local;
    this.other = other;
  }

  public resetCnt() {
    this.startCnt = Info.START_CNT;
    this.endCnt = Info.END_CNT;
  }

  onCreate(...data: any[]) {
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
    if (this.local) {
      this.local.onStop(data);
    }
    if (this.other) {
      this.other.onStop(data);
    }
  }

  onDestroy(data?: any) {
    if (this.local) {
      this.local.onDestroy(data);
    }
    if (this.other) {
      this.other.onDestroy(data);
    }
  }
}
