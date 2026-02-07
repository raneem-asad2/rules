import { Component,  } from "@angular/core";
import { DxButtonModule,  DxDataGridModule } from "devextreme-angular";
import { ToolbarComponent } from "../../shared/toolbar/toolbar.component";
import { RuleCardComponent } from "./rule-card/rule-card.component";
import { RulesService } from '../../shared/rules.service';
import { Rule, RuleData, Signature } from "../../shared/rules.interface";
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [DxButtonModule,
            ToolbarComponent, 
            RuleCardComponent,
            DxDataGridModule, 
            RouterOutlet],
  templateUrl: './rule-list.component.html',
})
export class RuleListComponent {

  rules : RuleData[] = [];
  signatures :Signature[] = [];

  rule : Rule[] =[];
  detailsOpen = false;

  constructor(
  private rulesService: RulesService,
  private router: Router,
  private route: ActivatedRoute
) {}


  ngOnInit() {
    this.rulesService.rules$.subscribe(rules => {this.rules = rules});
    console.log('Rules in list:', this.rules);
  }

closeDetails() {
  this.router.navigate(['/rules']);
}

onActivate() {
  this.detailsOpen = true;
}

onDeactivate() {
  this.detailsOpen = false;
  this.rules = this.rulesService.getRules();
  
  this.signatures = this.rules.length > 0 
    ? this.rulesService.getRuleSignatures(this.rules[1].ruleNumber) 
    : [];

  console.log('rules from the rule details page' , this.rules);
  console.log('signatures from the rule details page ' , this.signatures);
}

//   openDetails() {
//   this.router.navigate(['rules/details']);
// }

addRule() {
  this.router.navigate(['details'], { relativeTo: this.route });
}

editRule(id: number) {
  this.router.navigate(['details', id], { relativeTo: this.route });
}

viewRule(id: number) {
  this.router.navigate(['details', id, 'view'], { relativeTo: this.route });
}

deleteRule(id: number) {
  this.rulesService.deleteRule(id);
}
}
