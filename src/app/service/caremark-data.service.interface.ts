
export interface CaremarkDataServiceInterface {
  getOrderStatus(): Promise<any>;
  getRefills(): Promise<any>;
  getRefillsCount(): Promise<any>;
  getMemberDetails(): Promise<any>;
  getPznByIdAndResource(params: any): Promise<any>;
}


