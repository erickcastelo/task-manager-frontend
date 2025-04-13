import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confim-dialog',
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './confim-dialog.component.html',
  styleUrl: './confim-dialog.component.scss',
})
export class ConfimDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfimDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}

  public onConfirm(): void {
    this.dialogRef.close(true);
  }

  public onCancel(): void {
    this.dialogRef.close(false);
  }
}
