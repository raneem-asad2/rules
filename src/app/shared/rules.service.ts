import { Injectable } from "@angular/core";
import { Rule, RuleData, Signature } from "./rules.interface";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class RulesService {

  private RULES_KEY = 'rules';
  private SIGNATURES_KEY = 'signatures';


private rulesSubject = new BehaviorSubject<RuleData[]>(this.loadRules());
rules$ = this.rulesSubject.asObservable();

  private loadRules(): RuleData[] {
    return JSON.parse(localStorage.getItem(this.RULES_KEY) || '[]');
  }

  private saveRules(rules: RuleData[]) {
    localStorage.setItem(this.RULES_KEY, JSON.stringify(rules));
  }

  getNextRuleNumber(): number {
    const rules = this.loadRules();
    return rules.length ? Math.max(...rules.map(r => r.ruleNumber!)) + 1 : 1;
  }

  addRule(rule: RuleData): RuleData {
    const rules = this.loadRules();

    const newRule: RuleData = {
      ...rule,
      ruleNumber: this.getNextRuleNumber()
    };

    rules.push(newRule);
    this.saveRules(rules);
    this.rulesSubject.next(rules);

    return newRule;
  }

  getRules(): RuleData[] {
    return this.loadRules();
  }

  private loadSignatures(): Signature[] {
    return JSON.parse(localStorage.getItem(this.SIGNATURES_KEY) || '[]');
  }

  private saveSignatures(signatures: Signature[]) {
    localStorage.setItem(this.SIGNATURES_KEY, JSON.stringify(signatures));
  }

  addSignature(signature: Signature): Signature {
    const signatures = this.loadSignatures();

    if (!signature.signatureNumber) {
      const nums = signatures
        .filter(s => s.ruleNumber === signature.ruleNumber)
        .map(s => s.signatureNumber!);

      signature.signatureNumber = nums.length ? Math.max(...nums) + 1 : 1;
    }

    signatures.push(signature);
    this.saveSignatures(signatures);

    return signature;
  }

  getRuleSignatures(ruleNumber: number | null): Signature[] {
    if (!ruleNumber) return [];
    return this.loadSignatures().filter(s => s.ruleNumber === ruleNumber);
  }

  getExistingSignatureNumbers(ruleNumber: number | null): number[] {
  if (!ruleNumber) return [];

  const nums = this.loadSignatures()
    .filter(s => s.ruleNumber === ruleNumber)
    .map(s => s.signatureNumber!)
    .filter((n, i, arr) => arr.indexOf(n) === i); // unique

  return nums.sort((a, b) => a - b);
}


 buildRulePayload(ruleNumber: number): Rule {
  const rule = this.loadRules().find(r => r.ruleNumber === ruleNumber);

  if (!rule) {
    throw new Error(`Rule ${ruleNumber} not found`);
  }

  return {
    ruleData: rule,
    signatures: this.getRuleSignatures(ruleNumber)
  };
}

}
