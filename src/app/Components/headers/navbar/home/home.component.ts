import { Pipe, PipeTransform } from '@angular/core';

// For highlighting keywords
@Pipe({
  name: 'highlight',
})
export class HighlightSearch implements PipeTransform {
  transform(value: any, args: any): any {
    if (!args) {
      return value;
    }
    var re = new RegExp(args, 'gi'); //'gi' for case insensitive and can use 'g' if you want the search to be case sensitive.
    return value.replace(re, '<mark>$&</mark>');
  }
}






import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentUploadService } from 'src/app/Services/document-upload.service';
import { saveAs } from 'file-saver';


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
  viewDoc:boolean=false;

  searchedData: any = [];
  constructor(
    private docService: DocumentUploadService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.docService.getDocuments().subscribe((data: any) => {
      console.log(data.hits.hits);
      this.documents = data.hits.hits;
      console.log(this.documents);
    });
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
            alert('file uploaded successfully..!!');
            console.log('This is data' + data);
          },
          (error: HttpErrorResponse) => {
            alert('something went wrong while uploading file...');
            console.log(error);
          }
        );
      }
    }
  }

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


  onViewDoc(){
    this.viewDoc=true;
  }

  downloadDoc(docId: string) {
    this.docService.download(docId).subscribe((event: any) => {
      saveAs(event, docId);
    });
    (error: HttpErrorResponse) => {
      console.log(error);
    };
  }

  searchedDoc:boolean=false;
  fileData!:string;
  fileName!:string;
  viewSearchedDoc(data:any)
  {
    this.fileData=data.Content;
    this.fileName=data.Name.split('.').slice(0, -1).join('.');
    this.searchedDoc=true;
  }

  bookmark: boolean = false;
  bookmark1: boolean = true;
  bookmarkSection() {

      if(this.bookmark==true)
      {
        this.bookmark=false;
      }
      else{
        this.bookmark=true;
      }
  }

}
