export namespace IceSdk {

  interface Response {
    detail: Detail;
    header: Header;
  }

  interface Header {
    refId: string;
    statusCode: string;
    statusDescription: string;
  }

  interface Detail {
    hmac: string;
    prescriptionHistoryDetails: PrescriptionHistoryDetails;
    timestamp: string;
    tokenID: string;
  }

  interface PrescriptionHistoryDetails {
    dynamicPromoElements: DynamicPromoElements;
    patients: Patients;
    statusSummary: StatusSummary;
  }

  interface StatusSummary {
    dashboardReadyRefillCount: number;
    extendedHistoryCount: number;
    extendedHistoryCountAmos: number;
    ordersInProgressCount: number;
    patientFirstName: string;
    patientLastName: string;
    rxCount: number;
    rxExpiringCount: number;
    rxInProgressCount: number;
    rxInShipmentCount: number;
    rxPickedUpCount: number;
    rxReadyRefillCount: number;
    rxReadyToFillCount: number;
    rxReadyToPickupCount: number;
    rxUpcomingCount: number;
    rxWithOneRefillCount: number;
    scriptSyncCount: number;
  }

  interface Patients {
    patient: Patient[];
  }

  interface Patient {
    patientInfo: PatientInfo;
    prescriptionList: PrescriptionList;
    totalPatientCost: number | string;
  }

  interface PrescriptionList {
    encMemberIdentifier: string;
    lineOfBusinesIdentifier: string;
    memberIdentifier: string;
    prescription: Prescription | Prescription[];
  }

  interface Prescription {
    autoFillActive: string;
    autoFillEligible: string;
    autoRefillEnrollDate: string;
    autoRenewActive: string;
    autoRenewEligible: string;
    cardHolderID: string;
    daysSupply: number;
    drug: Drug;
    estimatedCost: string;
    expirationDate: string;
    fillHistory: FillHistory;
    fillQuantity: number;
    iceRxStatus: IceRxStatus;
    isHomeDelivery: string;
    issueDate: string;
    lastRefillDate: string;
    mailToRetailEligible: string;
    maintenanceChoiceIndicator: boolean | string;
    nextAutoRefillDate: string;
    nextFillDate: string;
    prescribedDrugName: string;
    prescribedQuantity: string;
    prescriber: Prescriber;
    prescriptionNumber: number;
    priorPbmRx: boolean;
    recentPrescription: boolean;
    refillDue: boolean;
    refillEligible: boolean;
    refillsRemaining: number;
    renewEligible: string;
    retailToMailEligible: string;
    rxCancelable: boolean;
    showOnDashboard: boolean;
    soonToExpireFlag: boolean;
    status: string;
    totalPrescriptionCost: number;
    transferable: string;
    upcomingPrescription: boolean;
  }

  interface Prescriber {
    address: Address;
    name: string;
    npiNumber: number | string;
    phoneNumber: string;
    prescriberCredential: string;
    prescriberFirstName: string;
    prescriberInitial: string;
    prescriberLastName: string;
    prescriberTitle: string;
  }

  interface FillHistory {
    fill: Fill;
  }

  interface Fill {
    claimNumber: number | string;
    claimSeqNumber: number | string;
    dawPenaltyAmount: number;
    deductibleAmount: number;
    fillStatus: string;
    fillType: number;
    fsaEligible: boolean | string;
    fsaFundedAmount: number;
    fulfilledBy: string;
    hraAppliedAmount: number;
    iceOrderStatus: string;
    installmentPaymentIndicator: boolean;
    lastPaymentAccountID: string;
    manufacturersDiscountFlag: boolean;
    numberOfChildOrders: number | string;
    orderDate: string;
    orderNumber: number;
    orderStatus: string;
    orderType: number | string;
    parentOrderNumber: number | string;
    patientPayAmount: number;
    pickupDate: string;
    planPaidAmount: number;
    planPaymentSource: string;
    prescriptionFillDate: string;
    primaryPlanPayAmount: number;
    secondaryPlanPayAmount: number;
    shipmentInfo: ShipmentInfo;
    storeNumber: string;
    subStatus: string;
    totalCopayAmount: number;
    totalPatientPaidAmount: number;
    totalRxCost: number;
    order?: Order;
  }

  interface Drug {
    NDCNumber: number;
    coldpackRequired: boolean | string;
    controlledSubstance: boolean;
    directions: string;
    drugForm: string;
    drugImage: string;
    drugName: string;
    drugStrengthQuantity: string;
    encDrugName: string;
    gcnCode: number;
    genericAvailable: boolean;
    genericEquivalantBrand: string;
    gpiCode: number;
    hiddenByUser: boolean;
    sensitive: boolean;
  }




  interface Address {
    city: string;
    country: string;
    line1: string;
    line2: string;
    state: string;
    zipCode: string;
    zipCodeSuffix: string;
  }

  interface IceRxStatus {
    date: string;
    iceOrderStatus: string;
    sortIndex: number;
    status: string;
    subStatus: string;
  }

  interface ShipmentInfo {
    lastShipAddress1: string;
    lastShipAddress2: string;
    lastShipAddressCity: string;
    lastShipAddressState: string;
    lastShipAddressZip: string;
    shipMethod: string;
    shippingCarrier: string;
    trackingNumber: string;
  }

  interface Order {
    balance: number;
    orderStatus: OrderStatus;
    trackingNumber: string;
    trackingURL: string;
  }

  interface OrderStatus {
    orderStatusAction: string;
    orderStatusDescription: string;
    orderStatusReasonCode: number;
    orderStatusText: string;
  }


  interface PatientInfo {
    dateOfBirth: string;
    memberIndex: number;
    patientFirstName: string;
    patientLastName: string;
  }

  interface DynamicPromoElements {
    dynamicPromoElement: DynamicPromoElement[];
  }

  interface DynamicPromoElement {
    content: boolean | number;
    name: string;
  }
}
