/* Title: app-routing.module
Author: Megan Walker
Date: 07-16-2023
Description: App routing module for capstone project
Source: Professor Krasso, Angular.io */


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutComponent } from './about/about.component';
import { LoanCalculatorComponent } from './loan-calculator/loan-calculator.component';

const routes: Routes = [
  { path: '', redirectTo: '/loan-calculator', pathMatch: 'full' },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'loan-calculator', component: LoanCalculatorComponent },
  { path: '**', redirectTo: '/loan-calculator' }, // Redirect all other routes to the loan calculator page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
