import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  imports: [],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss',
})
export class Dialog {

  @Input() titulo = '';
  @Input() mensagem = '';
  @Input() error = false;
  @Output() closeDialog = new EventEmitter<boolean>(false);

  toggleCloseDialog(): void {
    this.closeDialog.emit(false);
  }

}
