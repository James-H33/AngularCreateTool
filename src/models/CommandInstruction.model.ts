export class CommandInstruction {
  public commandType: string;
  public name: string;
  public path: string;

  constructor(data?: any) {
    this.commandType = data.commandType;
    this.name = data.name;
    this.path = data.path;
  }
}