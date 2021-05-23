import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  filePaths = [];

  constructor() { }
  
  addFile(path: string) {
    this.filePaths.push(path);
  }

  getFiles(): Observable<any[]> {
    const files = of(this.filePaths)
    return files;
  }

  clearFiles() {
    this.filePaths = [];
    return this.filePaths;
  }

}
