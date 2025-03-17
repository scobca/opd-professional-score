import { CreateSltDto } from '../dto/test/create-slt.dto';

export class TestValidationStrategy {
  public validateSimpleTest(data: CreateSltDto) {
    if ((1 - data.misclicks / data.allSignals) * 100 < 80) return false;
    return data.allSignals >= 120;
  }
}
