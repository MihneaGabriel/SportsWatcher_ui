import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { DropzoneData } from '../../models/dropzone.model';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrl: './dropzone.component.scss',
  standalone: false,
})
export class DropzoneComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @Output() dropzoneData = new EventEmitter<DropzoneData>();

  isDragging = false;
  fileName: string | null = null;
  errorMessage: string | null = null;

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;

    const file = event.dataTransfer?.files?.[0];
    this.handleFile(file);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    this.handleFile(file);
  }

  handleFile(file: File | undefined) {
    if (file && file.name.endsWith('.csv')) {
      this.fileName = file.name;

      const data: DropzoneData = {
        fileName: file,
        isValid: true
      };
      this.dropzoneData.emit(data);
    } else {
      this.fileName = null;

      const data: DropzoneData = {
        fileName: null,
        isValid: false
      };
      this.dropzoneData.emit(data);
      this.errorMessage = 'Only CSV files are allowed.';
    }
  }
}
