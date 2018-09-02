
declare var process: any;

export class CommandReader {
  public baseCommands = process.argv.slice(0, 1);
  public userCommands = process.argv.slice(2);

  constructor() { }

  public isValidCommands() {
    console.log('User Commands: ', this.userCommands);
    console.log('Base Commands: ', this.baseCommands);

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
      console.log(name);
      return name;
    } else {
      throw Error('No name found');
    }
  }
}
