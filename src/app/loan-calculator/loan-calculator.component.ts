/* Title: loan-calculator.component
Author: Megan Walker
Date: 07-16-2023
Description: Loan calculator component for capstone project
Source: Professor Krasso, Angular.io */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      extraPayments: ['']
    });
  }

  calculateLoan() {
    if (this.loanForm.invalid) {
      return;
    }

    const loanAmount = this.loanForm.value.loanAmount;
    const interestRate = this.loanForm.value.interestRate / 100;
    const loanTerm = this.loanForm.value.loanTerm;
    const extraPayments = this.loanForm.value.extraPayments || 0;

    const monthlyInterestRate = interestRate / 12;
    const monthlyPayment =
      (loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -loanTerm));
    this.monthlyPayment = monthlyPayment;

    this.generateAmortizationSchedule(loanAmount, monthlyInterestRate, loanTerm, extraPayments);
  }

  generateAmortizationSchedule(
    loanAmount: number,
    monthlyInterestRate: number,
    loanTerm: number,
    extraPayments: number
  ) {
    this.amortizationSchedule = [];
    let remainingBalance = loanAmount;

    for (let i = 1; i <= loanTerm; i++) {
      const interest = remainingBalance * monthlyInterestRate;
      const principal = this.monthlyPayment - interest + extraPayments;

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
}

