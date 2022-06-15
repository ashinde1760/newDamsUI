import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DocumentUploadService } from 'src/app/Services/document-upload.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class BookmarksComponent implements OnInit {
  bookmarks: any = [];

  constructor(
    private service: DocumentUploadService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.versionDocData={}
    this.service.getBookmarks().subscribe(
      (data) => {
        this.bookmarks = data;
        console.log(data, 'bookmarked data');
      },
      (error) => {
        alert('something went wrong, please try again later');
      }
    );
  }

  download(id: string) {
    this.service.download(id).subscribe(
      (event: any) => {
        saveAs(event, id);
        // if(data.status===200)
        // {
        //   this.messageService.add({
        //     severity: 'success',
        //     summary: 'Confirmed',
        //     detail:
        //       'File Uploaded successfully, refresh page to see document',
        //   });
        // }
      },
      (error: HttpErrorResponse) => {}
    );
  }

  cancleBookmark(id: string) {
    this.service.addBookmarks(id).subscribe(
      (data: any) => {
        this.ngOnInit();
        
      },
      (error: any) => {}
    );
  }

  docView: boolean = false;
  versionDocName!:string;
  versionDocData!:any;
  onClickViewDoc(data:any) {

    console.log(data,"anemoi");
    this.versionDocData=data;
    this.versionDocName=data.docName.split('.').slice(0, -1).join('.')
    this.docView = true;
    // this.openTemplate();
  }
}
