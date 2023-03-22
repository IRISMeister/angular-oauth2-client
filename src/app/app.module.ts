import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DisplayInfoIamComponent } from './display-info-iam/display-info-iam.component';
import { CallbackComponent } from './callback/callback.component';
import { DisplayInfoComponent } from './display-info/display-info.component';
import { provideHttpInterceptors } from './http-interceptors';
import { LogoutComponent } from './logout/logout.component';
import { CallbackBffComponent } from './callback-bff/callback-bff.component';
import { DisplayInfoBffComponent } from './display-info-bff/display-info-bff.component';
import { LogoutBffComponent } from './logout-bff/logout-bff.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DisplayInfoIamComponent,
    CallbackComponent,
    DisplayInfoComponent,
    LogoutComponent,
    CallbackBffComponent,
    DisplayInfoBffComponent,
    LogoutBffComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [provideHttpInterceptors()],
  bootstrap: [AppComponent]
})
export class AppModule { }
