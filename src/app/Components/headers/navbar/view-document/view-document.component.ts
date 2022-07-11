import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentUploadService } from 'src/app/Services/document-upload.service';
import { saveAs } from 'file-saver';
import { Url } from 'url';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class ViewDocumentComponent implements OnInit {
  documentData: any = [];
  documentData1: any;
  docName!: string;
  versions: any = [];
  docVersion!: string;
  sections: any = [];
  checked: boolean = true;
  stateOptions: any[];

  version: boolean = false;
  serviceLink = 'http://localhost:8443/Business Devlopment guide.docx';
  container: any;
  constructor(
    private docService: DocumentUploadService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.stateOptions = [
      { label: 'Inactive', value: 'Inactive' },
      { label: 'Active', value: 'Active' },
    ];
  }
  public innerWidth: any;
  ngOnInit(): void {
    this.versionDocData = {};
    this.versionSecData = {};
    this.documentData1 = {};
    this.docName = JSON.parse(localStorage.getItem('docName') || '{}');
    console.log(this.docName);

    this.docService.getDocByName(this.docName).subscribe(
      (data: any) => {
        console.log(data);

        this.documentData = data;
        this.documentData1 = data[data.length - 1];
        console.log(this.documentData1, 'akshay');
        this.bookmark = this.documentData1.bookmarked;

        this.versionDocName = this.documentData1.docName
          .split('.')
          .slice(0, -1)
          .join('.');
        // console.log(this.documentData);
        // this.getVersions(this.documentData);

        console.log(this.documentData);
      },
      (error) => {
        alert('something went wrong...!!');
      }
    );
  }

  getVersions(data: any) {
    this.docService.getVersions(data).subscribe(
      (data) => {
        console.log(data, 'data by doc version');
        this.versions = data[0].versions;
      },
      (error) => {
        alert('something went wrong, please try again later...!!');
      }
    );
  }

  onClickVesrion1() {
    this.version = true;
  }

  versionActivation() {
    this.checked = true;
  }

  onClickSection(section: string) {
    localStorage.setItem('section', section);
    this.router.navigate(['/sections']);
  }


  // To download document
  downloadDoc(docId: string) {
    this.docService.download(docId).subscribe((event: any) => {
      saveAs(event, docId);
    });
    (error: HttpErrorResponse) => {
      console.log(error);
    };
  }


  // To view document
  fileUrl!: string;
  docView: boolean = false;
  versionDocName!: string;
  versionDocData!: any;
  onClickViewDoc(data: any) {
    console.log(data, 'anemoi');
    this.fileUrl = this.serviceLink;
    this.versionDocData = data;
    this.versionDocName = data.docName.split('.').slice(0, -1).join('.');
    this.docView = true;
  }

  // To bookmark doc
  bookmark: boolean = false;
  bookmark1: boolean = true;
  bookmarkSection(id: string) {
    this.docService.addBookmarks(id).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }


  // To get sections
  sectionData: any;
  sectionView: boolean = false;
  onClickViewSection(id: string) {
    this.docService.getSections(id).subscribe(
      (data: any) => {
        this.sectionData = data;
        console.log(data);
        this.sectionView = true;
      },
      (error: HttpErrorResponse) => {
        alert('something went wrong');
      }
    );
  }



  // To view sections
  secView: boolean = false;
  versionSecName!: string;
  versionSecData!: any;
  onClickViewSec(data: any) {
    this.versionSecData = data;
    this.versionSecName = data.docName.split('.').slice(0, -1).join('.');
    this.secView = true;
    alert(this.secView)
    // this.openTemplate();
  }

  downloadSec(docId: string) {
    this.docService.downloadSec(docId).subscribe((event: any) => {
      saveAs(event, docId);
    });
    (error: HttpErrorResponse) => {
      console.log(error);
    };
  }
}
