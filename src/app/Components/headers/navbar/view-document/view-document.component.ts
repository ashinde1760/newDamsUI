import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentUploadService } from 'src/app/Services/document-upload.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.css'],
})
export class ViewDocumentComponent implements OnInit {
  documentData: any=[];
  documentData1: any;
  docName!: string;
  versions: any=[];
  docVersion!: string;
  sections: any = [];
  checked: boolean = true;
  stateOptions: any[];

  constructor(
    private docService: DocumentUploadService,
    private router: Router
  ) {
    this.stateOptions = [
      { label: 'Inactive', value: 'Inactive' },
      { label: 'Active', value: 'Active' },
    ];
  }
  public innerWidth: any;
  ngOnInit(): void {
    this.documentData1={};
    this.docName = JSON.parse(localStorage.getItem('docName') || '{}');
    console.log(this.docName);

    this.docService.getDocByName(this.docName).subscribe(
      (data: any) => {
        console.log(data);
        
        this.documentData = data;
        this.documentData1 = data[0];

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

  onClickVesrion(version: string) {
    this.docVersion = version;
    localStorage.setItem('version', version);

    this.docService.getSections(version).subscribe((data: any) => {
      console.log(data, 'anemoi');

      this.sections = data[0].sections;
    });

    //this.router.navigate(["/sections"]);
  }

  versionActivation() {
    this.checked = true;
  }

  onClickSection(section: string) {
    localStorage.setItem('section', section);
    this.router.navigate(['/sections']);
  }

  downloadDoc(docId:string)
  {
    this.docService.download(docId).subscribe((event:any) => {
      saveAs(event, docId);
    });
    (error: HttpErrorResponse) => {
      console.log(error);
    };
  }
}
