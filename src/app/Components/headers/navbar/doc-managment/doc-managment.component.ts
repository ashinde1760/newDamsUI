import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlight'
})

export class HighlightSearch implements PipeTransform {

    transform(value: any, args: any): any {
        if (!args) {return value;}
        var re = new RegExp(args, 'gi'); //'gi' for case insensitive and can use 'g' if you want the search to be case sensitive.
        return value.replace(re, "<mark>$&</mark>");
    }
}




import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentUploadService } from 'src/app/Services/document-upload.service';
import { NewDocument } from './Document/Document';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-doc-managment',
  templateUrl: './doc-managment.component.html',
  styleUrls: ['./doc-managment.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class DocManagmentComponent implements OnInit {
  documents: any = [];
  selectedFiles?: FileList;
  currentFile?: File;
  uploadDialog: boolean = false;
  searchKeyword!:string;
  searchedData:any=[];
  docData!:NewDocument;
  uploadMessage!:string;


  constructor(
    private docService: DocumentUploadService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.docService.getDocuments().subscribe(
      (data:any) => {
         console.log(data.hits.hits);
        this.documents = data.hits.hits;
        console.log(this.documents);
      }
    );
  }

  onUpload() {
    this.docData={};
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
  }

  uploadFile() {
    this.uploadDialog = false;

    console.log('file upload from doc mgt component.ts');
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.docService.upload(this.currentFile).subscribe(
          (data: string) => {
            this.uploadMessage=data;
            console.log("This is the data",this.uploadMessage);
              this.messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: "this is from docmgtcomponent.ts",
            });
            this.ngOnInit();
          },
          (error: HttpErrorResponse) => {
            // this.messageService.add({
            //   severity: 'warn',
            //   summary: 'Cancelled',
            //   detail: 'File is not Uploaded',
            // });
            console.log(error);
            if(error.status===500)
            {
              this.messageService.add({
                  severity: 'warn',
                  summary: 'Cancelled',
                  detail: 'File is already present',
                });
            }
            
          }
        );
      }
    }
    this.ngOnInit();
  }

  onCancle() {
    this.uploadDialog = false;
  }

  search(){
    this.docService.search(this.searchKeyword).subscribe(
      (data: any) => {
        
        this.searchedData=data.hits.hits;
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
