import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeadersModule } from './Components/headers/headers.module';

const routes: Routes = [
  {
    path:"",
    pathMatch:"full",
    loadChildren: ()=> HeadersModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
