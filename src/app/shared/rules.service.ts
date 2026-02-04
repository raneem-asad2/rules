import { Injectable } from "@angular/core";
import { Rule, RuleData, Signature } from "./rules.interface";

@Injectable({
  providedIn: 'root'
})
export class RulesService {

  private rules: RuleData[] = [];
  private signatures: Signature[] = [];

  private nextRuleNumber = 1;
  private nextSignatureNumber = 1;


  addRule(rule: RuleData): RuleData {
    const newRule: RuleData = {
      ...rule,
      ruleNumber: rule.ruleNumber ?? this.nextRuleNumber++
    };

    this.rules.push(newRule);
    console.log('Rules only:', this.rules);

    return newRule;
  }

  getRules(): RuleData[] {
    return this.rules;
  }

  getNextRuleNumber(): number {
    return this.nextRuleNumber;
  }


  addSignature(signature: Signature): Signature {
    const newSignature: Signature = {
      ...signature,
      signatureNumber:
        signature.signatureNumber ?? this.nextSignatureNumber++
    };

    this.signatures.push(newSignature);
    console.log('Signatures only:', this.signatures);

    return newSignature;
  }

  getSignatures(): Signature[] {
    return this.signatures;
  }

  buildRulePayload(ruleNumber: number): Rule | null {
    const rule = this.rules.find(r => r.ruleNumber === ruleNumber);
    if (!rule) return null;

    return {
      ruleData: rule,
      signatures: this.signatures.filter(s => s.signatureNumber !== null) // later filter by ruleNumber if added
    };
  }
  

  
}
