import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewDocument, NewSampleDoc } from '../Components/headers/navbar/doc-managment/Document/Document';
import { Keyword } from '../Components/headers/navbar/sections/model/keyword';

@Injectable({
  providedIn: 'root',
})
export class DocumentUploadService {
  constructor(private http: HttpClient) {}

  getAllApprovedKeywords(){
    return this.http.get(`${environment.url1}/approvedkeywords`);
  }

  getDocTerms(id: string) {
    return this.http.get(`${environment.url1}/getTermVector/${id}`);
  }

  getDocumentDetails() {
    return this.http.get('http://localhost:3000/documents');
    // return this.http.get(`${environment.url1}/searchall`);

  }

  getDocuments() {
    return this.http.get(`${environment.url1}/getByRepo`);
  }

  addDocument(data: any) {
    return this.http.post('http://localhost:3000/documents', data);
  }

  getDocByName(docName: string) {
    return this.http.get(`${environment.url1 + '/getDocByName'}/${docName}`);
  }

  getVersions(data: any) {
    return this.http.get<any>(
      `${environment.url + '/versions'}?document=${"Proposal for CIT Project"}`
    );
  }

  // getSections(version: string) {
  //   return this.http.get(`${environment.url + '/sections'}?version=${version}`);
  // }

  getKeywords(section: string) {
    return this.http.get(`${environment.url + '/keywords'}?section=${section}`);
  }

  getEntities(section: string) {
    return this.http.get(`${environment.url + '/entities'}?section=${section}`);
  }

  changeStatus(status: any, version: any) {
    console.log(status);

    return this.http.put(
      `${environment.url + '/versions/versions/version/'}${version}`,
      status
    );
  }

  deleteKeyword(id: number, section: string) {
    return this.http.delete<any>(
      `${environment.url}/keywords/${id}?section=${section}`
    );
  }

  addKeyword(keywordData: any) {
    return this.http.post(`${environment.url + '/keywords'}`, keywordData);
  }

  getKeywordById(id: string) {
    return this.http.get(`${environment.url}/keywords/${id}`);
  }

  addBookmarks(id:string) {
    console.log(id);
    
    return this.http.post(`${environment.url1 + '/setbookmark/'}${id}`,id);
  }


  updateBookmark(id: string, data: any) {
    return this.http.put(`${environment.url}/keywords/${id}`, data);
  }

  updateBookmark1(id: string) {
    return this.http.put(`${environment.url}/keywords/${id}`,id);
  }
  
  getBookmarks() {
    return this.http.get(`${environment.url1 + '/getbookmark'}`);
  }



  getBookmarksBySection(section: string) {
    return this.http.get(
      `${environment.url + '/bookmarks'}?section=${section}`
    );
  }

  getReviwers() {
    return this.http.get(`${environment.url}/reviewer`);
  }

  deleteEntity(id: string) {
    return this.http.delete(`${environment.url}/entities/${id}`);
  }

  upload(file: File): any {
    
    console.log("This is file from service.ts",file);
    
    const formData: any = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${environment.url1}/saveFile`, formData, {
      
    });

    return this.http.request(req);

    // return this.http.post(`${environment.url1}/uploading`,file);
  }


  search(keyword:string)
  {
    return this.http.get(`${environment.url1}/getHighlightedValue/${keyword}`);
  }


  createNewDoc(newDocData:NewSampleDoc)
  {
    console.log(newDocData);
    
    return this.http.post(`${environment.url1 + '/newDoc'}`,newDocData);
  }

  updateDocument(id:string, file: File)
  {
    console.log(id,"id of same doc");
    
    const formData: any = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${environment.url1}/updateDoc/${id}`, formData, {
      
    });

    return this.http.request(req);
  }



  download(docId: string){
    console.log("got the id in service ",docId);
    return this.http.get(`${environment.url1}/downloadFile/${docId}`, {
      reportProgress: true,
      // observe: 'events',
      responseType: 'blob'
    });
  }


  getSections(id:string)
  {
    return this.http.get(`${environment.url1}/getAllSections/${id}`);
  }

  downloadSection(secId:string)
  {
    return this.http.get(`${environment.url1}/downloadFile/${secId}`, {
      reportProgress: true,
      // observe: 'events',
      responseType: 'blob'
    });
  }

  downloadSec(docId: string){
    console.log("got the id in service ",docId);
    return this.http.get(`${environment.url1}/downloadSec/${docId}`, {
      reportProgress: true,
      // observe: 'events',
      responseType: 'blob'
    });
  }


}
