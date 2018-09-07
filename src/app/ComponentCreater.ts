import * as Path from 'path';
import { File } from './File';
import { CommandInstruction } from '../models/CommandInstruction.model';

export class ComponentCreator {
  public instructions: CommandInstruction;
  public fileSys: File = new File();
  private _baseComponentPath: string = Path.resolve(__dirname, '../../..', 'resources/angular-component');

  constructor(cmdInstruction: CommandInstruction) { 
    this.instructions = cmdInstruction;
    this.createComponent();
  }

  public getDefaultComponentDirectory() {
    return this.fileSys.readDir(this._baseComponentPath);
  }
  
  public getFileExtension(fileName: string) {
    const index = fileName.indexOf('.');
    return fileName.substr(index, fileName.length);
  }

  private getRequiredDirectories() {
    return this.instructions.path.split('/').filter(x => x !== '.');
  }

  private updateComponentFileContents(fileContents: string) {
    const updateFileContents = this.updateComponentNameInFile(this.updatePathsAndSelector(fileContents));
    return updateFileContents;
  }

  private updateComponentNameInFile(contents: string) {
    const componentClassName = this.createComponentClassName();
    return contents.split('AngularComponent').join(componentClassName);
  }

  private createComponentClassName() {
    return this.instructions.name
      .split('-')
      .map((s) => s.charAt(0).toUpperCase() + s.substr(1, s.length))
      .join('');
  }

  private updatePathsAndSelector(contents: string) {
    return contents.split('angular-component').join(this.instructions.name);
  }

  public async createComponentDirectory() {
    try {
      return new Promise(async (resolve, reject) => {
        const paths = this.getRequiredDirectories();

        for (let i = 0; i < paths.length;) {
          const previousPaths = i !== 0 ? paths.slice(0, i) : [];
          const currentPath = [...previousPaths, paths[i]].join('/');
          const pathExists = await this.fileSys.exists(currentPath);

          if (!pathExists) {
            await this.fileSys.makeDir(currentPath);
          }

          i++;
        }

        resolve();
      });
    } catch(e) {
      throw(e);
    } 
  }

  public async createComponent() {
    await this.createComponentDirectory();
    const files: any = await this.getDefaultComponentDirectory();

    files.forEach(async (file: string) => {
      try {
        let fileContents = await this.fileSys.readFile(`${this._baseComponentPath}/${file}`);
        const extension = this.getFileExtension(file);
        const fileDestination = this.instructions.path + `/${this.instructions.name}${extension}`;

        if (extension.includes('component.ts')) {
          fileContents = this.updateComponentFileContents(fileContents as string);
        }
    
        await this.fileSys.writeFile(fileDestination, fileContents);
      } catch(e) {
        console.log(e);
      } 
    });

    console.log('Complete!');
  }
}