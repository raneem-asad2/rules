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

  @Input() rule!: RuleData;

  constructor(private rulesService: RulesService) {}

  /** expose signatures to template */
  get ruleSignatures(): Signature[] {
    return this.rulesService.getRuleSignatures(this.rule.ruleNumber);
  }

  editRule(rule: RuleData): void {
    console.log('Edit rule:', rule);
  }

  deleteRule(rule: RuleData): void {
    console.log('Delete rule:', rule);
  }
}
