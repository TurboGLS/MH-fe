import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './pages/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuSectionComponent } from './components/menu-section/menu-section.component';
import { MultimetriPageComponent } from './pages/multimetri/multimetri-page.component';
import { PAC2200Component } from './components/multimetri/pac2200/pac2200.component';
import { P20A000TComponent } from './components/multimetri/p20-a000-t/p20-a000-t.component';
import { P21A000TComponent } from './components/multimetri/p21-a000-t/p21-a000-t.component';
import { SXMT63Component } from './components/multimetri/sxmt63/sxmt63.component';
import { FotovoltaiciPageComponent } from './pages/fotovoltaici/fotovoltaici-page.component';
import { STP3456Component } from './components/fotovoltaico/stp3456/stp3456.component';
import { STP810Component } from './components/fotovoltaico/stp810/stp810.component';
import { STP11060Component } from './components/fotovoltaico/stp110-60/stp110-60.component';
import { STP50Component } from './components/fotovoltaico/stp-50/stp-50.component';
import { SXMM63Component } from './components/multimetri/sxmm63/sxmm63.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authInterceptor } from './interceptors/auth.interceptor';
import { logoutInterceptor } from './interceptors/logout.interceptor';
import { VarlistContainerComponent } from './pages/varlist-container/varlist-container.component';
import { IfAuthenticatedDirective } from './directives/if-authenticated.directive';
import { RegisterComponent } from './pages/register/register.component';
import { VarlistComponent } from './components/varlist/varlist.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    MenuSectionComponent,
    MultimetriPageComponent,
    PAC2200Component,
    P20A000TComponent,
    P21A000TComponent,
    SXMT63Component,
    FotovoltaiciPageComponent,
    STP3456Component,
    STP810Component,
    STP11060Component,
    STP50Component,
    SXMM63Component,
    LoginComponent,
    VarlistContainerComponent,
    VarlistComponent,
    IfAuthenticatedDirective,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor, logoutInterceptor])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }