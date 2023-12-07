import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
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
import { TableComponent } from './components/tables/PromotionsTable/PromotionsTable.component';
import { PopupComponent } from './components/popup/popup.component';
import { ValidationTableComponent } from './components/tables/PromotionsValidationTable/validation-table.component';
import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'AdminDashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'ResponsableDashboard', component: ResponsableDashboardComponent, canActivate: [AuthGuard] },
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
    HeaderComponent,
    TableComponent,
    PopupComponent,
    ValidationTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, {enableTracing : true}),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
