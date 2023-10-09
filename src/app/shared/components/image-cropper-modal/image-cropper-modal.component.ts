import { Component, OnInit, Inject } from "@angular/core";
import { ImageCroppedEvent } from "ngx-image-cropper";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-image-cropper-modal",
  templateUrl: "./image-cropper-modal.component.html",
  styleUrls: ["./image-cropper-modal.component.scss"],
})
export class ImageCropperModalComponent implements OnInit {
  public imageChangedEvent: any = "";
  public croppedImage: any = "";

  constructor(
    public dialogRef: MatDialogRef<ImageCropperModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.imageChangedEvent = this.data;
  }

  imageCropped(event: ImageCroppedEvent) {
    if (event.blob) {
      this.croppedImage = new File(
        [event.blob],
        this.data.target.files[0].name,
        {
          type: event.blob.type,
        }
      );
    }
  }
}
