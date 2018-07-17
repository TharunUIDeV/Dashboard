
export interface CaremarkDataServiceInterface {
  getOrderStatus(): Promise<any>;
  getRefills(): Promise<any>;
  getRefillsCount(): Promise<any>;
  getMemberDetails(): Promise<any>;
  getDrugByName?(searchText): any;
  getDefaultPharmacy?(): any;
  getPznByIdAndResource(params: any): Promise<any>;
}


