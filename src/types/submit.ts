export interface submit_type {
  flowId: string;
  receiveId?: string;
  selectItem: selectItemItem_type[];
  serviceObj: string;
  dataId: string;
  applyObj: applyObj_type;
  material: materialItem_type[];
  emsInfo: emsInfo_type;
  resEms: resEms_type;
}

export interface selectItemItem_type {
  itemId: string;
  caseId: string;
  dataId: string;
}

export interface applyObj_type {
  //  个人数据
  name: string;
  sex: string;
  address: string;
  certNo: string;
  certType: string;
  phone: string;
  isAgent: string;
  //  企业数据
  orgName: string;
  orgCode: string;
  orgType: string;
  linkMan: string;
  linkTelephone: string;
  linkEmail: string;
  linkAddress: string;
  linkMancertificateName: string;
  linkMancertificateNo: string;
  legalPerson: string;
  contactPhone: string;
  certificateNo: string;
  certificateName: string;
}

export interface materialItem_type {
  resourceCode: string;
  resourceType: string;
  itemId: string;
  itemCode: string;
  fileName: string;
  filePath: string;
  fileType: string;
  certificateCode: string;
}

export interface emsInfo_type {
  isEms: string;
  emsName: string;
  emsAddress: string;
  emsPhone: string;
  emsAcceptPostCode: string;
  provinceName: string;
  cityName: string;
  countyName: string;
  sendName: string;
  sendPhone: string;
  sendAddress: string;
}

export interface resEms_type {
  isEms: string;
  emsName: string;
  emsAddress: string;
  emsPhone: string;
  sender: string;
  senderPhone: string;
  emsAcceptPostCode: string;
  provinceName: string;
  cityName: string;
  county: string;
  addressDetail: string;
}
