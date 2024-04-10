import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private dialog: MatDialog) {}

  openModal(title: string, fields: any[], buttons: any[] = []): MatDialogRef<ModalDialogComponent> {
    return this.dialog.open(ModalDialogComponent, {
      data: {
        title: title,
        fields: fields,
        buttons: buttons
      }
    });
  }
}
