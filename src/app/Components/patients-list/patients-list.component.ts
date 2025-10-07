import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientserviceService } from 'src/app/service/patient/patient.service';
import { patientModel,SortField,SortDirection } from '../../models/patientModel'

// type SortField = keyof Patient;
// type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss'],
  imports: [FormsModule, CommonModule],
  standalone: true
})

export class PatientsListComponent {
  filteredPatients: patientModel[] = [];
  paginatedPatients: patientModel[] = [];

  // Search and filter properties
  searchTerm: string = '';
  dateFrom: string = '';
  dateTo: string = '';
  statusFilter: string = '';

  // Sorting properties
  currentSortField: SortField = 'patient_Reg_Date';
  currentSortDirection: SortDirection = 'desc';

  // Pagination properties
  currentPage: number = 1;
  pageSize: number = 25;
  totalPages: number = 1;
  startIndex: number = 0;
  endIndex: number = 0;

  isLoading: boolean = true;
  allPatients: patientModel[] = [];
  //   {
  //     id: 1,
  //     serialNo: 1,
  //     date: '2024-01-06',
  //     patientName: 'MR. RAGHAV',
  //     fatherName: 'SURESH KUMAR',
  //     age: 35,
  //     sex: 'M',
  //     altRefNo: 'REF001',
  //     permanentId: 'P001',
  //     referredByLab: 'City Lab',
  //     referredByDr: 'Dr. Sharma',
  //     receipt: 1001,
  //     urgentReport: 'No',
  //     checkPrint: 'No',
  //     totalAmount: 1500,
  //     discount: 0,
  //     netAmount: 1500,
  //     status: 'Pending'
  //   },
  //   {
  //     id: 2,
  //     serialNo: 2,
  //     date: '2023-01-06',
  //     patientName: 'MR. AMAN ARORA',
  //     fatherName: 'RAJESH ARORA',
  //     age: 28,
  //     sex: 'M',
  //     referredByLab: 'SELF',
  //     receipt: 1002,
  //     urgentReport: 'No',
  //     checkPrint: 'No',
  //     totalAmount: 800,
  //     discount: 0,
  //     netAmount: 800,
  //     status: 'Completed'
  //   },
  //   {
  //     id: 3,
  //     serialNo: 3,
  //     date: '2025-01-06',
  //     patientName: 'MRS. ARCHANA',
  //     fatherName: 'RAMESH GUPTA',
  //     age: 50,
  //     sex: 'F',
  //     referredByDr: 'MUKESH AGARWAL M.D. (Medicine)',
  //     receipt: 1003,
  //     urgentReport: 'Yes',
  //     checkPrint: 'Yes',
  //     totalAmount: 1200,
  //     discount: 100,
  //     netAmount: 1100,
  //     status: 'In Progress'
  //   }
  //   // Add more sample data as needed
  // ];
  
  constructor(private router: Router, private _patientService: PatientserviceService) { }

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    // In real app, this would be a service call
    // this.filteredPatients = [...this.allPatients];
    this._patientService.getPatientList().subscribe({
      next: (response: patientModel[]) => {
        this.allPatients = response?.length ? response : [];
        this.filteredPatients = response?.length ? response : [];
        this.isLoading = false;

        this.applySorting();
        this.updatePagination();
      },
      error: (err) => {
        console.error('Error fetching patient list:', err);
        this.allPatients = [];
        this.filteredPatients = [];
        this.isLoading = false;
        // Optionally show a toast or alert
      }
    });
  }

  onSearch() {
    this.applyFilters();
  }

  onDateFilter() {
    this.applyFilters();
  }

  onStatusFilter() {
    this.applyFilters();
  }

  applyFilters() {
    this.filteredPatients = this.allPatients.filter(patient => {
      const matchesSearch = !this.searchTerm ||
        patient.patient_Name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        patient.relative_Name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        patient.patient_Id.toString().includes(this.searchTerm);

      const matchesDateFrom = !this.dateFrom || patient.patient_Reg_Date >= this.dateFrom;
      const matchesDateTo = !this.dateTo || patient.patient_Reg_Date <= this.dateTo;
      // const matchesStatus = !this.statusFilter || patient.status === this.statusFilter;

      return matchesSearch && matchesDateFrom && matchesDateTo //&& matchesStatus;
    });

    this.currentPage = 1;
    this.applySorting();
    this.updatePagination();
  }

  sort(field: SortField) {
    if (this.currentSortField === field) {
      this.currentSortDirection = this.currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSortField = field;
      this.currentSortDirection = 'asc';
    }

    this.applySorting();
    this.updatePagination();
  }

  applySorting() {
    this.filteredPatients.sort((a, b) => {
      const aValue = a[this.currentSortField] || 0;
      const bValue = b[this.currentSortField] || 0;

      let comparison = 0;
      if (aValue < bValue) comparison = -1;
      else if (aValue > bValue) comparison = 1;

      return this.currentSortDirection === 'desc' ? -comparison : comparison;
    });
  }

  getSortIcon(field: SortField): string {
    if (this.currentSortField !== field) return 'icon-sort';
    return this.currentSortDirection === 'asc' ? 'icon-sort-up' : 'icon-sort-down';
  }

  onPageSizeChange() {
    this.currentPage = 1;
    this.updatePagination();
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredPatients.length / this.pageSize);
    this.startIndex = (this.currentPage - 1) * this.pageSize;
    this.endIndex = Math.min(this.startIndex + this.pageSize, this.filteredPatients.length);

    this.paginatedPatients = this.filteredPatients.slice(this.startIndex, this.endIndex);

  }

  getVisiblePages(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - 2);
    let end = Math.min(this.totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  formatDate(date: string): string {
    // console.log(date);
    return new Date(date).toLocaleDateString('en-GB');
  }

  getRowClass(patient: patientModel): string {
    // if (patient.urgent_Report === 'Yes') return 'urgent-row';
    // if (patient.status === 'Completed') return 'completed-row';
    return '';
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Completed': return 'status-completed';
      case 'In Progress': return 'status-progress';
      case 'Pending': return 'status-pending';
      default: return '';
    }
  }

  getTotalAmount(): number {
    // return this.filteredPatients.reduce((sum, patient) => sum + patient.total_Amount, 0);
    return 0;
  }

  getPendingCount(): number {
    // return this.filteredPatients.filter(p => p.status === 'Pending').length;
    return 0;
  }

  navigateToAddPatient() {
    this.router.navigate(['/add-patient']);
  }

  refreshList() {
    this.loadPatients();
  }

  viewPatient(id: number) {
    this.router.navigate(['/patient', id]);
  }

  editPatient(id: number) {
    this.router.navigate(['edit-patient', id]);
  }

  printReport(id: number) {
    console.log('Printing report for patient:', id);
  }

  deletePatient(id: number) {
    if (confirm('Are you sure you want to delete this patient?')) {
      console.log('Deleting patient:', id);
    }
  }

}
