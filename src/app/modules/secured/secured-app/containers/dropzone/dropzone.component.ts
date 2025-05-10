import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrl: './dropzone.component.scss',
  standalone: false,
})
export class DropzoneComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

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
      console.log(this.fileName)
      //TODO Handle the CSV file (e.g., parse or upload)
    } else {
      this.fileName = null;
      this.errorMessage = 'Only CSV files are allowed.';
    }
  }
}
