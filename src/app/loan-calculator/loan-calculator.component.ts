/* Title: loan-calculator.component
Author: Megan Walker
Date: 07-16-2023
Description: Loan calculator component for capstone project
Source: Professor Krasso, Angular.io */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

interface AmortizationPayment {
  paymentNumber: number;
  paymentAmount: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

@Component({
  selector: 'app-loan-calculator',
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.css']
})
export class LoanCalculatorComponent implements OnInit {
  loanForm: FormGroup;
  monthlyPayment: number;
  showAmortization = false;
  amortizationSchedule: AmortizationPayment[] = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.loanForm = this.formBuilder.group({
      loanAmount: ['', Validators.required],
      interestRate: ['', Validators.required],
      loanTerm: ['', Validators.required],
      extraPaymentsToggle: [false],
      extraPayments: this.formBuilder.array([]) // Using FormArray for multiple extra payments
    });
  }

  calculateLoan() {
    if (this.loanForm.invalid) {
      return;
    }

    const loanAmount = this.loanForm.value.loanAmount;
    const interestRate = this.loanForm.value.interestRate / 100;
    const loanTerm = this.loanForm.value.loanTerm;
    const extraPaymentsArray = this.loanForm.get('extraPayments') as FormArray;

    const monthlyInterestRate = interestRate / 12;
    const monthlyPayment =
      (loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -loanTerm));
    this.monthlyPayment = monthlyPayment;

    this.generateAmortizationSchedule(loanAmount, monthlyInterestRate, loanTerm, extraPaymentsArray);
  }

  generateAmortizationSchedule(
    loanAmount: number,
    monthlyInterestRate: number,
    loanTerm: number,
    extraPaymentsArray: FormArray
  ) {
    this.amortizationSchedule = [];
    let remainingBalance = loanAmount;

    for (let i = 1; i <= loanTerm; i++) {
      const interest = remainingBalance * monthlyInterestRate;

      let principal = this.monthlyPayment - interest;
      if (extraPaymentsArray && extraPaymentsArray.length > 0) {
        for (let j = 0; j < extraPaymentsArray.length; j++) {
          const extraPayment = extraPaymentsArray.at(j).value;
          principal += extraPayment;
        }
      }

      remainingBalance -= principal;
      remainingBalance = Math.max(remainingBalance, 0); // Ensure remaining balance doesn't go negative

      const payment: AmortizationPayment = {
        paymentNumber: i,
        paymentAmount: this.monthlyPayment,
        principal,
        interest,
        remainingBalance
      };

      this.amortizationSchedule.push(payment);
    }
  }

  showAmortizationSchedule() {
    this.showAmortization = true;
  }

  toggleExtraPayments() {
    const extraPaymentsToggle = this.loanForm.get('extraPaymentsToggle');
    extraPaymentsToggle.setValue(!extraPaymentsToggle.value);
  }

  addExtraPayment() {
    const extraPaymentsArray = this.loanForm.get('extraPayments') as FormArray;
    extraPaymentsArray.push(this.formBuilder.control(''));
  }
}
