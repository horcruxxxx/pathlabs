import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Group {
  id: string;
  name: string;
  rate: number;
}

interface SubGroup {
  id: string;
  groupId: string;
  name: string;
  rate: number;
}

type AddType = 'group' | 'subgroup' | 'test';
@Component({

  selector: 'app-add-edit-modal',
  standalone: true,
  templateUrl: './add-edit-modal.component.html',
  styleUrls: ['./add-edit-modal.component.scss'],
  imports:[FormsModule,CommonModule]

})
export class AddEditModalComponent {

  @Input() open = false;
  @Input() mode: 'add' | 'edit' = 'add';
  @Input() groups: Group[] = [];
  @Input() subGroups: SubGroup[] = [];
  @Output() openChange = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<void>();
  @Output() proceed = new EventEmitter<string>();

  selected: string | null = null;
  ModalHeading:string = "Add New Item";

  groupForm = {
    id: '',
    name: '',
    rate: 0
  };

  step :number = 0;
  lastStep: boolean = false;
  addType: AddType = 'test';
  
  formData = {
    group: { id: '', name: '', rate: null },
    subGroup: { id: '', name: '', rate: null },
    test: { id: '', name: '', rate: null }
  };

  groupData = { id: '', name: '', rate: '' };
  subGroupData = { id: '', name: '', rate: '', groupId: '' };
  testData = { id: '', name: '', rate: '', subGroupId: '' };
  
  close() {
    this.closed.emit();
  }

  submit() {
    console.log("Saved:", this.formData);
    this.close();
  }

  next() {
    if (this.selected) {
      switch(this.selected){

        case("group"):
          this.ModalHeading = "Step 1 of 3: Group"
          break;

        case("subgroup"):
          this.ModalHeading = "Step 1 of 2: SubGroup"
          break;

        case("test"):
          this.ModalHeading = "Step 1 of 1: Test"
          break;

        default:
          this.ModalHeading = "Add New Item";
          break;

      }
      if (this.step < 4) this.step++;
      if(this.step == 3 ) this.lastStep = true;
      this.proceed.emit(this.selected);
    }
  }

  handleClose() {
    this.resetForm();
    this.openChange.emit(false);
  }

  resetForm() {
    this.step = 0;
    this.addType = 'test';
    this.groupData = { id: '', name: '', rate: '' };
    this.subGroupData = { id: '', name: '', rate: '', groupId: '' };
    this.testData = { id: '', name: '', rate: '', subGroupId: '' };
  }

  back() {
    if (this.step > 0) this.step--;
    this.lastStep = false;
  }

  handleSubmit() {
    // Replace with your own logic
    alert(`${this.addType.toUpperCase()} created successfully!`);
    this.handleClose();
  }

  get filteredSubGroups(): SubGroup[] {
    if (this.addType === 'subgroup' && this.subGroupData.groupId) {
      return this.subGroups.filter(sg => sg.groupId === this.subGroupData.groupId);
    }
    if (this.addType === 'test') return this.subGroups;
    return [];
  }

  isLastStep(): boolean {
    if (this.addType === 'test' && this.step === 2) return true;
    if (this.addType === 'subgroup' && this.step === 3) return true;
    if (this.addType === 'group' && this.step === 4) return true;
    return false;
  }

  showNext(): boolean {
    if (this.addType === 'test' && this.step === 1) return true;
    if (this.addType === 'subgroup' && (this.step === 1 || this.step === 2)) return true;
    if (this.addType === 'group' && this.step >= 1 && this.step < 4) return true;
    return false;
  }

  getTitle(): string {
    if (this.mode === 'edit') return 'Edit Item';
    if (this.step === 1) return 'Add New Item';
    if (this.step === 2 && this.addType === 'group') return 'Step 1 of 3: Group';
    if ((this.step === 3 && this.addType === 'group') || (this.step === 2 && this.addType === 'subgroup'))
      return this.addType === 'group' ? 'Step 2 of 3: SubGroup' : 'Step 1 of 2: SubGroup';
    if (this.step === 4 || (this.step === 2 && this.addType === 'test')) {
      if (this.addType === 'group') return 'Step 3 of 3: Test';
      if (this.addType === 'subgroup') return 'Step 2 of 2: Test';
      return 'Add Test';
    }
    return 'Add New Item';
  }
}
