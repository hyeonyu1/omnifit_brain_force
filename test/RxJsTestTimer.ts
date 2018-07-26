// import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/operator/map';
import {Subject} from 'rxjs/Subject';
import {timer} from 'rxjs/observable/timer';

console.log('----')
timer(1000).subscribe((it) => {
  console.log(it);
});
