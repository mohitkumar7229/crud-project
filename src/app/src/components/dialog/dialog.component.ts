import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeFormSyntax } from '../../../model/Employee';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  employeeForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeFormSyntax | null
  ) {
    this.isEditMode = !!data;
    this.employeeForm = new FormGroup({
      employeeId: new FormControl(data?.employeeId || null),
      employeeName: new FormControl(data?.employeeName || '', [Validators.required]),
      emailId: new FormControl(data?.emailId || '', [Validators.required, Validators.email]),
      contactNumber: new FormControl(data?.contactNumber || '', [Validators.required]),
      city: new FormControl(data?.city || ''),
      state: new FormControl(data?.state || ''),
      pinCode: new FormControl(data?.pinCode || ''),
      address: new FormControl(data?.address || ''),
    });
  }

  onReset(): void {
    this.employeeForm.reset();
  }

  onSave(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }
    this.dialogRef.close(this.employeeForm.value);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
