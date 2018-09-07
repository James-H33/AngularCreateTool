import * as FileSystem from 'fs';
import * as Path from 'path';

export class File {
  constructor() { }

  public exists(path: string) {
    return new Promise((resolve) => {
      FileSystem.exists(Path.resolve(path), (exists: boolean) => {
        resolve(exists);
      }); 
    });
  }

  public makeDir(path: string) {
    return new Promise((resolve, reject) => { 
      FileSystem.mkdir(Path.resolve(path), (err) => {
        if (err) {
          reject(err);
        }

        resolve(true);
      }); 
    });
  }

  public readDir(path: string) {
    return new Promise((resolve, reject) => { 
      FileSystem.readdir(path, (err, files: string[]) => {
        if (err) {
          console.log(err);
          reject(err);
        }

        resolve(files);
      });
    });
  }

  public async writeFile(path: string, content: any) {
    return new Promise((resolve, reject) => {
      FileSystem.writeFile(Path.resolve(path), content, 'utf-8', (err) => {
        if (err) {
          reject(err);
        }
  
        resolve();
      });
    });
  }
  
  public async readFile(fileName: string) {
    return new Promise((resolve, reject) => {
      FileSystem.readFile(Path.resolve(fileName), 'utf-8', (err, contents) => {
        if (err) {
          console.log(err);
          reject(err);
        }
  
        resolve(contents);
      });
    });
  }
}