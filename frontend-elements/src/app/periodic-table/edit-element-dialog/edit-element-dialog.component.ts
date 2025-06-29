import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodicElement } from '../../models/periodic-element.model';

@Component({
  selector: 'app-edit-element-dialog',
  standalone: false,
  templateUrl: './edit-element-dialog.component.html',
  styleUrls: ['./edit-element-dialog.component.scss']
})
export class EditElementDialogComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditElementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement
  ) {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      position: [{ value: this.data.position, disabled: true }],
      name: [this.data.name, [Validators.required]],
      weight: [this.data.weight, [Validators.required, Validators.min(0)]],
      symbol: [this.data.symbol, [Validators.required]]
    });
  }

  onSave(): void {
    if (this.form.valid) {
      console.log('Form is valid:', this.form.value);
      this.dialogRef.close(this.form.getRawValue());
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
