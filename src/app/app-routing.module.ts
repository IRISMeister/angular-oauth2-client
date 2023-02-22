import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { DisplayInfoIamComponent } from './display-info-iam/display-info-iam.component';
import { DisplayInfoComponent } from './display-info/display-info.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'callback', component: CallbackComponent},
  {path: 'info-iam', component: DisplayInfoIamComponent},
  {path: 'info', component: DisplayInfoComponent},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
