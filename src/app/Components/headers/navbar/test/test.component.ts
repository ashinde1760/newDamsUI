import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  pdfSrc!:string;


  selectFile(event:any)
  {
    console.log(event);
    
  }


  onFileSelected() {
    let $img: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();
      console.log(reader);
      
      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
        console.log(this.pdfSrc);
        console.log(e.target+ "whole data");
        
        
      };
  
      reader.readAsArrayBuffer($img.files[0]);
    }
  }
}


