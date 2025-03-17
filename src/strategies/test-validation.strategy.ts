import { CreateSltDto } from '../dto/test/create-slt.dto';
import { CreateHltDto } from '../dto/test/create-hlt.dto';

export class TestValidationStrategy {
  public validateSimpleTest(data: CreateSltDto) {
    if ((1 - data.misclicks / data.allSignals) * 100 < 80) return false;
    return data.allSignals >= 120;
  }

  public validateHardLightTest(data: CreateHltDto) {
    if ((1 - (data.mistakes + data.misclicks) / data.allSignals) * 100 < 80)
      return false;
    return data.allSignals >= 60;
  }
}
