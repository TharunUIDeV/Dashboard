
export interface CaremarkDataServiceInterface {
  getOrderStatus(): Promise<any>;
  getRefills(): Promise<any>;
  getRefillsCount(): Promise<any>;
  getMemberDetails(): Promise<any>;
  getPznByIdandResource?(pznId, resourceTag, deliveryResourceTag): Promise<any>;
}


