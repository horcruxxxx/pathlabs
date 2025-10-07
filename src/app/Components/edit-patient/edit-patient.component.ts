import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { relations } from 'src/app/constants/constants';
import { patientModel } from 'src/app/models/patientModel';
import { PatientserviceService } from 'src/app/service/patient/patient.service';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent {
  componentTitle="Edit Patient Form";
  param:number=0;
  usertype:string="";
  editPatientForm!:FormGroup;
  patientDetails:patientModel|undefined;
  today: string = new Date().toISOString().split('T')[0];
  readonly salutation=['Mr.','Miss.','Mrs.'];
  readonly gender = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Other', value: 'Other' }
  ];
  readonly maritalStatus=[
    { label: 'Married', value: 'Married' },
    { label: 'Unmarried', value: 'Unmarried' }
    ];
  readonly relations = [
    { label: 'S/O', value: 'S/O' },
    { label: 'W/O', value: 'W/O' },
    { label: 'D/O', value: 'D/O' },
    { label: 'Other', value: 'Other' }
  ];

  constructor(private _route:Router,private formBuilder:FormBuilder,private route: ActivatedRoute, 
    private _patientService: PatientserviceService,private toastr:ToastrService)
  {
    this.editPatientForm =  this.formBuilder.group({
      patient_Salution:["",Validators.required],
      patient_Name:["",[Validators.required]],
      patient_Address:["",[Validators.required]],
      patient_Dob:["",[Validators.required]],
      patient_Age:["",[Validators.required]],
      patient_Gender:["",[Validators.required]],
      patient_Marital_Status:["",[Validators.required]],
      relation:["",Validators.required],
      relative_Name:["",Validators.required],
      patient_Contact:["",[Validators.required,Validators.pattern('^\\d{10}$')]],
      patient_Email:["",Validators.email]
    });
  }
  ngOnInit(): void {
    this.param = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.loadPatient(this.param);
    }

    loadPatient(id:number){
      this._patientService.getPatientById(id).subscribe({
      next: (response: patientModel) => {
        this.patientDetails = response ? response : undefined;
        let name =this.patientDetails?.patient_Name.split(" ")|| [];
        console.log(name);
        let saluation=name[0]||" ";
        let patientName=name.slice(1).join(' ') || '';
        this.editPatientForm.patchValue({
          patient_Id:id,
          patient_Salution:saluation,
          patient_Name:patientName,
          patient_Address:this.patientDetails?.patient_Address,
          patient_Dob:this.patientDetails?.patient_DOB,
          patient_Age:this.patientDetails?.patient_Age,
          patient_Gender: this.patientDetails?.patient_Gender,
          patient_Marital_Status:this.patientDetails?.patient_Marital_Status,
          relation: this.patientDetails?.relation,
          relative_Name: this.patientDetails?.relative_Name,
          patient_Contact:this.patientDetails?.patient_Contact,
          patient_Email:this.patientDetails?.patient_Email
        });      
    },
      error: (err) => {
        console.error('Error fetching patient list:', err);
        this.patientDetails = undefined;
        
        // Optionally show a toast or alert
      }
      });
    }
    CalculateAge():void
    {
      const dob = this.editPatientForm.get('patient_Dob')?.value;
     
      if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      else{
        age--;
      }
      this.editPatientForm.get('patient_Age')?.setValue(age);
      }
    }
    SubmitForm(form: FormGroup):void {
      if (this.editPatientForm.valid) {
        
        const patient:patientModel=form.value;
      
        // console.log(patient);
        patient.patient_Id=this.param;
        patient.patient_Name=patient.patient_Salution+ " "+ patient.patient_Name;
        console.log(patient.patient_Name);
        this._patientService.updatePatientDetails(patient).subscribe(
          responseUserData => {
            if (responseUserData) {
                 this.toastr.success('Patient Data Updated Successfully', 'Success');
                 this.loadPatient(this.param);
                 this._route.navigate(['patients-list']);
                //  this.clearForm();
            }
          },
          // () => console.log("User add method executed successfully")
        );
     }
    }
    clickBack()
    {
      this._route.navigate(['/patients-list']);
    }
    clearForm(){
      this.editPatientForm.reset();
  }
}
