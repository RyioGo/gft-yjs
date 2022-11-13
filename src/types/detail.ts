export interface detail_type {
  flowId: string;
  flowName: string;
  formId: string;
  itemArray: Array<itemArray_type>;
  serviceObj: string;
}
export interface itemArray_type {
  condition: Array<{ name: string }>;
  formId: string;
  handleLevel: string;
  isMust: null;
  itemCode: string;
  itemId: string;
  itemName: string;
  itemServiceType: string;
  limitTime: number;
  limitType: string;
  orgCode: string;
  orgName: string;
  passType: string;
  resourceArray: Array<resourceArray_type>;
  resultName: string;
}
export interface resourceArray_type {
  resourceCode: string;
  resourceType: string;
  resourceName: string;
  licenceCode: string;
  licenceName: string;
  must: string;
  uploadFile?: any;
}
