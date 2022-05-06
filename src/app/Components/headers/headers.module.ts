import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './navbar/home/home.component';
import { DocManagmentComponent } from './navbar/doc-managment/doc-managment.component';
import { ViewDocumentComponent } from './navbar/view-document/view-document.component';
import { SectionsComponent } from './navbar/sections/sections.component';
import { SharedModulesModule } from 'src/app/shared-modules/shared-modules.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    DocManagmentComponent,
    ViewDocumentComponent,
    SectionsComponent,
  ],
  imports: [
    CommonModule,
    SharedModulesModule,
    RouterModule.forChild([
      {
        path: '',
        component: NavbarComponent,
        children: [
          {
            path: 'home',
            component: HomeComponent,
          },
          {
            path: 'docManagement',
            component: DocManagmentComponent,
          },
          {
            path: 'viewDoc',
            component: ViewDocumentComponent,
          },
          {
            path: 'sections',
            component: SectionsComponent,
          },
        ],
      },
    ]),
  ],
  exports: [NavbarComponent],
})
export class HeadersModule {}
