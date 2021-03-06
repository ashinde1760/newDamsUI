import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './navbar/home/home.component';
import { DocManagmentComponent } from './navbar/doc-managment/doc-managment.component';
import { ViewDocumentComponent } from './navbar/view-document/view-document.component';
import { SectionsComponent } from './navbar/sections/sections.component';
import { SharedModulesModule } from 'src/app/shared-modules/shared-modules.module';
import { RouterModule } from '@angular/router';
import { BookmarksComponent } from './navbar/bookmarks/bookmarks.component';
import { HighlighterPipe } from './navbar/home/highlighter.pipe';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { TestComponent } from './navbar/test/test.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DocumentEditorContainerAllModule } from '@syncfusion/ej2-angular-documenteditor';




@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    DocManagmentComponent,
    ViewDocumentComponent,
    SectionsComponent,
    BookmarksComponent,
    HighlighterPipe,
    TestComponent,
  ],
  imports: [
    CommonModule,
    SharedModulesModule,
    NgxDocViewerModule  ,
    PdfViewerModule,
    DocumentEditorContainerAllModule,
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
          {
            path:'bookmarks',
            component:BookmarksComponent
          },
          {
            path:'test',
            component:TestComponent
          }
        ],
      },
    ]),
  ],
  exports: [NavbarComponent],
})
export class HeadersModule {}
