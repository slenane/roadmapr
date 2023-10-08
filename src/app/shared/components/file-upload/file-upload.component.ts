import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  OnChanges,
} from "@angular/core";
import { ProfileService } from "src/app/profile/services/profile.service";

@Component({
  selector: "app-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.scss"],
})
export class FileUploadComponent implements OnInit, OnChanges {
  public fileName: string;
  public image: string;

  @Input() data: any;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.data);
    if (changes.data.currentValue) this.image = changes.data.currentValue;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profileImage", file);

      this.profileService
        .updateProfileImage(formData)
        .pipe()
        .subscribe((res) => {
          if (res.profileImage) this.image = res.profileImage;
        });
    }
  }
}
