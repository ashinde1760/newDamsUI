import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DocumentUploadService } from 'src/app/Services/document-upload.service';
import { Bookmark, Keyword } from './model/keyword';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class SectionsComponent implements OnInit {
  counter: number = 1;
  version!: string;
  section!: any;
  secDesc!: string;
  id!: string;

  keywords: any = [];
  sections: any = [];
  entities: any = [];

  sectionVersions: any = [];
  selectedVersion!: string;

  addKeywordDialog: boolean = false;
  sectionDialog: boolean = false;
  reviewerDialog: boolean = false;
  raiseQueryDialog: boolean = false;
  newKeyword!: Keyword;
  keywordData: any;
  allKeywords: boolean = false;
  SingleKeywordData!: Keyword;

  bookmark: boolean = false;
  bookmark1: boolean = true;
  bookmarkData!: Bookmark;

  selectedReviewer!: string;
  reviewers: any = [];

  versionSelected: boolean = false;
  position!: string;

  constructor(
    private docService: DocumentUploadService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.version = JSON.parse(JSON.stringify(localStorage.getItem('version')));
    this.section = localStorage.getItem('section');

    console.log(this.section);

    this.docService.getKeywords(this.section).subscribe(
      (data: any) => {
        console.log(data);

        this.secDesc = data[0].description;
        this.id = data[0].id;
        this.keywords = data;
        this.bookmark = data[0].bookmark;
      },
      (error) => {
        alert('something went wrong, please try again later...!!');
      }
    );

    this.docService.getEntities(this.section).subscribe(
      (data: any) => {
        this.entities = data;
      },
      (error) => {
        alert('something went wrong, please try again later...!!');
      }
    );

    this.docService.getReviwers().subscribe(
      (data: any) => {
        console.log(data, 'all reviewers');

        this.reviewers = data;
      },
      (error) => {
        alert("something went wrong while fetching reviewer's data");
      }
    );
  }

  onClickSection(section: string) {
    this.allKeywords = true;
  }

  onSelectVersion() {
    this.versionSelected = true;
  }

  bookmarkSection(section: string) {
    this.bookmarkData = {};

    if (this.bookmark === true) {
      this.docService.getKeywordById(this.id).subscribe(
        (data) => {
          this.SingleKeywordData = data;
          this.SingleKeywordData.bookmark = false;
          this.updateBookmark(this.id, this.SingleKeywordData);
        },
        (error) => {
          alert('something went wrong while fetching keyword by ID');
        }
      );
    } else {
      this.docService.getKeywordById(this.id).subscribe(
        (data) => {
          this.SingleKeywordData = data;
          this.SingleKeywordData.bookmark = true;
          this.updateBookmark(this.id, this.SingleKeywordData);
        },
        (error) => {
          alert('something went wrong while fetching keyword by ID');
        }
      );
    }
  }

  updateBookmark(id: string, data: Keyword) {
    this.docService.updateBookmark(id, data).subscribe(
      (data) => {
        console.log(data);
        this.ngOnInit();
      },
      (error) => {
        alert('something went wrong, please try again later');
      }
    );
  }

  bookmarkSection1() {
    this.bookmark1 = false;
    this.bookmark = true;
  }

  editSetionDialog() {
    this.sectionDialog = true;
  }

  deleteKeyword(position: string, id: number, section: string) {
    // alert(id + ' will get deleted where section is ' + section);
    // this.docService.deleteKeyword(id, section).subscribe(
    //   (data) => {
    //     console.log(data);

    //     this.ngOnInit();
    //   },
    //   (error) => {
    //     alert('something went wrong...');
    //   }
    // );

    this.position = position;

    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.docService.deleteKeyword(id, section).subscribe((data) => {
          this.messageService.add({
            severity: 'info',
            summary: 'Confirmed',
            detail: 'Record deleted',
          });
          this.ngOnInit();
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Cancelled',
          detail: 'Record is not deleted',
        });
      },

      key: 'positionDialog',
    });
  }



  deleteEntity(position:string,id: string) {
    // this.docService.deleteEntity(id).subscribe(
    //   (data: any) => {
    //     alert('entity deleted successfully...');
    //     this.ngOnInit();
    //   },
    //   (error) => {
    //     alert('something went wrong while deleting entity');
    //   }
    // );

    this.position = position;

    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.docService.deleteEntity(id).subscribe(
          (data) => {
            this.messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Record deleted',
            });
            this.ngOnInit();
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Cancelled',
          detail: 'Record not deleted',
        });
      },

      key: 'positionDialog',
    });

  }

  addKeyword() {
    this.newKeyword = {};
    this.addKeywordDialog = true;
  }

  cancleDialog() {
    if (this.addKeywordDialog === true) {
      this.addKeywordDialog = false;
    } else if (this.sectionDialog === true) {
      this.sectionDialog = false;
    } else if (this.reviewerDialog === true) {
      this.reviewerDialog = false;
    } else if (this.raiseQueryDialog === true) {
      this.raiseQueryDialog = false;
    }
  }

  addNewKeyword() {
    this.addKeywordDialog = false;
    this.newKeyword.section = this.section;

    this.docService.addKeyword(this.newKeyword).subscribe(
      (data) => {
        console.log(data, 'added successfully');
        this.ngOnInit();
      },
      (error) => {
        alert('something went wrong...');
      }
    );
  }

  onSubmit() {
    this.reviewerDialog = true;
  }

  raiseQuery() {
    this.raiseQueryDialog = true;
  }

  
}
