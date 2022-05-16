import { Component, OnInit } from '@angular/core';
import { DocumentUploadService } from 'src/app/Services/document-upload.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

constructor(private service: DocumentUploadService) { }

  ngOnInit(): void {
  }
}
