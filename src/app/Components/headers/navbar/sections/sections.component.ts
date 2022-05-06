import { Component, OnInit } from '@angular/core';
import { DocumentUploadService } from 'src/app/Services/document-upload.service';
import { Keyword } from './model/keyword';

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
  addKeywordDialog:boolean=false;
  sectionDialog:boolean=false;


  newKeyword!:Keyword;


  keywordData:any;

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
        this.keywords=data;
      },
      (error)=>{
        alert("something went wrong, please try again later...!!")
      }
    )

    this.docService.getEntities(this.section).subscribe(
      (data:any)=>{

        this.entities=data;
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


  bookmarkSection(section:string,desc:string){
    alert(section)
    this.bookmark=false;
    this.bookmark1=true;

    this.docService.addBookmark(section,desc).subscribe(
      (data)=>{
        console.log(data);
      },
      (error)=>{
        alert("something went wrong, please try again later");
      }
    )
  }

  bookmarkSection1(){
    this.bookmark1=false;
    this.bookmark=true;
  }

  editSetionDialog(){
    this.sectionDialog=true;
  }

  deleteKeyword(keyword:string,section:string)
  {
    this.docService.deleteKeyword(keyword,section).subscribe(
      (data)=>{
        console.log(data);
        
        this.ngOnInit();
      },
      (error)=>{
        alert("something went wrong...")
      }
    )
  }


  addKeyword(){
    this.newKeyword={};
    this.addKeywordDialog=true;
  }


  cancleDialog(){
    if(this.addKeywordDialog===true)
    {
      this.addKeywordDialog=false;
    }
    else if(this.sectionDialog===true)
    {
      this.sectionDialog=false;
    }
  }


  addNewKeyword(){
    this.docService.addKeyword(this.newKeyword,this.section).subscribe(
      (data)=>{
        console.log(data, "added successfully");
      },
      (error)=>{
        alert("something went wrong...")
      }
    )
  }
}
