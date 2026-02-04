import { Component, Input } from '@angular/core';
import { Signature } from '../../../shared/rules.interface';
import { RulesService } from '../../../shared/rules.service';


@Component({
  selector: 'app-sig-data',
  standalone: true,
  templateUrl: './sig-data.component.html',
})
export class SigDataComponent {
  constructor(private rulesService: RulesService) {}


  @Input() signatures: Signature[] = [];

  ngOnChanges() {
  console.log('SIG DATA RECEIVED:', this.signatures);
}

}
