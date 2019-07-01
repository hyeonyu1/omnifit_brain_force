
  import {AWStage} from '../../stage/AWStage';
  import {AWObj} from '../AWObj';
  import {Subscription} from 'rxjs';
  import {Room} from '../../domain/Room';
  import {PointVector} from '../../../../../../../../../lib-typescript/com/omnicns/math/PointVector';
  import {AWStageEvent} from '../../stage/AWStageEvent';
  import {ValidUtil} from '../../../../../../../../../lib-typescript/com/omnicns/valid/ValidUtil';
  import {RoomStatusCode} from '../../code/RoomStatusCode';
  import {Algo} from '../../domain/Algo';

  export class Laser extends AWObj {

    private endPt = 0;
    private velocity: PointVector;
    private acceleration: PointVector;
    private accelerationStep: PointVector;
    private resizeSubscription: Subscription;
    private beforeHeadsetConcentration = 0;
    private roomDetailSubscription: Subscription;
    private room: Room;
    private algo: Algo;
    private targetPosition: PointVector;


    constructor(stage: AWStage, x: number, y: number, z: number, img?: HTMLImageElement) {
      super(stage, x, y, z, img);
    }

    onCreate(data?: any) {
    }

    onDestroy(data?: any) {
    }

    onDraw(context: CanvasRenderingContext2D): void {

      if (this.room && this.room.status === 'run') {
        const gageBgH = 3 * (this.stage.height / 7);
        const gageBgW = (this.stage.width / 6);
        const gageBgX = (this.stage.width / 2) - (gageBgW / 2);
        const gageBgY = (this.stage.height / 2) - (gageBgH / 2);


        // User won
        if (this.y <  gageBgY) {
          this.endPt = this.y;
          this.room.status = 'end';
          this.room.local.headsetConcentrationHistory.push(500);
        }

        // CPU won
        if ((this.y > gageBgY + gageBgH)) {
          this.room.status = 'end';
          this.room.other.headsetConcentrationHistory.push(1000);
        }

        // User's laser
        context.fillStyle = '#FFFF00';
        context.fillRect(gageBgX, this.y, gageBgW, (gageBgY + gageBgH - this.y) );

        // CPU's laser
        context.fillStyle = '#9400D3';
        context.fillRect(gageBgX, gageBgY, gageBgW, gageBgH - (gageBgY + gageBgH - this.y) );

        //방향
        const dir = PointVector.sub(this.targetPosition, this);
        dir.normalize();
        dir.mult(0.5);
        this.acceleration = dir;
        this.velocity.add(this.acceleration);
        this.velocity.limit(2);
        this.add(this.velocity);
        context.drawImage(this.img, this.x - (this.img.width / 2), this.y - this.img.height / 2); // need to update startingY
      }


      // finding middle
      context.strokeStyle = '#FF0000';
      context.beginPath();
      context.arc(this.stage.width / 2, this.stage.height / 2, 3, 0, 2 * Math.PI);
      context.stroke();



      // getting ration + dividing up the screen
      //vertical line through middle
      context.beginPath();
      context.moveTo(this.stage.width / 2, 0);
      context.lineTo(this.stage.width / 2, this.stage.height);
      context.stroke();

      //horizontal line through middle
      context.beginPath();
      context.moveTo(0, this.stage.height / 2);
      context.lineTo(this.stage.width, this.stage.height / 2);
      context.stroke();


      context.strokeStyle = '#0000FF';

      //vertical
      for (let i = 1; i <= 14; i++ ) {
        context.beginPath();
        context.moveTo(0, i * (this.stage.height / 14));
        context.lineTo(this.stage.width, i * (this.stage.height / 14));
        context.stroke();
      }

      // horizontal
      for (let i = 1; i <= 6; i++ ) {
        context.beginPath();
        context.moveTo(i * (this.stage.width / 6), 0);
        context.lineTo(i * (this.stage.width / 6), this.stage.height);
        context.stroke();
      }


    }


    onPause(data?: any) {
    }

    onRestart(data?: any) {
    }

    onResume(data?: any) {
    }

    onStart(data?: any) {
      this.x = this.stage.width / 2;
      this.y = this.stage.height / 2;
      this.beforeHeadsetConcentration = 0;
      this.accelerationStep = new PointVector(0.2, 0.2, 0);
      this.acceleration = new PointVector(0, 0);
      this.velocity = new PointVector(0, 0);
      this.targetPosition = new PointVector(this.x, this.stage.height / 2);
      this.room = undefined;
      //집중도
      this.roomDetailSubscription = this.stage.eventObservable(AWStageEvent.EVENT_ROOM_DETAIL).filter((it) => !ValidUtil.isNullOrUndefined(it.local) && !ValidUtil.isNullOrUndefined(it.other)).subscribe( (room: Room) => {
        console.log('laser score room ' + room.local.headsetConcentration + ' ' + room.other.headsetConcentration);
        if (room.status === RoomStatusCode.RUN) {
          this.room = room;
          let val = 0;
          if (this.room.local.headsetConcentration > this.room.other.headsetConcentration) {
            val = -10;
          } else if (this.room.local.headsetConcentration < this.room.other.headsetConcentration) {
            val = +10;
          }
          this.targetPosition.add(0, val);
        }else {
          this.room = undefined;
        }
      });
    }

    onStop(data?: any) {
      if (!ValidUtil.isNullOrUndefined(this.roomDetailSubscription)) {this.roomDetailSubscription.unsubscribe(); }
      if (!ValidUtil.isNullOrUndefined(this.resizeSubscription)) {this.resizeSubscription.unsubscribe(); }
    }



  }
