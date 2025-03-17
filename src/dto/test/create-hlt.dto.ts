export interface CreateHltDto {
  userId: number;
  averageCallbackTime: number;
  allSignals: number;
  misclicks: number;
  mistakes: number;
  dispersion: number;
  valid: boolean;
}
