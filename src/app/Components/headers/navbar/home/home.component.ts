import { Component, OnInit } from '@angular/core';
import { DocumentUploadService } from 'src/app/Services/document-upload.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bookmarks:any=[];


  constructor(private service: DocumentUploadService) { }

  ngOnInit(): void {
    this.service.getBookmarks().subscribe(
      (data)=>{
        this.bookmarks=data;
        console.log(data,"bookmarked data");
      },
      (error)=>{
        alert("something went wrong, please try again later");
      }
    )
  }

}
