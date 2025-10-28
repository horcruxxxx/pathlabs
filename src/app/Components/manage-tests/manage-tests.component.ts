// // import { Component } from '@angular/core';
// // import { Group, SubGroup, Test } from '../../models/testsModel';
// // import { FormsModule } from '@angular/forms';
// // import { CommonModule } from '@angular/common';

// // @Component({
// //   selector: 'app-manage-tests',
// //   templateUrl: './manage-tests.component.html',
// //   styleUrls: ['./manage-tests.component.scss'],
// //   standalone: true,
// //   imports: [FormsModule,CommonModule]
// // })
// // export class ManageTestsComponent {
// //   selectedGroup: string | null = null;
// //   selectedSubGroup: string | null = null;
// //   selectedTest: string | null = null;
// //   searchTerm: string = '';

// //   // Sample Data
// //   groups: Group[] = [
// //     { id: 'G01', name: 'PROFILE', rate: 0 },
// //     { id: 'G02', name: 'HAEMATOLOGY', rate: 0 },
// //     { id: 'G03', name: 'BIOCHEMISTRY', rate: 0 },
// //     { id: 'G04', name: 'URINE EXAMINATION REPORT', rate: 0 },
// //     { id: 'G05', name: 'STOOL EXAMINATION REPORT', rate: 0 },
// //     { id: 'G06', name: 'HBSAG-LAB/OUR TESTS', rate: 0 },
// //     { id: 'G07', name: 'SEROLOGY', rate: 0 },
// //     { id: 'G08', name: 'IMMUNOLOGY - SEROLOGY', rate: 0 },
// //     { id: 'G09', name: 'CULTURE & ANTIBIOTIC SENSITIVITY', rate: 0 },
// //     { id: 'G10', name: 'SPECIALTY RABNABY LTD', rate: 0 },
// //     { id: 'G11', name: 'SEMEN ANALYSIS', rate: 0 },
// //     { id: 'G12', name: 'MICROBIOLOGY', rate: 0 },
// //   ];

// //   subGroups: SubGroup[] = [
// //     { id: 'S01', groupId: 'G01', name: 'HAEMATOLOGY PROFILE', rate: 0 },
// //     { id: 'S02', groupId: 'G01', name: 'BIOCHEMISTRY PENAL & PROFILE', rate: 0 },
// //     { id: 'S03', groupId: 'G01', name: 'HEALTH CHECK PROFILE', rate: 0 },
// //     { id: 'S04', groupId: 'G01', name: 'BIOCHEMISTRY PROFILE', rate: 0 },
// //     { id: 'S07', groupId: 'G01', name: 'INFERTILITY PROFILE', rate: 0 },
// //     { id: 'S20', groupId: 'G01', name: 'AEROBIC CULTURE SENSITIVIT', rate: 0 },
// //     { id: 'S21', groupId: 'G01', name: 'TUBERCULOSIS PANELS', rate: 0 },
// //     { id: 'S23', groupId: 'G01', name: 'LIVER PROFILE', rate: 0 },
// //   ];

// //   tests: Test[] = [
// //     { id: 'T01', subGroupId: 'S01', name: 'TLC DLC', rate: 100 },
// //     { id: 'T02', subGroupId: 'S01', name: 'TLC DLC ESR', rate: 150 },
// //     { id: 'T03', subGroupId: 'S01', name: 'NA+ K+ Ca+', rate: 450 },
// //     { id: 'T04', subGroupId: 'S01', name: 'HB TLC DLC', rate: 150 },
// //     { id: 'T05', subGroupId: 'S01', name: 'HB TLC DLC ESR', rate: 200 },
// //     { id: 'T06', subGroupId: 'S01', name: 'MLA ESR', rate: 2150 },
// //     { id: 'T07', subGroupId: 'S01', name: 'HB,TLC,DLC, PLT', rate: 200 },
// //     { id: 'T08', subGroupId: 'S01', name: 'TLC,ESR, MP VIDAL', rate: 300 },
// //     { id: 'T09', subGroupId: 'S01', name: 'HB TLC DLC PCOUNT', rate: 200 },
// //     { id: 'T10', subGroupId: 'S01', name: 'ABO,RH', rate: 50 },
// //     { id: 'T11', subGroupId: 'S01', name: 'MALARIA', rate: 300 },
// //   ];

