import { Component } from '@angular/core';
import { DxFormModule, DxButtonComponent } from 'devextreme-angular';
import { ToolbarComponent } from "../../shared/toolbar/toolbar.component";
import { RulesService } from '../../shared/rules.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RuleData, Signature } from '../../shared/rules.interface';
import { SignatureFormComponent } from "./signature-form/signature-form.component";
import { SignatureCardComponent } from "./signature-card/signature-card.component";
import { SignaturePopupComponent } from "./signature-popup/signature-popup.component";
import { RulePageMode } from '../../shared/enum/rule-page-mode.enum';

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

  mode: RulePageMode = RulePageMode.ADD;
  RulePageMode = RulePageMode;


  editingSignature: Signature | null = null;

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
    private route: ActivatedRoute
  ) {
    this.initSelectOptions();
  }

  ngOnInit() {
  this.rules.ruleNumber = this.ruleService.getNextRuleNumber();

  const id = this.route.snapshot.paramMap.get('id');

  // ADD
  if (!id) {
    this.mode = RulePageMode.ADD;
    this.rules.ruleNumber = this.ruleService.getNextRuleNumber();
    return;
  }

  const ruleNumber = Number(id);

  // VIEW or EDIT
  if (this.route.snapshot.url.some(s => s.path === 'view')) {
    this.mode = RulePageMode.VIEW;
  } else {
    this.mode = RulePageMode.EDIT;
  }

  const payload = this.ruleService.buildRulePayload(ruleNumber);
  this.rules = payload.ruleData;
  this.signatures = payload.signatures;
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

  if (this.mode === RulePageMode.VIEW) return;


  if (this.mode === RulePageMode.ADD) {
    const savedRule = this.ruleService.addRule({ ...this.rules });

    this.signatures.forEach(sig =>
      this.ruleService.addSignature({
        ...sig,
        ruleNumber: savedRule.ruleNumber
      })
    );
  }


  if (this.mode === RulePageMode.EDIT) {

    this.ruleService.deleteRule(this.rules.ruleNumber);

    const savedRule = this.ruleService.addRule({ ...this.rules });

    this.signatures.forEach(sig =>
      this.ruleService.addSignature({
        ...sig,
        ruleNumber: savedRule.ruleNumber
      })
    );
  }

  this.router.navigate(['/rules']);
}


openSignaturePopup(signature?: Signature) {
  this.editingSignature = signature ?? null;
  this.showSignaturePopup = true;
}


onSignatureSaved(signature: Signature) {

  if (this.editingSignature) {
    // EDIT
    this.ruleService.updateSignature(signature);
    this.editingSignature = null;

  } else {
    // ADD  ← 🔥 MUST go through service
    this.ruleService.addSignature(signature);
  }

  // always reload from service
  this.signatures = this.ruleService.getRuleSignatures(this.rules.ruleNumber);
}


get displayedSignatures(): Signature[] {
  return this.signatures;
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

deleteSignature(signature: Signature) {
  this.ruleService.deleteSignature(signature);
  this.signatures = this.ruleService.getRuleSignatures(this.rules.ruleNumber);
}

}
