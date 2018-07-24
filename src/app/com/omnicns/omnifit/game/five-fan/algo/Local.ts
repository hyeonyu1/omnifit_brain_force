import {Subscription} from 'rxjs/Subscription';
import {DeviceManager} from '../../../drive/DeviceManager';
import {Algo} from '../domain/Algo';
import {RandomUtil} from '../../../../../../../../lib-typescript/com/omnicns/random/RandomUtil';
import {interval} from 'rxjs/observable/interval';

export class Local extends Algo {
  private concentrationSubscription: Subscription;
  private concentration = 0;
  private intervalSubscription: Subscription;

  constructor(uuid?: string, host?: string) {
    super(uuid, host);
  }

  onCreate(data?: any): Algo {
    this.intervalSubscription = interval(1000).subscribe( (it) => {
      this.headsetConcentration = Math.trunc(Math.max(0.5, this.concentration)) / 5;
      this.headsetConcentrationHistory.push(this.headsetConcentration);
    });
    this.concentrationSubscription = DeviceManager.getInstance().headsetConcentrationSubscribe((concentration) => {
      this.concentration = concentration;
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
    this.concentrationSubscription.unsubscribe();
    return this;
  }
  onDestroy(data?: any): Algo {
    this.intervalSubscription.unsubscribe();
    this.concentrationSubscription.unsubscribe();
    return this;
  }


}
