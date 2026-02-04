import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { DxBoxModule, DxCardViewComponent } from "devextreme-angular";
import { SigDataComponent } from "../sig-data/sig-data.component";
import { ActionButtonsComponent } from '../../../shared/action-buttons/action-buttons.component';
import { RuleData, Signature } from '../../../shared/rules.interface';
import { RulesService } from '../../../shared/rules.service';

@Component({
  selector: 'app-rule-card',
  standalone:true,
  imports: [CommonModule,
    DxBoxModule,
    SigDataComponent, ActionButtonsComponent],
  templateUrl: './rule-card.component.html',
})
export class RuleCardComponent {

  
  @Input() rule!:RuleData;

  constructor(private rulesService :RulesService) {}

  getFilledData(data: any[]): any[] {
    return data.filter(item => item.value);
  }


  ngOnInit() {
  console.log('RuleCard received rule:', this.rule);
  }


  editRule(rule: any): void {
    console.log('Edit rule:', rule);
  }

  deleteRule(rule: any): void {
    console.log('Delete rule:', rule);
  }

  getSignaturesForRule(): Signature[] {
  return this.rulesService
    .getSignatures()
    .filter(sig => sig.ruleNumber === this.rule.ruleNumber);
}



  //   isApplyToAll(rule: any): boolean {
  //   return rule.isApplyToAll;
  // }

  //   showRuleDetails(rule: any): void {
  //   this.currentRule = rule;
  // }
}
