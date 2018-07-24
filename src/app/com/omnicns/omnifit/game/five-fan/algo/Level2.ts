import {Subscription} from 'rxjs/Subscription';
import {DeviceManager} from '../../../drive/DeviceManager';
import {Algo} from '../domain/Algo';
import {RandomUtil} from '../../../../../../../../lib-typescript/com/omnicns/random/RandomUtil';
import {interval} from 'rxjs/observable/interval';

export class Level2 extends Algo {

  private intervalSubscription: Subscription;

  constructor(uuid?: string, host?: string, name?: string) {
    super(uuid, host);
    this.name = name;
  }

  onCreate(data?: any): Algo {
    this.intervalSubscription = interval(1000).subscribe( (it) => {
      this.headsetConcentration = Math.trunc(Math.max(0.5, RandomUtil.random(3, 7 + 1))) / 5;
      this.headsetConcentrationHistory.push(this.headsetConcentration);
    });
    return this;
  }

  onPause(data?: any): Algo {
    return this;
  }

  onRestart(data?: any): Algo {
    return this;
  }

  onResume(data?: any): Algo {
    return this;
  }

  onStart(data?: any): Algo {
    return this;
  }

  onStop(data?: any): Algo {
    this.intervalSubscription.unsubscribe();
    return this;
  }
  onDestroy(data?: any): Algo {
    this.intervalSubscription.unsubscribe();
    return this;
  }

}
