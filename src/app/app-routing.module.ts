import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { PatientsListComponent } from './components/patients-list/patients-list.component';
import { EditPatientComponent } from './components/edit-patient/edit-patient.component';
import { ManageTestsComponent } from './Components/manage-tests/manage-tests.component';

const routes: Routes = [
  {
    path:'',pathMatch:'full',redirectTo:"patients-list"
  },
  {
    path: "add-patient", component: AddPatientComponent
  },
  {
    path: "patients-list", component: PatientsListComponent
  },
  {
    path:"edit-patient/:id",component:EditPatientComponent
  },
  {
    path:"manage-test",component:ManageTestsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
