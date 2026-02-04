export interface RuleData {
    ruleNumber: number | null;
    adminUnit: string | null;
    vacationType: string | null;
    position: string | null;
    grade: string | null;
    role: string | null;
    employeeType: string | null;
    basedOn: string | null;
    withPayment: boolean;
}



export interface Signature{

    signatureNumber :number | null;
    property: string | null;
    ruleNumber: number | null; 
    role: string | null;
    positionState: string | null;
    recursiveLevels: number | null;
    startRecursiveLevel: number | null;
    grade: string | null;
    position: string | null;
    adminUnit: string | null;
}

export interface Rule {
    ruleData: RuleData;
    signatures: Signature[];
}