// //   get filteredGroups(): Group[] {
// //     return this.groups.filter(g =>
// //       g.name.toLowerCase().includes(this.searchTerm.toLowerCase())
// //     );
// //   }

// //   get filteredSubGroups(): SubGroup[] {
// //     return this.selectedGroup
// //       ? this.subGroups.filter(sg => sg.groupId === this.selectedGroup)
// //       : [];
// //   }

// //   get filteredTests(): Test[] {
// //     return this.selectedSubGroup
// //       ? this.tests.filter(t => t.subGroupId === this.selectedSubGroup)
// //       : [];
// //   }

// //   selectGroup(id: string) {
// //     this.selectedGroup = id;
// //     this.selectedSubGroup = null;
// //     this.selectedTest = null;
// //   }

// //   selectSubGroup(id: string) {
// //     this.selectedSubGroup = id;
// //     this.selectedTest = null;
// //   }

// //   selectTest(id: string) {
// //     this.selectedTest = id;
// //   }
// // }

// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';

// interface Group {
//   id: string;
//   code: string;
//   name: string;
//   count: number;
// }

// interface SubGroup {
//   id: string;
//   groupId: string;
//   code: string;
//   name: string;
//   count: number;
// }

// interface TestItem {
//   id: string;
//   subgroupId: string;
//   code: string;
//   name: string;
//   price: number;
// }

// @Component({
//   selector: 'app-manage-tests',
//   templateUrl: './manage-tests.component.html',
//   styleUrls: ['./manage-tests.component.scss'],
//   standalone: true,
//   imports: [FormsModule,CommonModule]
//   // selector: 'app-master-test-list',
//   // templateUrl: './master-test-list.component.html',
//   // styleUrls: ['./master-test-list.component.scss']
// })
// export class ManageTestsComponent implements OnInit {
//   query = '';

//   groups: Group[] = [];
//   subGroups: SubGroup[] = [];
//   tests: TestItem[] = [];

//   selectedGroupId: string | null = null;
//   selectedSubGroupId: string | null = null;
//   selectedTestId: string | null = null;

//   ngOnInit(): void {
//     // Sample data - adapt as needed
//     this.groups = [
//       { id: 'g1', code: 'G01', name: 'PROFILE', count: 0 },
//       { id: 'g2', code: 'G02', name: 'HAEMATOLOGY', count: 0 },
//       { id: 'g3', code: 'G03', name: 'BIOCHEMISTRY', count: 0 },
//       { id: 'g4', code: 'G04', name: 'URINE EXAMINATION REPORT', count: 0 },
//       { id: 'g5', code: 'G05', name: 'STOOL EXAMINATION REPORT', count: 0 },
//       // ...more
//     ];

//     this.subGroups = [
//       { id: 's1', groupId: 'g1', code: 'S01', name: 'HAEMATOLOGY PROFILE', count: 0 },
//       { id: 's2', groupId: 'g2', code: 'S02', name: 'BIOCHEMISTRY PENAL & PROFILE', count: 0 },
//       { id: 's3', groupId: 'g1', code: 'S03', name: 'HEALTH CHECK PROFILE', count: 0 },
//       { id: 's4', groupId: 'g3', code: 'S04', name: 'BIOCHEMISTRY PROFILE', count: 0 },
//       // ...more
//     ];

//     this.tests = [
//       { id: 't1', subgroupId: 's1', code: 'T04', name: 'HB TLC DLC', price: 150 },
//       { id: 't2', subgroupId: 's1', code: 'T05', name: 'HB TLC DLC ESR', price: 200 },
//       { id: 't3', subgroupId: 's1', code: 'T06', name: 'MLA ESR', price: 2150 },
//       { id: 't4', subgroupId: 's2', code: 'T07', name: 'HB,TLC,DLC,PLT', price: 200 },
//       { id: 't5', subgroupId: 's3', code: 'T08', name: 'TLC,ESR, MP VIDAL', price: 300 },
//       // ...more
//     ];

