import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './pages/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuSectionComponent } from './components/menu-section/menu-section.component';
import { MultimetriPageComponent } from './pages/multimetri/multimetri-page.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PAC2200Component } from './pages/multimetri/pac2200/pac2200.component';
import { P20A000TComponent } from './pages/multimetri/p20-a000-t/p20-a000-t.component';
import { P21A000TComponent } from './pages/multimetri/p21-a000-t/p21-a000-t.component';
import { MFD4ORFCDT1Component } from './pages/multimetri/mfd4-orfcdt1/mfd4-orfcdt1.component';
import { SXMT63Component } from './pages/multimetri/sxmt63/sxmt63.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    PdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }