
export interface OrderStatus {
  OrderNumber: string;
  OrderType: string;
  OrderDate: string;
  OrderStatus: string;
  ParticipantID: string;
  OrderedFor: string;
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
  StatusReasonDescription: string;
}
