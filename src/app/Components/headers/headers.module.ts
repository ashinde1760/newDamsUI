import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeadersRoutingModule } from './headers-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './navbar/home/home.component';
import {ButtonModule} from 'primeng/button';
import { DocManagmentComponent } from './navbar/doc-managment/doc-managment.component';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import {DialogModule} from 'primeng/dialog';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import { ViewDocumentComponent } from './navbar/view-document/view-document.component';
import {InputSwitchModule} from 'primeng/inputswitch';
import {TableModule} from 'primeng/table';
import { SectionsComponent } from './navbar/sections/sections.component';
import {TabViewModule} from 'primeng/tabview';

@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    DocManagmentComponent,
    ViewDocumentComponent,
    SectionsComponent
  ],
  imports: [
    CommonModule,
    HeadersRoutingModule,
    ButtonModule,
    ToolbarModule,
    FileUploadModule,
    HttpClientModule,
    CardModule,
    DialogModule,
    InputTextModule,
    TableModule,
    InputSwitchModule,
    TabViewModule
  ],
  exports:[
    NavbarComponent
  ]
})
export class HeadersModule { }
