import { Component } from '@angular/core';
import { Header } from "./header/header";
import { RouterOutlet } from '@angular/router';
import { SideBar } from "./side-bar/side-bar";
import { Footer } from "./footer/footer";

@Component({
  selector: 'app-shell',
  imports: [Header, RouterOutlet, SideBar, Footer],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {

}
