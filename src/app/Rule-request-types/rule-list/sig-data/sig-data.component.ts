import { Component, Input } from '@angular/core';
import { Signature } from '../../../shared/rules.interface';

@Component({
  selector: 'app-sig-data',
  standalone: true,
  templateUrl: './sig-data.component.html',
})
export class SigDataComponent {

  @Input() signatures: Signature[] = [];

get hasParallel(): boolean {
  const nums = this.signatures.map(s => s.signatureNumber);
  return new Set(nums).size !== nums.length;
}
  get grouped() {
    const groups: Record<number, Signature[]> = {};

    for (const sig of this.signatures) {
      const key = sig.signatureNumber ?? 0;

      if (!groups[key]) {
        groups[key] = [];
      }

      groups[key].push(sig);
    }

    return Object.keys(groups)
      .map(num => ({
        number: Number(num),
        items: groups[Number(num)]
      }))
      .sort((a, b) => a.number - b.number);
  }

}
