export namespace caremarksdk {

  export interface Header {
    StatusDescription: string;
    RefId?: string;
    StatusCode: string;
    Details: any;
  }

  export interface CommonParam {
    env?: string;
    tokenId: string;
    apiKey: string;
    apiSecret: string;
    appName?: string;
    channelName?: string;
    deviceType?: string;
    memberInfo: any;
  }

  export interface MemberInfoResult {
    Results: any;
  }

  export interface Refills {
    cardholderInternalID: string;
    dateOfBirth: string;
    externalID: string;
    internalID: string;
    relationShipCode: string;
    canAutoRefill: string;
    canAutoRenew: string;
    rxRefills: RxRefills[];
  }

  export interface RxRefills {
    autoRefill: string;
    autoRefillEligible: string;
    autoRenew: string;
    autoRenewalEligible: string;
    daysSupplyQuantity: string;
    dispensedQuantitiy: string;
    displayRxNumber: string;
    estimatedCost: string;
    expirationDate: string;
    lastFillDate: string;
    maintenanceChoice: string;
    onlyAuto: string;
    orderInProgress: string;
    patientName: string;
    payAmount: string;
    prescriberFirstName: string;
    prescriberLastName: string;
    prescriberNpiKey: string;
    refillable: string;
    refillsLeft: string;
    rxNumber: string;
    tooSoonToRefill: string;
    transferable: string;
    orderNumber: string;
    fromRefills: string;
    canAutoRefill: string;
    canAutoRenew: string;
    refillStatusText: string;
    drug: Drug;
  }

  export interface Drug {
    drugName: string;
    coldPack: string;
    deaClassCode: string;
    controlledSubstance: string;
    drugForm: string;
    drugStrength: string;
    gpiCode: string;
    ndcId: string;
    sensitive: string;
  }
}
