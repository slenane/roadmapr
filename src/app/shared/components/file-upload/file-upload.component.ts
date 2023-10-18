import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  OnChanges,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ImageCropperModalComponent } from "../image-cropper-modal/image-cropper-modal.component";
import { ProfileStoreService } from "src/app/profile/services/profile-store.service";

@Component({
  selector: "app-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.scss"],
})
export class FileUploadComponent implements OnInit, OnChanges {
  public fileName: string;
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
      maxHeight: "80vh",
      maxWidth: "80vw",
      data: event,
    });

    dialogRef.afterClosed().subscribe((image) => {
      if (image) {
        const formData = new FormData();
        formData.append("profileImage", image);

        this.profileStoreService.updateProfileImage(formData);
      }
    });
  }
}
