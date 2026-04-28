export type Price = {
  value: number;
  symbol: string;
  isDefault: boolean;
};

export type Guarantee = {
  start: string;
  end: string;
};

export type Product = {
  id: number;
  serialNumber: number;
  isNew: boolean; 
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee: Guarantee;
  prices: Price[];
  incoming: string;
  group: string;
  person: string;
  order: number;
  date: string;
};