import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DxPopupModule } from 'devextreme-angular';
import { Signature } from '../../../shared/rules.interface';
import { SignatureFormComponent } from '../signature-form/signature-form.component';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-signature-popup',
  standalone: true,
  imports: [DxPopupModule, SignatureFormComponent, NgTemplateOutlet],
  templateUrl: './signature-popup.component.html'
})
export class SignaturePopupComponent {

  @Input({ required: true }) visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  @Output() save = new EventEmitter<Signature>();

  close() {
    this.visibleChange.emit(false);
  }

  onSave(signature: Signature) {
    this.save.emit(signature);
    this.close();
  }
}
