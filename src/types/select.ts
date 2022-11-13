export interface detailDataItem_type {
  select?: string[] | string;
  statusId: string;
  statusName: string;
  order: string;
  statusMode: string;
  remark: string;
  must: string;
  num: string;
  items: detailDataItemItems_type[];
}

export interface detailDataItemItems_type {
  itemCode: string;
  itemId: string;
  itemName: string;
  itemType: string;
  orgCode: string;
  orgName: string;
  pushUrl: string;
  resultName: string;
}
