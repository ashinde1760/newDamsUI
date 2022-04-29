import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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

  getKeywords(section:string)
  {
    return this.http.get(`${environment.url + "/keywords"}?section=${section}`)
  }

  changeStatus(status:any,version:any)
  {
    console.log(status);
    
    return this.http.put(`${environment.url + "/versions/versions/version/"}${version}`,status);
  }
}
