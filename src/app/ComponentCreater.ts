import { File } from './File';
import { CommandInstruction } from '../models/CommandInstruction.model';

export class ComponentCreator {
  public instructions: CommandInstruction;
  public fileSys: File = new File();
  private _baseComponentPath: string = './angular-component/';

  constructor(cmdInstruction: CommandInstruction) { 
    this.instructions = cmdInstruction;
    this.createComponent();
  }

  public isSpecFile(splitFileName: string[]) {
    const spec = splitFileName[splitFileName.length - 2];
    return spec && spec === 'spec';
  }

  public getDefaultComponentDirectory() {
    return this.fileSys.readDir(this._baseComponentPath);
  }
  
  public getFileExtension(fileName: string) {
    const splitFileName = fileName.split('.');
    const specFile = this.isSpecFile(splitFileName);
  
    if (specFile) {
      return '.spec.ts'; 
    } else {
      return '.' + splitFileName[splitFileName.length - 1];
    }
  }

  private getRequiredDirectories() {
    return this.instructions.path.split('/').filter(x => x !== '.');
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
        const fileContents = await this.fileSys.readFile(`${this._baseComponentPath}/${file}`);
        const extension = this.getFileExtension(file);
        const fileDestination = this.instructions.path + `/${this.instructions.name}${extension}`;
    
        await this.fileSys.writeFile(fileDestination, fileContents);
      } catch(e) {
        console.log(e);
      } 
  
      // readfile 
      // write to new location with file name passed in by user
    });
  }
}