import {PointVector} from '../../../../../../../../../lib-typescript/com/omnicns/math/PointVector';
import {ValidUtil} from '../../../../../../../../../lib-typescript/com/omnicns/valid/ValidUtil';
import {RandomUtil} from '../../../../../../../../../lib-typescript/com/omnicns/random/RandomUtil';
import {AWStage} from '../../stage/AWStage';
import {MoveImg} from '../comm/MoveImg';
import {MathUtil} from '../../../../../../../../../lib-typescript/com/omnicns/math/MathUtil';

export class Moon extends MoveImg {

  constructor(stage: AWStage, x: number, y: number, z: number, img?: HTMLImageElement) {
    super(stage, x, y, z, img);
    this.imgAlign = 'center';
    // this.imgBaseline = 'middle';
    this.imgBaseline = 'hanging';
  }

  startPosition(): PointVector {
    return new PointVector(RandomUtil.random(this.stage.width), this.stage.height);
  }

  targetPosition(): PointVector {
    // return super.targetPosition();
    return new PointVector(MathUtil.getValueByTotInPercent(this.stage.width, 10), 100);
    // return new PointVector(0, 0);
  }
}
