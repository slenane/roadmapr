// import { HttpClient, HttpEventType } from "@angular/common/http";
// import { Component, Input, OnInit } from "@angular/core";
// import { Subscription, finalize } from "rxjs";

// @Component({
//   selector: "app-file-upload",
//   templateUrl: "./file-upload.component.html",
//   styleUrls: ["./file-upload.component.scss"],
// })
// export class FileUploadComponent implements OnInit {
//   public fileName: string;
//   public uploadProgress: any;
//   public uploadSub: Subscription | any;

//   @Input() data: any;

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {}

//   onFileSelected(event: any) {
//     console.log(event);

//     const file: File = event.target.files[0];
//     if (file) {
//       this.fileName = file.name;
//       const formData = new FormData();
//       formData.append("profileImage", file);

//       const upload$ = this.http
//         .post("/api/thumbnail-upload", formData, {
//           reportProgress: true,
//           observe: "events",
//         })
//         .pipe(finalize(() => this.reset()));

//       this.uploadSub = upload$.subscribe((event: any) => {
//         if (event.type == HttpEventType.UploadProgress) {
//           this.uploadProgress = Math.round(100 * (event.loaded / event.total));
//         }
//       });
//     }
//   }

//   cancelUpload() {
//     this.uploadSub.unsubscribe();
//     this.reset();
//   }

//   reset() {
//     this.uploadProgress = null;
//     this.uploadSub = undefined;
//   }
// }
