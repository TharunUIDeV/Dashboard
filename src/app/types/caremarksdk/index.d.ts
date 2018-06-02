export namespace caremarksdk {

  export interface OrderStatusParam extends CommonParam {
    historyCount?: string;
    historyMetric?: string;
    startDate?: string;
    endDate?: string;
  }

  export interface OrderStatusResult {
    Results: Order[];
  }

  export interface Order {
    OrderDate: string;
    OrderNumber: string;
    OrderType: string;
    ParentOrderNumber: string;
    ParticipantID: string;
    PayAmount: string;
    ShipMethod: string;
    ShipMethodDescription: string;
    ShipperName: string;
    ShippingCost: string;
    TrackingNumber: string;
    TrackingURL: string;
    ElectronicPaymentAccount: ElectronicPaymentAccount;
    ShippingAddress: ShippingAddress;
    PrescriptionList: Prescription[];
  }

  export interface ElectronicPaymentAccount {
    CreditCardNumber: string;
    PreferredAccount: string;
    PaymentTypeCode: string;
    ExclusivityIndicatorCode: string;
    PreferredIndicatorCode: string;
    FsaIndicatorCode: string;
    FsaCodeTwo: string;
  }

  export interface ShippingAddress {
    FirstName: string;
    LastName: string;
    Line1: string;
    Line2: string;
    City: string;
    State: string;
    ZipCode: string;
    ZipCodeSuffix: string;
  }

  export interface Prescription {
    DoctorFullName: string;
    DrugDosage: string;
    DrugName: string;
    DrugStrength: string;
    ExpirationDate: string;
    FillDate: string;
    FutureFillDate: string;
    GenericAvailable: string;
    GPICode: string;
    LastStatusDate: string;
    MemberAction: string;
    NdcId: string;
    ParticipantID: string;
    PatientFirstName: string;
    PatientLastName: string;
    DateOfBirth: string;
    PayAmount: string;
    RxFillList: RxFill[];
    Status: string;
    StatusDescription: string;
    StatusReasonCode: string;
    StatusReasonDescription: string;
  }

  export interface RxFill {
    RxNumber: string;
    PriorPBMFlag: string;
    DaysSupply: string;
    DispensedQuantity: string;
  }


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
    estimatedCost: string;
    expirationDate: string;
    lastFillDate: string;
    maintenanceChoice: string;
    patientName: string;
    payAmount: string;
    prescriberFirstName: string;
    prescriberLastName: string;
    prescriberNpiKey: string;
    refillable: string;
    refillsLeft: string;
    rxNumber: string;
    tooSoonToRefill: string;
    orderNumber: string;
    fromRefills: string;
    canAutoRefill: string;
    canAutoRenew: string;
    refillStatusText: string;
    renewStatusText: string;
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
