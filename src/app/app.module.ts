import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { StepperComponent } from './Components/stepper/stepper.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AddPatientComponent } from './Components/add-patient/add-patient.component';

@NgModule({
  declarations: [
    AppComponent,
    // StepperComponent,
    // AddPatientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
