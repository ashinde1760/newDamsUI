import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentUploadService } from 'src/app/Services/document-upload.service';
import { NewDocument, NewSampleDoc } from './Document/Document';
import { ConfirmationService, MessageService } from 'primeng/api';
//for creating new doc
import * as docx from 'docx';
import { log } from 'console';
import { stringify } from 'querystring';

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
  docId!: string;

  createNewDocument: boolean = false;
  cols!: any[];
  newDocData!: string;
  newSampleDocData!: NewSampleDoc;

  updateDocDialog: boolean = false;

  constructor(
    private docService: DocumentUploadService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // to fetch all documents
    this.docService.getDocuments().subscribe((data: any) => {
      console.log(data);
      this.documents = data.hits.hits;
      console.log(this.documents);
    });
  }

  //It will open dialog box to upload new document
  onUpload() {
    this.docData = {};
    this.uploadDialog = true;
  }

  //Gets called after uploading a file
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  // It will upload a document
  uploadFile() {
    this.uploadDialog = false;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        this.docService.upload(this.currentFile).subscribe(
          (data: any) => {
            console.log(data);
            if (data.status === 200) {
              this.messageService.add({
                severity: 'success',
                summary: 'Confirmed',
                detail:
                  'File Uploaded successfully, refresh page to see document',
              });
              console.log('This is data docid ', data.body);
              this.docId = data.body;
              this.docService.getDocTerms(this.docId).subscribe((data: any) => {
                console.log("These are all tyhe terms of currently uploaded file ",data);
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

  //  This is for cancling dialog box
  onCancle() {
    this.uploadDialog = false;
    this.createNewDocument = false;
    this.updateDocDialog = false;
  }

  // It gets call by clicking on view button to view perticular document
  onClickView(docName: string) {
    console.log(docName, ' Name from docmgt components');
    localStorage.setItem('docName', JSON.stringify(docName));
    this.router.navigate(['/viewDoc']);
  }

  // It will open dialog box to create new document
  onClickCreateNew() {
    this.newSampleDocData = {};
    this.createNewDocument = true;
  }

  // This gets called after clicking on save button while creating new document
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

  // It will open a dialog box to update a document
  onClickUpdate(id: string) {
    console.log('this is product.id ', id);

    this.docId = id;
    this.updateDocDialog = true;
  }

  // To store updated file
  selectFile1(event: any): void {
    console.log(event.target.files);

    this.selectedFiles = event.target.files;
  }

  // for updating a file
  updateFile() {
    console.log('inside ts updateFile');

    this.updateDocDialog = false;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        this.docService.updateDocument(this.docId, this.currentFile).subscribe(
          (data: any) => {
            console.log(data);
            if (data.status === 200) {
              this.messageService.add({
                severity: 'info',
                summary: 'Confirmed',
                detail:
                  'File Updated successfully, refresh page to see document',
              });
            }
          },
          (error: HttpErrorResponse) => {
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'Somthing went wrong while updating file',
            });
          }
        );
      }
    }
  }
  
}
