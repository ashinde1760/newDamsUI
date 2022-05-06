import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Keyword } from '../Components/headers/navbar/sections/model/keyword';

@Injectable({
  providedIn: 'root'
})
export class DocumentUploadService {

  constructor(private http:HttpClient) { }

  getDocumentDetails()
  {
    return this.http.get("http://localhost:3000/documents");
  }

  addDocument(data:any)
  {
    return this.http.post("http://localhost:3000/documents",data)
  }

  getDocById(id:string)
  {
    return this.http.get(`http://localhost:3000/documents/${id}`)
  }

  getVersions(data:any)
  {
    return this.http.get<any>(`${environment.url + "/versions"}?document=${data.title}`);
  }

  getSections(version:string)
  {
    return this.http.get(`${environment.url + "/sections"}?version=${version}`)
  }


  addKeyword(keywordData:Keyword,section:string)
  {
    return this.http.post(`${environment.url + "/keywords"}`,keywordData);
  }

  getKeywords(section:string)
  {
    return this.http.get(`${environment.url + "/keywords"}?section=${section}`)
  }

  getEntities(section:string)
  {
    return this.http.get(`${environment.url + "/entities"}?section=${section}`)
  }

  changeStatus(status:any,version:any)
  {
    console.log(status);
    
    return this.http.put(`${environment.url + "/versions/versions/version/"}${version}`,status);
  }


  deleteKeyword(keyword:string,section:string)
  {
    alert(keyword +" where "+ section + " will be deleted")
    //return this.http.delete<any>(`${environment.url+"/keywords"}?section=${section}&keyword=${keyword}`);
    return this.http.delete<any>(`${environment.url}/keywords/${keyword}`);
  }

  addBookmark(sec:string,desc:string)
  {
    alert("akshay"+sec)
    return this.http.post('http://localhost:3000/bookmarks',sec)
  }
}
