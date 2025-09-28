import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPatientComponent } from './Components/add-patient/add-patient.component';
import { PatientsListComponent } from './Components/patients-list/patients-list.component';

const routes: Routes = [
  {
    path:'',pathMatch:'full',redirectTo:"patients-list"
  },
  {
    path: "add-patient", component: AddPatientComponent
  },
  {
    path: "patients-list", component: PatientsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
