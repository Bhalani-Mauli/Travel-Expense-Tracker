export interface Group {
  _id: string;
  name: string;
  members: string[];
  description: string;
  split: { [key: string]: number };
  total: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Expense {
  _id: string;
  paidBy: string;
  totalAmount: number;
  amountPerUser: number;
  currency: string;
  description: string;
  groupId: string;
  __v: number;
  userInfo: any[];
  createdAt: string;
  updatedAt: string;
}

export interface Settlement {
  data: Array<Array<number | string>>;
}
