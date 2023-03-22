import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about.component';
import { AppComponent } from '../app.component';
const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'about', component: AboutComponent }
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }