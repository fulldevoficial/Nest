import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-toolbar',
  imports: [MatMenuModule, MatIconModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class ToolBar {
  items = [
    {name: 'Item 1'},
    {name: 'Item 2'},
    {name: 'Item 3'}
  ];
} 
