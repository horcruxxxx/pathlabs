import { Injectable } from '@angular/core';
import { constants } from 'src/app/constants/constants';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { patientModel } from 'src/app/models/patientModel';

@Injectable({
  providedIn: 'root'
})
export class PatientserviceService {
  url:string;
  constructor(private httpClient:HttpClient) { 
    
      this.url=constants.url+constants.patientEndpoint;
  }
  getPatientList(): Observable<patientModel[]>
      {
        let geturl=this.url+constants.getAllList;
        return this.httpClient.get<patientModel[]>(geturl).pipe(
          catchError(this.errorHandler));
  }
  getPatientById(id:number): Observable<patientModel>
  {
    let geturl=this.url+constants.getById+"?id="+id;
    return this.httpClient.get<patientModel>(geturl).pipe(
      catchError(this.errorHandler));
  }
  AddPatient(data:patientModel): Observable<patientModel>
  {
    let addurl=this.url+constants.add;
    return this.httpClient.post<patientModel>(addurl,data).pipe(
      catchError(this.errorHandler));
  }
  updatePatientDetails(patient:patientModel): Observable<boolean>
  {
    let updateUrl=this.url+constants.update;
    return this.httpClient.post<boolean>(updateUrl,patient).pipe(
      catchError(this.errorHandler));
  }
  errorHandler(error:HttpErrorResponse)
  {
  console.error(error);
    return throwError(error.message || "Server Error");
  }
}
