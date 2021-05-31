import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { FilesService } from '../files.service';
import { FileTreeViewComponent } from '../file-tree-view/file-tree-view.component';

@Component({
  selector: 'app-file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.css']
})
export class FilePickerComponent implements OnInit {
  filePath: string;
  isLoading = false;
  isFileUploaded = false;
  isFileSelected = false;
  message = ""
  filesSaved = false;
  constructor(
    private route: ActivatedRoute,
    private _filesService: FilesService,
    public dialog: MatDialog) { }

  ngOnInit() {
   
  }

   openDialog() {
    this.message ="";
    const dialogRef = this.dialog.open(FileTreeViewComponent);
    this.isFileSelected = true;

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getFilePath() {
    this.filePath = this._filesService.getFilePath();
    this.isFileUploaded = false;
    return this.filePath;
  }

  addFile() {
    this._filesService.addFile(this.filePath);
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.message = "Upload Complete!"
      this.filesSaved = true;
    }, 5000)
  }

  clearFiles() {
    this._filesService.clearFiles();
    this.filesSaved = false;
  }
}

