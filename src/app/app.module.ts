import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { StepperComponent } from 'components/stepper/stepper.component';
// import { } from './components/stepper/stepper.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PatientsListComponent } from './components/patients-list/patients-list.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { HttpClientModule } from '@angular/common/http';
import { EditPatientComponent } from './components/edit-patient/edit-patient.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    EditPatientComponent,
    // PatientsListComponent,
    // StepperComponent,
    // AddPatientComponent
  ],
  imports: [
    NgbModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(
    {
        positionClass: 'toast-top-right',
        timeOut: 5000,
        closeButton: true,
        progressBar: true,
        preventDuplicates: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
