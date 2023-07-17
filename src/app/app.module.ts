/* Title: app.module
Author: Megan Walker
Date: 07-16-2023
Description: App module for capstone project
Source: Professor Krasso, Angular.io */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoanCalculatorComponent } from './loan-calculator/loan-calculator.component';
import { HeaderNavComponent } from './shared/header-nav/header-nav.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactUsComponent,
    AboutComponent,
    FooterComponent,
    LoanCalculatorComponent,
    HeaderNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


