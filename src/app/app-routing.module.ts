import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { CallbackBffComponent } from './callback-bff/callback-bff.component';
import { DisplayInfoBffComponent } from './display-info-bff/display-info-bff.component';
import { DisplayInfoIamComponent } from './display-info-iam/display-info-iam.component';
import { DisplayInfoComponent } from './display-info/display-info.component';
import { LogoutComponent } from './logout/logout.component';
import { LogoutBffComponent } from './logout-bff/logout-bff.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'callback', component: CallbackComponent},
  {path: 'callback-bff', component: CallbackBffComponent},
  {path: 'info-iam', component: DisplayInfoIamComponent},
  {path: 'info-bff', component: DisplayInfoBffComponent},
  {path: 'info', component: DisplayInfoComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'logout-bff', component: LogoutBffComponent},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
