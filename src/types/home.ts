export interface item {
  regionName: string;
  regionCode: string;
  orgCode: string;
  orgName: string;
  scenesName: string;
  subHead: string;
  flowId: string;
  flowName: string;
  serviceObj: string;
  declareUrl: string;
  img: string;
}

export interface itemChildren {
  name: string;
  org: string;
  icon: any;
}

export interface evalDataType {
  appCode: string;
  appName: string;
  regCode: string;
  regName: string;
}
