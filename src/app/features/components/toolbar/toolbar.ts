import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { UserLogged } from '@app/core/interfaces/login.types';
import { UserService } from '@app/core/services/user-service';

@Component({
  selector: 'app-toolbar',
  imports: [MatMenuModule, MatIconModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class ToolBar implements OnInit {
  @Output() notifyChange = new EventEmitter<boolean>(false);
  private userService = inject(UserService);
  userLogged: UserLogged | null = null;
  users: UserLogged[] = [];

  ngOnInit(): void {
    this.userLogged = null;
  }

  items = [{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3' }];

  isNotified = false;

  toggleNotify() {
    this.isNotified = !this.isNotified;
    this.notifyChange.emit(this.isNotified);
  }
}
