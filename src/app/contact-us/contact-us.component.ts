/* Title: contact-us.component
Author: Megan Walker
Date: 07-16-2023
Description: Contact Us component for capstone project
Source: Professor Krasso, https://angular.io/ */

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  get formControls() {
    return this.contactForm.controls;
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      return;
    }

    // Handle form submission
    console.log('Form submitted!', this.contactForm.value);
  }
}