//     // default selection
//     this.selectedGroupId = this.groups[0]?.id ?? null;
//     this.selectedSubGroupId = this.subGroups.find(s => s.groupId === this.selectedGroupId)?.id ?? null;
//     this.selectedTestId = this.tests.find(t => t.subgroupId === this.selectedSubGroupId)?.id ?? null;
//   }

//   // filter helpers
//   get filteredGroups(): Group[] {
//     const q = this.query.trim().toLowerCase();
//     if (!q) return this.groups;
//     return this.groups.filter(g => `${g.code} ${g.name}`.toLowerCase().includes(q));
//   }

//   get filteredSubGroups(): SubGroup[] {
//     const q = this.query.trim().toLowerCase();
//     let list = this.subGroups.filter(s => s.groupId === this.selectedGroupId);
//     if (!q) return list;
//     return list.filter(s => `${s.code} ${s.name}`.toLowerCase().includes(q));
//   }

//   get filteredTests(): TestItem[] {
//     const q = this.query.trim().toLowerCase();
//     let list = this.tests.filter(t => t.subgroupId === this.selectedSubGroupId);
//     if (!q) return list;
//     return list.filter(t => `${t.code} ${t.name}`.toLowerCase().includes(q));
//   }

//   selectGroup(g: Group) {
//     this.selectedGroupId = g.id;
//     // auto-select first subgroup of this group
//     const firstSub = this.subGroups.find(s => s.groupId === g.id);
//     this.selectedSubGroupId = firstSub ? firstSub.id : null;
//     this.selectedTestId = this.selectedSubGroupId ? this.tests.find(t => t.subgroupId === this.selectedSubGroupId)?.id ?? null : null;
//   }

//   selectSubGroup(s: SubGroup) {
//     this.selectedSubGroupId = s.id;
//     this.selectedTestId = this.tests.find(t => t.subgroupId === s.id)?.id ?? null;
//   }

//   selectTest(t: TestItem) {
//     this.selectedTestId = t.id;
//   }

//   // Action buttons - hooks for future implementation
//   add() { console.log('Add'); }
//   edit() { console.log('Edit', this.selectedTestId); }
//   copy() { console.log('Copy'); }
//   drop() { console.log('Drop'); }
//   selectAll() { console.log('Select All'); }
//   find() { console.log('Find'); }
//   rates() { console.log('Rates'); }
//   close() { console.log('Close'); }
// }

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Group { id: string; code: string; name: string; count: number; }
interface SubGroup { id: string; groupId: string; code: string; name: string; count: number; }
interface TestItem { id: string; subgroupId: string; code: string; name: string; price: number; }


@Component({
  selector: 'app-manage-tests',
  templateUrl: './manage-tests.component.html',
  styleUrls: ['./manage-tests.component.scss'],
  standalone: true,
  imports: [FormsModule,CommonModule]
  // selector: 'app-master-test-list',
  // templateUrl: './master-test-list.component.html',
  // styleUrls: ['./master-test-list.component.scss']
})
export class ManageTestsComponent implements OnInit {
  query = '';

  groups: Group[] = [];
  subGroups: SubGroup[] = [];
  tests: TestItem[] = [];

  selectedGroupId: string | null = null;
  selectedSubGroupId: string | null = null;

  // Multi-selection management
  selectedTestIds = new Set<string>();
  selectedTests: TestItem[] = [];
  focusedTestId: string | null = null;

  // Toast
  toastVisible = false;
  toastMessage = '';
  private toastTimer: any = null;

  constructor(
    private _route:Router
  ){}

