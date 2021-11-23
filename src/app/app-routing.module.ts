import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginAppComponent } from './login-app/login-app.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {
    path:'login',component:LoginAppComponent
  },
  {
    path:'register',component:RegisterComponent
  },

  {
    path:'all',loadChildren:()=>import('./shared/shared.module').then(m=>m.SharedModule)
  },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
