import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Signature } from '../../../shared/rules.interface';

@Component({
  selector: 'app-signature-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signature-card.component.html',
  styles: ``
})
export class SignatureCardComponent {

@Input({ required: true }) signatures!:Signature [];
  
}
