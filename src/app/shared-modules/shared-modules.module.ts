import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ButtonModule} from 'primeng/button';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import {DialogModule} from 'primeng/dialog';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {InputSwitchModule} from 'primeng/inputswitch';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import { RouterModule } from '@angular/router';
import { HeadersRoutingModule } from '../Components/headers/headers-routing.module';
import {DividerModule} from 'primeng/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
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
    TabViewModule,
    DividerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    CommonModule,
    RouterModule,
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
    TabViewModule,
    DividerModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModulesModule { }
