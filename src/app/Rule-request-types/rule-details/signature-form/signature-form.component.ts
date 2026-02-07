import {  Component,  EventEmitter,  Input,  Output,  OnChanges,  SimpleChanges, OnInit} from '@angular/core';
import {  DxFormModule,  DxSelectBoxModule,  DxRadioGroupModule,  DxNumberBoxModule,  DxButtonModule, DxSwitchComponent,  DxSwitchModule} from 'devextreme-angular';
import { SignatureByType } from '../../../shared/enum/sig-by-type.enum';
import { Signature } from '../../../shared/rules.interface';
import { RulesService } from '../../../shared/rules.service';

@Component({
  selector: 'app-signature-form',
  standalone: true,
  imports: [
    DxFormModule,
    DxSelectBoxModule,
    DxRadioGroupModule,
    DxNumberBoxModule,
    DxButtonModule,
    DxSwitchModule
  ],
  templateUrl: './signature-form.component.html'
})
export class SignatureFormComponent implements OnInit, OnChanges{

  @Input() signatures: Signature[] = [];
  @Input() showGroupingSwitch = false;
  @Input() ruleNumber: number | null = null;
  @Output() save = new EventEmitter<Signature>();

  existingSignatureNumbers: number[] = [];
  groupWithExisting = false;
  SignatureByType = SignatureByType;

//////////////////////////////
  constructor( private ruleService:RulesService) {}
 ngOnInit() {
  this.refreshNumbers();
}

ngOnChanges() {
  this.refreshNumbers();
}

 refreshNumbers() {
  this.updateExistingNumbers();
  this.updateSignatureNumber();
}


private updateExistingNumbers() {
  this.existingSignatureNumbers = [
    ...new Set(
      this.signatures
        .map(s => s.signatureNumber)
        .filter((n): n is number => n !== null) // ⭐ type guard
    )
  ].sort((a, b) => a - b);
}

  private updateSignatureNumber() {

  // if parallel ON → don't auto-generate
  if (this.groupWithExisting) return;

  if (!this.signatures.length) {
    this.signatureForm.signatureNumber = 1;
    return;
  }

  const max = Math.max(...this.signatures.map(s => s.signatureNumber!));
  this.signatureForm.signatureNumber = max + 1;
}

setParallel(value: boolean) {
  this.groupWithExisting = value;

  if (value) {
    // default select first existing number
    this.signatureForm.signatureNumber =
      this.existingSignatureNumbers[0] ?? 1;
  } else {
    this.updateSignatureNumber();
  }
}

///////////////////////////////////////

  propertyOption = { dataSource : ['Approval', 'Review', 'Verification']};
  stateOption = { dataSource : ['Jordan', 'Remote', 'On-site'] };
  numRecursiveLevelsOption = { dataSource:[1, 2, 3, 4, 5] };
  startRecursiveLevelOption = { dataSource: [1, 2, 3] };
  roleOption = { dataSource : ['Employee', 'Manager', 'HR', 'Finance'] };
  adminUnitOption = { dataSource : ['Human Resources', 'Finance', 'IT', 'Operations'] };
  positionOption = { dataSource: ['Active', 'Temporary', 'Delegated'] };
  gradeOption = { dataSource:['Entry Level', 'Mid Level', 'Senior Level'] };

 signatureForm: {
  id?: string;
  signatureNumber: number;
  byType: SignatureByType;
  property: string | null;
  position: string | null;
  state: string | null;
  role: string | null;
  adminUnit: string | null;
  grade: string | null;
  numRecursiveLevels: number | null;
  startRecursiveLevel: number | null;
} = {
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
  id: formValue.id,
  signatureNumber: formValue.signatureNumber,
  ruleNumber: this.ruleNumber,
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
          positionState: formValue.state,
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
}

}