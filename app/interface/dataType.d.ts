export interface ApiDataHookProps {
  selectedDate: Date;
  selectedCity: string;
  selectedFree: string;
  category: string | null;
}

interface ShowInfo {
  time: string;
  location: string;
  locationName: string;
  onSales: string;
  price: string;
  latitude: string;
  longitude: string;
  endTime: string;
}

export interface EventData {
  version: string;
  UID: string;
  title: string;
  category: string;
  showInfo: ShowInfo[];
  showUnit: string;
  discountInfo: string;
  descriptionFilterHtml: string;
  imageUrl: string;
  masterUnit: string[];
  subUnit: string[];
  supportUnit: string[];
  otherUnit: string[];
  webSales: string;
  sourceWebPromote: string;
  comment: string;
  editModifyDate: string;
  sourceWebName: string;
  startDate: string;
  endDate: string;
  hitRate: number;
}

export interface FilteredEventData {
  endTime: string;
  time: string;
  location: string;
  price: string;
}