import { Component, Input, EventEmitter, output, Output } from '@angular/core';
import { RuleData } from '../rules.interface';

@Component({
  selector: 'app-action-buttons',
  imports: [],
  templateUrl: './action-buttons.component.html',
})
export class ActionButtonsComponent {

  @Input() ruleData!: RuleData;
  @Output() view =new EventEmitter<any>();
  @Output() edit =new EventEmitter<any>();
  @Output() delete =new EventEmitter<any>();
  constructor() {}


onView() {
  this.view.emit(this.ruleData.ruleNumber!);
}

onEdit() {
  this.edit.emit(this.ruleData.ruleNumber!);
}

onDelete() {
  this.delete.emit(this.ruleData.ruleNumber!);
}}
