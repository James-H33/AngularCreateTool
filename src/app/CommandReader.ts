
declare var process: any;

export class CommandReader {
  public baseCommands = process.argv.slice(0, 1);
  public userCommands = process.argv.slice(2);

  constructor() { }

  public isValidCommands() {
    return this.userCommands.length === 3;
  }

  public getCommandIntructions() {
    return {
      commandType: this.userCommands[0],
      name: this.userCommands[1],
      path: this.userCommands[2],
    }
  }

  public getCommandType() {
    return this.userCommands[0];
  }

  public getName() {
    const name = this.userCommands[1];
  
    if (name) {
      return name;
    } else {
      throw Error('No name found');
    }
  }
}
