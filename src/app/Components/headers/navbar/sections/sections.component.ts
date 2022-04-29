import { Component, OnInit } from '@angular/core';
import { DocumentUploadService } from 'src/app/Services/document-upload.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {

  counter:number=1;
  version!:string;
  section!:any;
  secDesc!:string;
  keywords:any=[];
  sections:any=[];
  entities:any=[];
  sectionVersions:any=[];
  selectedVersion!:string;
  bookmark:boolean=true;

  sectionDialog:boolean=false;


  bookmark1:boolean=false;


  allKeywords:boolean=false;
  versionSelected:boolean=false;


  constructor(private docService:DocumentUploadService) { }

  ngOnInit(): void {
    this.version=JSON.parse(JSON.stringify(localStorage.getItem("version")));
    this.section=localStorage.getItem('section');

    console.log(this.section);
    

    this.docService.getKeywords(this.section).subscribe(
      (data:any)=>{
        console.log(data);
        this.secDesc=data[0].description;
        this.keywords=data[0].keywords;
        this.entities=data[0].entities;
        this.sectionVersions=data[0].versions;
      },
      (error)=>{
        alert("something went wrong, please try again later...!!")
      }
    )
  }

  onClickSection(section:string)
  {
    this.allKeywords=true;
    
  }

  onSelectVersion(){
    this.versionSelected=true;
  }


  bookmarkSection(){
    this.bookmark=false;
    this.bookmark1=true;
  }

  bookmarkSection1(){
    this.bookmark1=false;
    this.bookmark=true;
  }

  editSetionDialog(){
    this.sectionDialog=true;
  }

}
