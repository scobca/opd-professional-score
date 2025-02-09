export class CodeGeneratorUtil {
  public generateCode(): string {
    const min = 100000;
    const max = 999999;
    const code = Math.floor(Math.random() * (max - min + 1)) + min;

    return code.toString();
  }
}
