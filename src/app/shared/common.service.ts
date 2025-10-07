import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  CalculateAge(dob:number| string):Observable<number>
      {
        // const dob = this.editPatientForm.get('patient_Dob')?.value;
       if (!dob) {
          // return of(0); // fallback if dob is missing
      } 
        if (dob) {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        if (monthDiff  < 0 || (monthDiff  === 0 && dayDiff < 0 )) {
          age--;
        }
        return of(age) ;
        }
        return of(0);
      }
}
