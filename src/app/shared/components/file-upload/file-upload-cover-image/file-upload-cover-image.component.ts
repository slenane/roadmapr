import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  OnChanges,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ImageCropperModalComponent } from "../../image-cropper-modal/image-cropper-modal.component";
import { ProfileStoreService } from "src/app/profile/services/profile-store.service";

@Component({
  selector: "app-file-upload-cover-image",
  templateUrl: "./file-upload-cover-image.component.html",
  styleUrls: ["./file-upload-cover-image.component.scss"],
})
export class FileUploadCoverImageComponent implements OnInit, OnChanges {
  public image: string;

  @Input() data: any;

  constructor(
    private profileStoreService: ProfileStoreService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data.currentValue) this.image = changes.data.currentValue;
  }

  onFileSelected(event: any) {
    const dialogRef = this.dialog.open(ImageCropperModalComponent, {
      panelClass: "modal-class",
      autoFocus: false,
      data: {
        image: event,
        type: "cover",
      },
    });

    dialogRef.afterClosed().subscribe((image) => {
      if (image) {
        const formData = new FormData();
        formData.append("coverImage", image);
        console.log(image);

        this.profileStoreService.updateCoverImage(formData);
      }
    });
  }
}
