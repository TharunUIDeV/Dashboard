
export interface OrderStatus {
  OrderNumber: string;
  OrderType: string;
  OrderDate: string;
  OrderStatus: string;
  ParticipantID: string;
  OrderedFor: string;
  RxFills: number;
  RxList: RxInfo[];
}

export interface RxInfo {
  DoctorFullName: string;
  DrugDosage: string;
  DrugName: string;
  DrugStrength: string;
  ParticipantID: string;
  PatientFirstName: string;
  PatientLastName: string;
  DateOfBirth: string;
  Status: string;
  StatusReasonCode: string;
  StatusPriority: string;
  StatusDescription: string;
}
