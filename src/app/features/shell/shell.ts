import { Component } from '@angular/core';
import { ToolBar } from "../components/toolbar/toolbar";

@Component({
  selector: 'app-shell',
  imports: [ToolBar],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
  hasNotify = false;

  toggleNotify(e: boolean) {
    console.log(e);
    
    this.hasNotify = e;
  }
}
