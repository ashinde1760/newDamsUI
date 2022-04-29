import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocManagmentComponent } from './navbar/doc-managment/doc-managment.component';
import { HomeComponent } from './navbar/home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SectionsComponent } from './navbar/sections/sections.component';
import { ViewDocumentComponent } from './navbar/view-document/view-document.component';

const routes: Routes = [
  {
    path:"",
    pathMatch:"full",
    component:HomeComponent
  },
  {
    path:"docManagement",
    component:DocManagmentComponent
  },
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"viewDoc",
    component:ViewDocumentComponent
  },
  {
    path:"sections",
    component:SectionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeadersRoutingModule { }
