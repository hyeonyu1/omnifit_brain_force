import {Info} from '../info/Info';
import {Algo} from './Algo';
import {LifeCycle} from '../../../../../../../../lib-typescript/com/omnicns/event/life/LifeCycle';
import {AWObj} from '../obj/AWObj';
import {Track} from '../obj/game/Track';

export class Room implements LifeCycle {

  public uuid: string;
  public status: string;
  public startCnt: number;
  public local: Algo;
  public other: Algo;
  // public stopParameter: Track;

  constructor(uuid = '', status = 'wait', startCnt = Info.START_CNT, local?: Algo, other?: Algo) {
    this.uuid = uuid;
    this.status = status;
    this.startCnt = startCnt;
    this.local = local;
    this.other = other;
  }

  public resetCnt() {
    this.startCnt = Info.START_CNT;
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

  onStop(data?: Track) {
    // this.stopParameter = data;
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
  toString(): string {
    return 'uuid: ' + this.uuid + ' status:' + this.status + ' startCnt:' + this.startCnt + ' local:' + this.local + ' other:' + this.other;
  }
}
