import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { EditorialsComponent } from './components/editorials/editorials.component';
import { LessonsComponent } from './components/lessons/lessons.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = 
[
  {path :'', component:LoginComponent},
  {path:'categories' , component:CategoriesComponent},
  {path:'editorials' , component:EditorialsComponent},
  {path:'lessons' , component:LessonsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
