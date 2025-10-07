import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StepperComponent } from '../stepper/stepper.component';

interface PatientData {
  // labOperationType: string;
  date: string;
  serialNo: string;
  patientId: string;
  altRefNo: string;
  telNo: string;
  name: string;
  title: string;
  ageYears: string;
  ageMonths: string;
  ageDays: string;
  sex: string;
  fatherName: string;
  address: string;
  mobile: string;
  fax: string;
  email: string;
  refNo: string;
  panelComp: string;
  refByDoctor: string;
  refByLab: string;
  chargeAs: string;
  empCode: string;
  reqNo: string;
  outSide: string;
  collectedBy: string;
  remark: string;
  samplingDoneAt: string;
  paymentMode: string;
  area: string;
}

@Component({
  selector: 'app-patient-registration',
  standalone: true,
  imports: [CommonModule, StepperComponent, ReactiveFormsModule],
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent {
  currentStep = 1;

  steps = [
    { id: 1, title: 'Basic Info', description: 'Patient identification' },
    { id: 2, title: 'Personal Details', description: 'Contact & demographics' },
    { id: 3, title: 'Test & Lab', description: 'Medical information' },
    { id: 4, title: 'Payment', description: 'Billing details' }
  ];

  patientForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.patientForm = this.fb.group({
      // labOperationType: ['',Validators.required],
      date: [new Date().toISOString().split('T')[0]],
      serialNo: [''],
      patientId: [''],
      altRefNo: [''],
      telNo: [''],
      name: [''],
      title: ['Mr.'],
      ageYears: [''],
      ageMonths: [''],
      ageDays: [''],
      sex: [''],
      fatherName: [''],
      address: [''],
      mobile: [''],
      fax: [''],
      email: [''],
      refNo: [''],
      panelComp: [''],
      refByDoctor: [''],
      refByLab: [''],
      chargeAs: [''],
      empCode: [''],
      reqNo: [''],
      outSide: [''],
      collectedBy: [''],
      remark: [''],
      samplingDoneAt: [''],
      paymentMode: ['Cash'],
      area: ['']
    });
  }

  handleNext() {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  handlePrevious() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  handleSubmit() {
    if (this.patientForm.valid) {
      const data = this.patientForm.value as PatientData;
      alert(
        `Patient ${data.name} registered successfully with ID: ${data.patientId}`
      );
    } else {
      alert('Please fill required fields');
    }
  }
}
