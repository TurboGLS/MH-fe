import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './pages/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuSectionComponent } from './components/menu-section/menu-section.component';
import { MultimetriPageComponent } from './pages/multimetri/multimetri-page.component';
import { PAC2200Component } from './pages/multimetri/pac2200/pac2200.component';
import { P20A000TComponent } from './pages/multimetri/p20-a000-t/p20-a000-t.component';
import { P21A000TComponent } from './pages/multimetri/p21-a000-t/p21-a000-t.component';
import { MFD4ORFCDT1Component } from './pages/multimetri/mfd4-orfcdt1/mfd4-orfcdt1.component';
import { SXMT63Component } from './pages/multimetri/sxmt63/sxmt63.component';
import { FotovoltaiciPageComponent } from './pages/fotovoltaici/fotovoltaici-page.component';
import { STP3456Component } from './pages/fotovoltaici/stp3456/stp3456.component';
import { STP810Component } from './pages/fotovoltaici/stp810/stp810.component';
import { STP11060Component } from './pages/fotovoltaici/stp110-60/stp110-60.component';
import { STP50Component } from './pages/fotovoltaici/stp-50/stp-50.component';

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
    MFD4ORFCDT1Component,
    SXMT63Component,
    FotovoltaiciPageComponent,
    STP3456Component,
    STP810Component,
    STP11060Component,
    STP50Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }