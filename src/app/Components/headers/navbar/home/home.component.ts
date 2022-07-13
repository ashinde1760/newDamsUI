import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentUploadService } from 'src/app/Services/document-upload.service';
import { saveAs } from 'file-saver';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class HomeComponent implements OnInit {
  documents: any = [];
  selectedFiles?: FileList;
  currentFile?: File;
  uploadDialog: boolean = false;
  searchKeyword!: string;
  uploadMessage!: string;
  viewDoc: boolean = false;
  allKeyWords: any = [];

  searchedData: any = [];
  constructor(
    private docService: DocumentUploadService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    //akshay
    this.docService.getDocuments().subscribe((data: any) => {
      console.log(data.hits.hits);
      this.documents = data.hits.hits;
      console.log(this.documents);
    });
    //Tasdiq
    this.docService.getAllApprovedKeywords().subscribe((keyWordsData: any) => {
      this.allKeyWords = keyWordsData;
      console.log('Got the data ', this.allKeyWords);
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

  keywordSearch(keyword: string) {
    this.searchKeyword = keyword;
    this.search();
  }
  search() {
    this.docService.search(this.searchKeyword).subscribe(
      (data: any) => {
        this.searchedData = data;
        console.log(this.searchedData);
      },
      (error: any) => {
        alert(
          'something went wrong while searching keyword, please try again later...!!'
        );
      }
    );
  }

  onViewDoc() {
    this.viewDoc = true;
  }

  downloadDoc(docId: string) {
    this.docService.download(docId).subscribe((event: any) => {
      saveAs(event, docId);
    });
    (error: HttpErrorResponse) => {
      console.log(error);
    };
  }

  searchedDoc: boolean = false;
  fileData!: string;
  fileName!: string;
  docId!: string;
  viewSearchedDoc(data: any) {
    this.fileData = data.Content;
    this.docId = data.id;
    this.fileName = data.Name.split('.').slice(0, -1).join('.');
    this.searchedDoc = true;
  }

  bookmark: boolean = false;
  bookmark1: boolean = true;
  bookmarkSection() {
    if (this.bookmark == true) {
      this.bookmark = false;
    } else {
      this.bookmark = true;
    }
  }

  aaa: boolean = false;
  onRightClick(event: any, id: string) {
    event.preventDefault();
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete Keyword?',
      accept: () => {
        this.docService.deleteKeyword(id).subscribe(
          (data: any) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Deleted',
              detail: 'Keyword deleted successfully',
            });
            this.ngOnInit();
          },
          (error: HttpErrorResponse) => {
            alert(error);
          }
        );
      },
      reject: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Cancelled',
          detail: 'Keyword not deleted',
        });
      },
    });
  }
}
