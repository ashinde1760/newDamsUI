import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentUploadService } from 'src/app/Services/document-upload.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  documents: any = [];
  selectedFiles?: FileList;
  currentFile?: File;
  uploadDialog: boolean = false;
  searchKeyword!: string;
  uploadMessage!:string;

  searchedData:any=[];
  constructor(
    private docService: DocumentUploadService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.docService.getDocuments().subscribe(
      (data:any) => {
        // console.log(data);
        // this.documents = data;

        console.log(data.hits.hits);
        this.documents = data.hits.hits;
        console.log(this.documents);
      }
      // },
      // (error) => {
      //   alert('somethig went wrong while fetching all the documents, please try again later...!!');
      // }
    );
  }

  onUpload() {
    this.uploadDialog = true;
  }

  myUploader(event: any) {
    console.log(event);
    this.uploadDialog = true;
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    console.log(event, 'akshay', event.target.files);
  }

  uploadFile() {
    this.uploadDialog = false;
    console.log('file upload from home component');
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.docService.upload(this.currentFile).subscribe(
          (data: any) => { 
            // this.uploadMessage=data;
            console.log("This is real data ",data);
            // console.log("This is data",this.uploadMessage);
          },
          (error: HttpErrorResponse) => {
            alert('something went wrong while uploading file...');
            
          }
        );
      }
    }
  }


  // uploadFile() {
  //   console.log('file upload.....................');
  //   if (this.selectedFiles) {
  //     const file: File | null = this.selectedFiles.item(0);

  //     if (file) {
  //       this.currentFile = file;

  //       this.docService.upload(this.currentFile).subscribe(
  //         (data: any) => {
  //           alert('file uploaded successfully..!!');
  //           console.log('This is data' + data);
  //         },
  //         (error: HttpErrorResponse) => {
  //           alert('something went wrong while uploading file...');
  //           console.log(error);
  //         }
  //       );
  //     }
  //   }
  // }

  onCancle() {
    this.uploadDialog = false;
  }

  search() {
    this.docService.search(this.searchKeyword).subscribe(
      (data: any) => {
        
        this.searchedData=data;
        console.log(this.searchedData);
      },
      (error: any) => {
        alert(
          'something went wrong while searching keyword, please try again later...!!'
        );
      }
    );
  }



}
