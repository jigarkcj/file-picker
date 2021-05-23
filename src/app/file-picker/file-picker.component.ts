import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FilesService } from '../files.service';

@Component({
  selector: 'app-file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.css']
})
export class FilePickerComponent implements OnInit {
  filePath: string = 'File Path';
  isLoading = false;
  isFileUploaded = false;
  isFileSelected = false;
  constructor(
    private route: ActivatedRoute,
    private _filesService: FilesService) { }

  ngOnInit() {

  }

  onFileChange(path: string): void {
    this.filePath = path;
    this.isFileSelected = true;
    this.isFileUploaded = false;
  }

  addFile() {
    this._filesService.addFile(this.filePath);
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.isFileUploaded = true;
    }, 5000)
  }

  clearFiles() {
    this._filesService.clearFiles();
  }
}

