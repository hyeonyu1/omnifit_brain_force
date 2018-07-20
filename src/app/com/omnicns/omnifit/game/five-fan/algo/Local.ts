import {Subscription} from 'rxjs/Subscription';
import {DeviceManager} from '../../../drive/DeviceManager';
import {Algo} from '../domain/Algo';

export class Local extends Algo {
  private concentrationSubscription: Subscription;

  constructor(uuid?: string, host?: string) {
    super(uuid, host);
  }

  onCreate(data?: any): Algo {
    this.concentrationSubscription = DeviceManager.getInstance().headsetConcentrationSubscribe((concentration) => {
      this.headsetConcentration = concentration;
      this.headsetConcentrationHistory.push(concentration);
      // console.log('---local---- ' + this.headsetConcentration)
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
    this.concentrationSubscription.unsubscribe();
    return this;
  }
  onDestroy(data?: any): Algo {
    this.concentrationSubscription.unsubscribe();
    return this;
  }
}
