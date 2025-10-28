import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StepperComponent } from '../stepper/stepper.component';
import { gender, maritalStatus, relations, salutation } from 'src/app/constants/enum';
import { CommonService } from 'src/app/shared/common.service';
import { PatientserviceService } from 'src/app/service/patient/patient.service';
import { patientModel } from 'src/app/models/patientModel';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

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
    currentStep = 2;

    today: string = new Date().toISOString().split('T')[0];
    salutation=Object.values(salutation);
    gender=Object.values(gender);
    maritalStatus=Object.values(maritalStatus);
    relations=Object.values(relations);
    
  steps = [
    // { id: 1, title: 'Basic Info', description: 'Patient identification' },
    { id: 2, title: 'Personal Details', description: 'Contact & demographics' },
    { id: 3, title: 'Test & Lab', description: 'Medical information' },
    { id: 4, title: 'Payment', description: 'Billing details' }
  ];

  patientForm: FormGroup;

  constructor(private fb: FormBuilder,private _common:CommonService,private _patientService: PatientserviceService,
    private _route:Router,private toastr:ToastrService) {
    
    this.patientForm = this.fb.group({
      // labOperationType: ['',Validators.required],
      date: [new Date().toISOString().split('T')[0]],
      // serialNo: [''],
      patientId: [''],
      // altRefNo: [''],
      // telNo: [''],
      patient_Salution: [this.salutation[2],Validators.required],
      patient_Name: ['Leelawati'],
      patient_DOB:['16-04-1985'],
      patient_Age:[''],
      patient_Gender: [this.gender[1],Validators.required],
      patient_Marital_Status:[this.maritalStatus[0],Validators.required],
      patient_Address: ['Firozabad'],
      relation:[this.relations[1]],
      relative_Name:['GyasiPrasad'],
      patient_Contact: ['12145125458'],
      // fax: [''],
      patient_Email: ['k@gmail.com'],
      // refNo: [''],
      // panelComp: [''],
      // refByDoctor: [''],
      // refByLab: [''],
      // chargeAs: [''],
      // empCode: [''],
      // reqNo: [''],
      // outSide: [''],
      // collectedBy: [''],
      // remark: [''],
      // samplingDoneAt: [''],
      // paymentMode: ['Cash'],
      // area: ['']
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
  CalculateAge(){
    
    // this._common.CalculateAge(this.patientForm.get('patient_DOB')?.value).subscribe(age => {
    //     this.patientForm.get('patient_Age')?.setValue(age);
    //   });
    let age =this._common.CalculateAge(this.patientForm.get('patient_DOB')?.value);
    console.log(age);
    this.patientForm.get('patient_Age')?.setValue(age);

  }
  handleSubmit() {
    console.log(this.patientForm.get('patient_Age')?.value);
    if (this.patientForm.valid) {
      const data = this.patientForm.value as patientModel;
      console.log(data);
      this._patientService.AddPatient(data).subscribe(
          responseUserData => {
            if (responseUserData) {
                 this.toastr.success('Patient Data Updated Successfully', 'Success');
                //  this.loadPatient(this.param);
                 this._route.navigate(['patients-list']);
            }
          }
        );
    //   alert(
    //     `Patient ${data.name} registered successfully with ID: ${data.patientId}`
    //   );
    // } else {
    //   alert('Please fill required fields');
    }
  }
}
