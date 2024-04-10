import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {MatOption, MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-modal-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    FormsModule,
    MatButton,
    MatInput,
    NgForOf,
    MatSelect,
    MatOption,
    NgIf
  ],
  templateUrl: './modal-dialog.component.html',
  styleUrl: './modal-dialog.component.css'
})
export class ModalDialogComponent {
  inputData: any = {};
  title: any = "Input";
  private intervalId: number;

  constructor(
    public dialogRef: MatDialogRef<ModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string,
      buttons: [{text: string, ref: any}],
      fields: [{
        name: string,
        type: string,
        placeholder: string,
        optionSupplier?: any,
        options?: any,
        multiSelectSupplier?: any,
        multiSelectOptions?: any,
        value?: any
      }]
    }) {
    this.title = data.title;
    this.data.fields.forEach((field: any) => {
      if (field.optionSupplier) {
        field.optionSupplier().then((data: any) => field.options = data);
      }

      if (field.multiSelectSupplier) {
        field.multiSelectSupplier().then((data: any) => field.multiSelectOptions = data);
      }

      if (field.value) {
        this.inputData[field.name] = field.value;
      } else {
        this.inputData[field.name] = field.defaultValue || '';
      }

    });

    this.intervalId = setInterval(() => {
      this.data.fields.forEach((field: any) => {
        if (field.optionSupplier) {
          field.optionSupplier().then((data: any) => field.options = data);
        }

        if (field.multiSelectSupplier) {
          field.multiSelectSupplier().then((data: any) => field.multiSelectOptions = data);
        }
      });
    }, 1000)
  }

  async renewOptions(ref: any) {
    ref()
  }

  onSubmit(): void {
    clearInterval(this.intervalId);
    this.dialogRef.close(this.inputData);
  }

  onCancel(): void {
    clearInterval(this.intervalId);
    this.dialogRef.close();
  }
}
