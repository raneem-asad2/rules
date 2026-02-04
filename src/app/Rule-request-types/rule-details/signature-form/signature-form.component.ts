import { Component, EventEmitter, Output } from '@angular/core';
import {
  DxFormModule,
  DxSelectBoxModule,
  DxRadioGroupModule,
  DxNumberBoxModule,
  DxButtonModule
} from 'devextreme-angular';

import { SignatureByType } from '../../../shared/enum/sig-by-type.enum';
import { Signature } from '../../../shared/rules.interface';

@Component({
  selector: 'app-signature-form',
  standalone: true,
  imports: [
    DxFormModule,
    DxSelectBoxModule,
    DxRadioGroupModule,
    DxNumberBoxModule,
    DxButtonModule
  ],
  templateUrl: './signature-form.component.html'
})
export class SignatureFormComponent {

  @Output() save = new EventEmitter<Signature>();

  SignatureByType = SignatureByType;

  property = ['Approval', 'Review', 'Verification'];
  role = ['Employee', 'Manager', 'HR', 'Finance'];
  positionState = ['Active', 'Temporary', 'Delegated'];
  recursiveLevels = [1, 2, 3, 4, 5];
  startRecursiveLevel = [1, 2, 3];
  grade = ['Entry Level', 'Mid Level', 'Senior Level'];
  position = ['Administrative Assistant', 'Analyst', 'Manager', 'Director'];
  adminUnit = ['Human Resources', 'Finance', 'IT', 'Operations'];
  state = ['Jordan', 'Remote', 'On-site'];

  propertyOption = { items: this.property };
  stateOption = { items: this.state };
  numRecursiveLevelsOption = { items: this.recursiveLevels };
  startRecursiveLevelOption = { items: this.startRecursiveLevel };
  roleOption = { items: this.role };
  adminUnitOption = { items: this.adminUnit };
  positionOption = { items: this.position };
  gradeOption = { items: this.grade };

  signatureForm = {
    signatureNumber: 1,
    byType: SignatureByType.DESIGNATION,
    property: null,
    position: null,
    state: null,
    role: null,
    adminUnit: null,
    grade: null,
    numRecursiveLevels: null,
    startRecursiveLevel: null
  };

  byTypeOptions = [
    { text: 'Designation', value: SignatureByType.DESIGNATION },
    { text: 'Role', value: SignatureByType.ROLE },
    { text: 'Organization', value: SignatureByType.ORGANIZATION }
  ];

  private buildData(formValue: any): Signature {

    const base: Signature = {
      signatureNumber: null,
      ruleNumber: null,
      property: null,
      role: null,
      positionState: null,
      recursiveLevels: null,
      startRecursiveLevel: null,
      grade: null,
      position: null,
      adminUnit: null
    };

    switch (formValue.byType) {

      case SignatureByType.DESIGNATION:
        return {
          ...base,
          property: formValue.property,
          position: formValue.position,
          recursiveLevels: formValue.numRecursiveLevels,
          startRecursiveLevel: formValue.startRecursiveLevel
        };

      case SignatureByType.ROLE:
        return {
          ...base,
          property: formValue.property,
          role: formValue.role
        };

      case SignatureByType.ORGANIZATION:
        return {
          ...base,
          adminUnit: formValue.adminUnit,
          property: formValue.property,
          position: formValue.position,
          grade: formValue.grade
        };

      default:
        return base;
    }
  }
  
  saveSig() {
    const signature = this.buildData(this.signatureForm);
    this.save.emit(signature);
    console.log('Signature emitted from form:', signature);
  }
}
