#!/usr/bin/env node

import { CommandReader } from './models/app/CommandReader';
import { ComponentCreator } from './models/app/ComponentCreater';

class Main {
  public commandReader: CommandReader;

  constructor() {
    this.commandReader = new CommandReader();

    if (this.commandReader.isValidCommands()) {
      this.init();
    }
  }

  public init() {
    const commandType = this.getCommand();

    if (commandType === 'component') {
      this.createComponent();
    }
  }

  public getCommand() {
    return this.commandReader.getCommandType();
  }

  private createComponent() {
    const cmdInstructions = this.commandReader.getCommandIntructions();
    new ComponentCreator(cmdInstructions);
  }
}

new Main();

function isNameValid(name) {
  // Allowable characters [. - _ ABC 123]
  if (name) {
    console.log(true);
  }
}
