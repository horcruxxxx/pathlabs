export interface patientModel {
    patient_Id: number;
    patient_Salution:string;
//   serialNo: number;
    patient_Name: string;
    patient_DOB: string;
    patient_Address: Date;
    patient_Age: number;
    patient_Gender:string;
    relation:string;
    relative_Name: string;
    patient_Contact:number;
    patient_Email:string;
    patient_Marital_Status:string;
    // altRefNo?: string;
    // permanent_Id?: string;
    // referred_By?: string;
    // receipt: number;
    // urgent_Report: 'Yes' | 'No';
    // check_Print: 'Yes' | 'No';
    // total_Amount: number;
    // discount: number;
    // net_Amount: number;
    // status: 'Pending' | 'Completed' | 'In Progress';
    registered_By:number;
    patient_Reg_Date:string;
}
export type SortField = keyof patientModel;
export type SortDirection = 'asc' | 'desc';