  ngOnInit(): void {
    // sample data (replace with API data)
    this.groups = [
      { id: 'g1', code: 'G01', name: 'PROFILE', count: 0 },
      { id: 'g2', code: 'G02', name: 'HAEMATOLOGY', count: 0 },
      { id: 'g3', code: 'G03', name: 'BIOCHEMISTRY', count: 0 },
      { id: 'g4', code: 'G04', name: 'URINE EXAMINATION REPORT', count: 0 },
    ];

    this.subGroups = [
      { id: 's1', groupId: 'g1', code: 'S01', name: 'HAEMATOLOGY PROFILE', count: 0 },
      { id: 's2', groupId: 'g1', code: 'S02', name: 'BIOCHEMISTRY PENAL & PROFILE', count: 0 },
      { id: 's3', groupId: 'g2', code: 'S03', name: 'HEALTH CHECK PROFILE', count: 0 },
    ];

    this.tests = [
      { id: 't1', subgroupId: 's1', code: 'T02', name: 'TLC DLC ESR', price: 150 },
      { id: 't2', subgroupId: 's1', code: 'T03', name: 'NA+ K+ Ca+', price: 450 },
      { id: 't3', subgroupId: 's1', code: 'T04', name: 'HB TLC DLC', price: 150 },
      { id: 't4', subgroupId: 's2', code: 'T05', name: 'HB TLC DLC ESR', price: 200 },
      { id: 't5', subgroupId: 's2', code: 'T06', name: 'MLA ESR', price: 2150 },
      { id: 't6', subgroupId: 's2', code: 'T07', name: 'HB,TLC,DLC, PLT', price: 200 },
      { id: 't7', subgroupId: 's3', code: 'T08', name: 'TLC,ESR, MP VIDAL', price: 300 },
    ];

    this.selectedGroupId = this.groups[0]?.id ?? null;
    this.selectedSubGroupId = this.subGroups.find(s => s.groupId === this.selectedGroupId)?.id ?? null;
  }

  // Filter helpers
  get filteredGroups(): Group[] {
    const q = this.query.trim().toLowerCase();
    if (!q) return this.groups;
    return this.groups.filter(g => `${g.code} ${g.name}`.toLowerCase().includes(q));
  }

  get filteredSubGroups(): SubGroup[] {
    const q = this.query.trim().toLowerCase();
    let list = this.subGroups.filter(s => s.groupId === this.selectedGroupId);
    if (!q) return list;
    return list.filter(s => `${s.code} ${s.name}`.toLowerCase().includes(q));
  }

  get filteredTests(): TestItem[] {
    const q = this.query.trim().toLowerCase();
    let list = this.tests.filter(t => t.subgroupId === this.selectedSubGroupId);
    if (!q) return list;
    return list.filter(t => `${t.code} ${t.name}`.toLowerCase().includes(q));
  }

  selectGroup(g: Group) {
    this.selectedGroupId = g.id;
    const firstSub = this.subGroups.find(s => s.groupId === g.id);
    this.selectedSubGroupId = firstSub ? firstSub.id : null;
  }

  selectSubGroup(s: SubGroup) {
    this.selectedSubGroupId = s.id;
  }

  // Toggle selection: add/remove test from selectedTests
  toggleTestSelection(t: TestItem) {
    this.focusedTestId = t.id;
    if (this.selectedTestIds.has(t.id)) {
      // remove
      this.selectedTestIds.delete(t.id);
      this.selectedTests = this.selectedTests.filter(x => x.id !== t.id);
      this.showToast(`${t.name} removed from selection`);
    } else {
      // add
      this.selectedTestIds.add(t.id);
      this.selectedTests = [...this.selectedTests, t];
      this.showToast(`${t.name} added to selection`);
    }
  }

  // Remove from right-hand selected list
  removeSelected(testId: string) {
    const t = this.selectedTests.find(x => x.id === testId);
    if (!t) return;
    this.selectedTestIds.delete(testId);
    this.selectedTests = this.selectedTests.filter(x => x.id !== testId);
    this.showToast(`${t.name} removed from selection`);
  }

  // Works in real time
  get totalAmount(): number {
    return this.selectedTests.reduce((s, it) => s + Number(it.price || 0), 0);
  }

  // Toast utility
  showToast(msg: string) {
    this.toastMessage = msg;
    this.toastVisible = true;
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
    this.toastTimer = setTimeout(() => {
      this.toastVisible = false;
      this.toastTimer = null;
    }, 3500);
  }

  // Note - TObe Done after designs, will discuss with vanchhit
  add() { console.log('Add'); }
  edit() { console.log('Edit'); }
  copy() { console.log('Copy'); }
  drop() { console.log('Drop'); }
  selectAll() { console.log('Select All'); }
  find() { console.log('Find'); }
  rates() { console.log('Rates'); }

  
  close() { 
    this._route.navigate(['patients-list']);
   }
}