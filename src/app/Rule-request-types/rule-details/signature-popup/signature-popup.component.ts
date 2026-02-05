import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { DxPopupModule, DxSwitchComponent } from 'devextreme-angular';
import { Signature } from '../../../shared/rules.interface';
import { SignatureFormComponent } from '../signature-form/signature-form.component';
import { NgTemplateOutlet, NgIf } from '@angular/common';

@Component({
  selector: 'app-signature-popup',
  standalone: true,
  imports: [DxPopupModule, NgTemplateOutlet, NgIf, SignatureFormComponent],
  templateUrl: './signature-popup.component.html'
})
export class SignaturePopupComponent {

  @Input() visible = false;
  @Input() contentTemplate!: TemplateRef<any>;
  @Input() ruleNumber: number | null = null;
  @Input() signatures: Signature[] = [];
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<Signature>();

  @ViewChild(SignatureFormComponent)
form!: SignatureFormComponent;

onShown() {
  this.form?.refreshNumbers();
}


  close() {
    this.visibleChange.emit(false);
  }

  onSave(signature: Signature) {
    this.save.emit(signature);
    this.close();
  }


}
