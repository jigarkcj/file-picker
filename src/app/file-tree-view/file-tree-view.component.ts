import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, OnInit} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { Output, EventEmitter } from '@angular/core';
import { FilesService } from '../files.service';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] =  [
  {
    name: 'root',
    children: [
          {
            name: 'dir1',
            children: [
              {
                name: 'diry',
                children: [
                    {name: 'file3.ext'}
                ]
              }
            ]
          },
          {
            name: 'dir2',
            children: [
                {
                name: 'dirx',
                children: [
                    {name: 'file.ext'},
                    {name: 'file1.ext'}
                ]},
                {name: 'file2.ext'}
            ]
          },
          {
            name: 'dir3',
            children: [
                {
                name: 'dirz',
                children: [
                    {name: 'file4.ext'}
                ]},
                {name: 'dira',
                children: [
                    {name: 'file5.ext'}
                ]}
            ]
          },
           {
            name: 'dir4',
            children: [
                {
                name: 'dira',
                children: [
                    {name: 'file5.ext'}
                ]}
            ]
          },
          {
            name: 'dir5',
            children: [
                {
                name: 'dirb',
                children: [
                    {name: 'file6.ext'}
                ]}
            ]
          },
           {
            name: 'dir6',
            children: [
                {
                name: 'dir0',
                children: [
                    {name: 'file7.ext'},
                    {name: 'file8.ext'},
                    {name: 'file9.ext'}
                ]}
            ]
          },
           {
            name: 'dir7',
            children: [
                {
                name: 'dirc',
                children: [
                    {
                    name: 'dire',
                    children: [
                       
                    ]},
                    {
                    name: 'dirv',
                    children: [
                        {name: 'file11.ext'}
                    ]},
                    {name:'file12.ext'}
                ]}
               
            ]
          },
          {
            name: 'file10.ext'
          }      
    ]
}];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-file-tree-view',
  templateUrl: './file-tree-view.component.html',
  styleUrls: ['./file-tree-view.component.css']
})
export class FileTreeViewComponent implements OnInit {
  selectedFile: String = "";
  isFileSelected = false;
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  
  constructor(private _filesService: FilesService) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  savePath() {
    this._filesService.addFilePath(this.selectedFile);
  }

  onFileSelection() {
    this.isFileSelected = true;
  }

  //TODO: Get Parent Nodes for selected file to show full path of it.

  ngOnInit() {
  }

}
