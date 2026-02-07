import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { DxPopupModule, DxSwitchComponent } from 'devextreme-angular';
import { Signature } from '../../../shared/rules.interface';
import { SignatureFormComponent } from '../signature-form/signature-form.component';
import { NgTemplateOutlet, NgIf } from '@angular/common';
import { SignatureByType } from '../../../shared/enum/sig-by-type.enum';

@Component({
  selector: 'app-signature-popup',
  standalone: true,
  imports: [DxPopupModule, SignatureFormComponent],
  templateUrl: './signature-popup.component.html'
})
export class SignaturePopupComponent {

  
  @Input() visible = false;
  @Input() contentTemplate!: TemplateRef<any>;
  @Input() ruleNumber: number | null = null;
  @Input() signatures: Signature[] = [];
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<Signature>();

  @Input() editingSignature: Signature | null = null;


  @ViewChild(SignatureFormComponent)
form!: SignatureFormComponent;

private detectByType(sig: Signature): SignatureByType{
  if (sig.role) return SignatureByType.ROLE;
  if (sig.adminUnit || sig.grade) return SignatureByType.ORGANIZATION;
  return SignatureByType.DESIGNATION;
}

onShown() {
  this.form?.refreshNumbers();

  if (!this.editingSignature) return;

  this.form.signatureForm = {
    id: this.editingSignature.id,   // ⭐⭐⭐ THIS WAS MISSING
    signatureNumber: this.editingSignature.signatureNumber ?? 1,
    byType: this.detectByType(this.editingSignature),

    property: this.editingSignature.property,
    position: this.editingSignature.position,
    state: this.editingSignature.positionState,
    role: this.editingSignature.role,
    adminUnit: this.editingSignature.adminUnit,
    grade: this.editingSignature.grade,

    numRecursiveLevels: this.editingSignature.recursiveLevels,
    startRecursiveLevel: this.editingSignature.startRecursiveLevel
  };
}

  close() {
    this.visibleChange.emit(false);
  }

  onSave(signature: Signature) {
    this.save.emit(signature);
    this.close();
  }


}
