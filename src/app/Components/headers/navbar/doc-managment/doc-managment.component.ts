import { Pipe, PipeTransform } from '@angular/core';

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
import { NewDocument, NewSampleDoc } from './Document/Document';
import { ConfirmationService, MessageService } from 'primeng/api';
//for creating new doc
import * as docx from 'docx';

@Component({
  selector: 'app-doc-managment',
  templateUrl: './doc-managment.component.html',
  styleUrls: ['./doc-managment.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class DocManagmentComponent implements OnInit {
  documents: any = [];
  selectedFiles?: FileList;
  currentFile?: File;
  uploadDialog: boolean = false;
  searchKeyword!: string;
  searchedData: any = [];
  docData!: NewDocument;

  createNewDocument: boolean = false;
  cols!: any[];
  newDocData!: string;
  newSampleDocData!: NewSampleDoc;

  updateDocDialog:boolean=false;
  docId!:string;

  constructor(
    private docService: DocumentUploadService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.docService.getDocuments().subscribe((data: any) => {
      console.log(data);
      this.documents = data.hits.hits;
      console.log(this.documents);
    });

    this.cols = [
      { field: 'documents.sourceAsMap.Name', header: 'Document Name' },
      { field: 'documents.sourceAsMap.timestamp', header: 'Timestamp' },
    ];
  }

  onUpload() {
    this.docData = {};
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
    console.log(event.target.files);

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
          (data: any) => {
            console.log(data);
            if (data.status === 201) {
              this.messageService.add({
                severity: 'info',
                summary: 'Confirmed',
                detail:
                  'File Uploaded successfully, refresh page to see document',
              });
            }
          },
          (error: HttpErrorResponse) => {
            if (error.status === 304) {
              this.messageService.add({
                severity: 'warn',
                summary: 'Cancelled',
                detail: 'File is already exist',
              });
            } else {
              this.messageService.add({
                severity: 'warn',
                summary: 'Cancelled',
                detail: 'Somthing went wrong while uploading file',
              });
            }
          }
        );
      }
    }
  }

  onCancle() {
    this.uploadDialog = false;
    this.createNewDocument = false;
    this.updateDocDialog=false;
  }

  search() {
    this.docService.search(this.searchKeyword).subscribe(
      (data: any) => {
        this.searchedData = data.hits.hits;
        console.log(this.searchedData);
      },
      (error: any) => {
        alert(
          'something went wrong while searching keyword, please try again later...!!'
        );
      }
    );
  }

  onClickView(docName: string) {
    console.log(docName);
    localStorage.setItem('docName', JSON.stringify(docName));
    this.router.navigate(['/viewDoc']);
  }

  onClickCreateNew() {
    this.newSampleDocData = {};
    this.createNewDocument = true;
  }

  saveData() {
    this.docService.createNewDoc(this.newSampleDocData).subscribe(
      (data: any) => {
        if (data.status === 201) {
          this.messageService.add({
            severity: 'success',
            summary: 'Confirmed',
            detail: 'New doc created successfuly',
          });
        }
      },
      (error: HttpErrorResponse) => {
        if (error.status === 304) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Cancelled',
            detail: 'File is already exist',
          });
        } else {
          this.messageService.add({
            severity: 'warn',
            summary: 'Cancelled',
            detail: 'Somthing went wrong while creating new file',
          });
        }
      }
    );
  }

  //for creating new doc file
  // name = 'Angular';
  // onClickCreateNew1() :void{
  //   const documentCreator = new DocumentCreator();
  //   const doc = documentCreator.create([
  //     experiences,
  //     education,
  //     skills,
  //     achievements
  //   ]);

  //   Packer.toBlob(doc).then(blob => {
  //     console.log(blob);
  //     saveAs(blob, "example.docx");
  //     console.log("Document created successfully");
  //   });
  // }


  onClickUpdate(id:string)
  {
    this.docId=id;
    this.updateDocDialog=true;
  }

  selectFile1(event: any): void {
    console.log(event.target.files);

    this.selectedFiles = event.target.files;
  }


  updateFile() {
    this.uploadDialog = false;

    console.log('file upload from doc mgt component.ts');
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        this.docService.updateDocument(this.docId,this.currentFile).subscribe(
          (data: any) => {
            console.log(data);
            if (data.status === 201) {
              this.messageService.add({
                severity: 'info',
                summary: 'Confirmed',
                detail:
                  'File Updated successfully, refresh page to see document',
              });
            }
          },
          (error: HttpErrorResponse) => {
            if (error.status === 304) {
              this.messageService.add({
                severity: 'warn',
                summary: 'Cancelled',
                detail: 'File is already exist',
              });
            } else {
              this.messageService.add({
                severity: 'warn',
                summary: 'Cancelled',
                detail: 'Somthing went wrong while updating file',
              });
            }
          }
        );
      }
    }
  }
}
