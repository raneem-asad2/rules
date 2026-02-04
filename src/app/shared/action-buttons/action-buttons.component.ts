import { Component, Input, EventEmitter, output, Output } from '@angular/core';

@Component({
  selector: 'app-action-buttons',
  imports: [],
  templateUrl: './action-buttons.component.html',
})
export class ActionButtonsComponent {

  @Input() ruleData!: any;
  @Output() view =new EventEmitter<any>();
  @Output() edit =new EventEmitter<any>();
  @Output() delete =new EventEmitter<any>();
  constructor() {}

  onView() {
    this.view.emit(this.ruleData);
  }

  onEdit(){
    this.edit.emit(this.ruleData)
  }

  onDelete(){
    this.delete.emit(this.ruleData)
  }
}
