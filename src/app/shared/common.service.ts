import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  CalculateAge(dob:number|string):string
  {
        
  //  strAge :string;
    // const dob = this.editPatientForm.get('patient_Dob')?.value;
    if (!dob) {
      return ""; // fallback if dob is missing
  } 
      if (dob) {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        let monthDiff = today.getMonth() - birthDate.getMonth();
        let dayDiff = today.getDate() - birthDate.getDate();

      if (monthDiff  < 0 || (monthDiff  === 0 && dayDiff < 0 )) {
        age--;
         monthDiff += 12;
      }
      if (dayDiff < 0) {
        const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        dayDiff += previousMonth.getDate();
        monthDiff--;
      }
      return `${age} years ${monthDiff} months ${dayDiff} days`;
      
    }
    return "" ;
    
  }
}
