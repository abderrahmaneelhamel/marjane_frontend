import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { ResponsableDashboardComponent } from './pages/responsable-dashboard/responsable-dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './components/header/header.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'AdminDashboard', component: AdminDashboardComponent },
  { path: 'ResponsableDashboard', component: ResponsableDashboardComponent },
  { path: 'login', component: LoginComponent },
  ];
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    AdminDashboardComponent,
    ResponsableDashboardComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, {enableTracing : true}),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
