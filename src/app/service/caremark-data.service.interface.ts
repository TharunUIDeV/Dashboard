
export interface CaremarkDataServiceInterface {
  getOrderStatus(): Promise<any>;
  getRefills(): Promise<any>;
  getMemberDetails(): Promise<any>;
}


