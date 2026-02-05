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

  adminUnitOptions!: any;
  vacationTypeOptions!: any;
  positionOptions!: any;
  gradeOptions!: any;
  roleOptions!: any;
  employeeTypeOptions!: any;
  basedOnSelectOptions!: any;

  constructor(
    public ruleService:RulesService,
    private router: Router,
  ) {
    this.initSelectOptions();
  }

  ngOnInit() {
  this.rules.ruleNumber = this.ruleService.getNextRuleNumber();
}

  initSelectOptions() {

    this.adminUnitOptions = {
      dataSource:['Human Resources', 'Finance', 'IT', 'Operations'],
      placeholder: 'Select admin unit',
      elementAttr: { style: 'margin-bottom:20px' }
    };

    this.vacationTypeOptions = {
      dataSource:['Annual', 'Sick', 'Unpaid'],
      placeholder: 'Select vacation type',
      elementAttr: { style: 'margin-bottom:20px' }
    };
    

    this.positionOptions = {
      dataSource:['Administrative Assistant', 'Manager', 'Analyst'],
      placeholder: 'Select position',
      elementAttr: { style: 'margin-bottom:20px' }
    };

    this.gradeOptions = {
      dataSource : ['Entry Level', 'Mid Level', 'Senior Level'],
      placeholder: 'Select grade',
      elementAttr: { style: 'margin-bottom:20px' }
    };

    this.roleOptions = {
      dataSource: ['Employee', 'Manager', 'HR'],
      placeholder: 'Select role',
      elementAttr: { style: 'margin-bottom:20px' }
    };

    this.employeeTypeOptions = {
      dataSource:['Full Time', 'Part Time', 'Contract'],
      placeholder: 'Select employee type',
      elementAttr: { style: 'margin-bottom:20px' }
    };

    this.basedOnSelectOptions = {
      dataSource : ['Days', 'Hours'],
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
  this.signatures.push(signature);
  console.log('LOCAL signatures:', this.signatures);
}

get displayedSignatures(): Signature[] {
  if (this.signatures.length > 0) {
    return this.signatures;
  }

  return this.rules.ruleNumber
    ? this.ruleService.getRuleSignatures(this.rules.ruleNumber)
    : [];
}


get groupedSignatures(): { number: number; items: Signature[] }[] {
  const source = this.displayedSignatures;

  const groups: Record<number, Signature[]> = {};

  for (const sig of source) {
    const key = sig.signatureNumber ?? 0;

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(sig);
  }

  return Object.keys(groups)
    .map(n => ({
      number: Number(n),
      items: groups[Number(n)]
    }))
    .sort((a, b) => a.number - b.number);
}
}
