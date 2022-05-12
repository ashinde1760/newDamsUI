import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentUploadService } from 'src/app/Services/document-upload.service';

@Component({
  selector: 'app-doc-managment',
  templateUrl: './doc-managment.component.html',
  styleUrls: ['./doc-managment.component.css'],
})
export class DocManagmentComponent implements OnInit {
  documents: any = [];
  selectedFiles?: FileList;
  currentFile?: File;
  uploadDialog: boolean = false;
  searchKeyword!:string;
  constructor(
    private docService: DocumentUploadService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.docService.getDocumentDetails().subscribe(
      (data) => {
        console.log(data);
        this.documents = data;
      },
      (error) => {
        alert('somethig went wrong, please try again later...!!');
      }
    );
  }

  onUpload() {
    this.uploadDialog = true;
  }

  myUploader(event: any) {
    console.log(event);
    this.uploadDialog = true;
  }

  onClickDocument(id: string) {
    localStorage.setItem('documentID', id);
    this.router.navigate(['/viewDoc']);
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    console.log(event, 'akshay', event.target.files);
  }

  uploadFile() {
    console.log('file upload.....................');
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.docService.upload(this.currentFile).subscribe(
          (data: any) => {
            this.ngOnInit();
            alert('file uploaded successfully..!!');
          },
          (error: any) => {
            alert('something went wrong while uploading file...');
            this.currentFile = undefined;
          }
        );
      }
      this.selectedFiles = undefined;
    }
  }

  onCancle() {
    this.uploadDialog = false;
  }

  search(){
      this.docService.search(this.searchKeyword).subscribe(
          (data:any)=>{
            console.log(data);
          },
          (error:any)=>{
              alert("something went wrong while searching keyword, please try again later...!!");
          }
      )
  }
}
