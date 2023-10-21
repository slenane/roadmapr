import { Component, OnInit, Inject } from "@angular/core";
import { ImageCroppedEvent } from "ngx-image-cropper";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-image-cropper-modal",
  templateUrl: "./image-cropper-modal.component.html",
  styleUrls: ["./image-cropper-modal.component.scss"],
})
export class ImageCropperModalComponent implements OnInit {
  public roundCropped: boolean = false;
  public aspectRatio: number = 26 / 8;
  public resizeToWidth: number = 512;
  public imageChangedEvent: any = "";
  public croppedImage: any = "";

  constructor(
    public dialogRef: MatDialogRef<ImageCropperModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data.type === "profile") {
      this.roundCropped = true;
      this.aspectRatio = 1 / 1;
      this.resizeToWidth = 256;
    }

    this.imageChangedEvent = this.data.image;
  }

  imageCropped(event: ImageCroppedEvent) {
    if (event.blob) {
      this.croppedImage = new File(
        [event.blob],
        this.data.image.target.files[0].name,
        {
          type: event.blob.type,
        }
      );
    }
  }
}
