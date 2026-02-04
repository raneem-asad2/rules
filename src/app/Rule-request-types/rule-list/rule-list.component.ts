import { Component,  } from "@angular/core";
import { DxButtonModule,  DxDataGridModule } from "devextreme-angular";
import { ToolbarComponent } from "../../shared/toolbar/toolbar.component";
import { RuleCardComponent } from "./rule-card/rule-card.component";
import { RulesService } from '../../shared/rules.service';
import { Rule, RuleData, Signature } from "../../shared/rules.interface";
import { Router, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [DxButtonModule, ToolbarComponent, RuleCardComponent, DxDataGridModule, RouterOutlet],
  templateUrl: './rule-list.component.html',
})
export class RuleListComponent {

  rules : RuleData[] = [];
  signatures :Signature[] = [];

  rule : Rule[] =[];
  detailsOpen = false;

  constructor(private rulesService:RulesService,
     private router: Router
  ) { }

  ngOnInit() {
    this.rules = this.rulesService.getRules();
    console.log('Rules in list:', this.rules);
  }

closeDetails() {
  this.router.navigate(['/rules']);
}

onDetailsActivate() {
  this.detailsOpen = true;
}

onDetailsDeactivate() {
  this.detailsOpen = false;
  this.rules = this.rulesService.getRules();
  this.signatures = this.rulesService.getSignatures();
  console.log('rules from the rule details page ' , this.rules);
  console.log('signatures from the rule details page ' , this.signatures);
}
  openDetails() {
  this.router.navigate(['rules/details']);
}
}
