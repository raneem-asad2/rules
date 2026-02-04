import { Component } from '@angular/core';
import { DxFormModule, DxButtonComponent } from 'devextreme-angular';
import { ToolbarComponent } from "../../shared/toolbar/toolbar.component";
import { RulesService } from '../../shared/rules.service';
import { Router } from '@angular/router';
import { RuleData, Signature } from '../../shared/rules.interface';
import { SignatureFormComponent } from "./signature-form/signature-form.component";
import { SignatureCardComponent } from "./signature-card/signature-card.component";
import { SignaturePopupComponent } from "./signature-popup/signature-popup.component";

@Component({
  selector: 'app-rule-details',
  standalone: true,
  imports: [DxFormModule,
    ToolbarComponent,
    SignatureFormComponent,
    DxButtonComponent,
    SignatureCardComponent, SignaturePopupComponent],
  templateUrl: './rule-details.component.html',
})

export class RuleDetailsComponent {

  signatures :Signature[] = [];
  showSignaturePopup = false;

  rules: RuleData = {
    ruleNumber: null,
    adminUnit: null,
    vacationType: null,
    position: null,
    grade: null,
    role: null,
    employeeType: null,
    basedOn: null,
    withPayment: false
  };

  adminUnits = ['Human Resources', 'Finance', 'IT', 'Operations'];
  vacationTypes = ['Annual', 'Sick', 'Unpaid'];
  positions = ['Administrative Assistant', 'Manager', 'Analyst'];
  grades = ['Entry Level', 'Mid Level', 'Senior Level'];
  roles = ['Employee', 'Manager', 'HR'];
  employeeTypes = ['Full Time', 'Part Time', 'Contract'];
  basedOnOptions = ['Days', 'Hours'];

  adminUnitOptions!: any;
  vacationTypeOptions!: any;
  positionOptions!: any;
  gradeOptions!: any;
  roleOptions!: any;
  employeeTypeOptions!: any;
  basedOnSelectOptions!: any;

  constructor(
    private ruleService:RulesService,
    private router: Router,
  ) {
    this.initSelectOptions();
  }

  initSelectOptions() {

    this.adminUnitOptions = {
      items: this.adminUnits,
      placeholder: 'Select admin unit',
      elementAttr: { style: 'margin-bottom:20px' }
    };

    this.vacationTypeOptions = {
      items: this.vacationTypes,
      placeholder: 'Select vacation type',
      elementAttr: { style: 'margin-bottom:20px' }
    };
    

    this.positionOptions = {
      items: this.positions,
      placeholder: 'Select position',
      elementAttr: { style: 'margin-bottom:20px' }
    };

    this.gradeOptions = {
      items: this.grades,
      placeholder: 'Select grade',
      elementAttr: { style: 'margin-bottom:20px' }
    };

    this.roleOptions = {
      items: this.roles,
      placeholder: 'Select role',
      elementAttr: { style: 'margin-bottom:20px' }
    };

    this.employeeTypeOptions = {
      items: this.employeeTypes,
      placeholder: 'Select employee type',
      elementAttr: { style: 'margin-bottom:20px' }
    };

    this.basedOnSelectOptions = {
      items: this.basedOnOptions,
      placeholder: 'Based on',
      elementAttr: { style: 'margin-bottom:20px' }
    };
  }

 saveRule() {
  const savedRule = this.ruleService.addRule({ ...this.rules });
  this.signatures.forEach(sig => {
    this.ruleService.addSignature({
      ...sig,
      ruleNumber: savedRule.ruleNumber
    });
  });

  this.router.navigate(['/rules']);
}


openSignaturePopup() {
  this.showSignaturePopup = true;
}

onSignatureSaved(signature: Signature) {
  this.signatures.push({
    ...signature,
    ruleNumber: this.rules.ruleNumber  
  });
}

}
