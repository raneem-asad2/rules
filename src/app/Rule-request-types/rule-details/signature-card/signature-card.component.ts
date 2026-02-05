import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Signature } from '../../../shared/rules.interface';
import { RulesService } from '../../../shared/rules.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-signature-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signature-card.component.html',
  styles: ``
})
export class SignatureCardComponent {

  @Input() groupedSignatures: { number: number; items: Signature[] }[] = [];
  @Input() signatures: Signature[] | null = null;

  
constructor(private ruleService:RulesService,
  private router: Router,
) { }



}
