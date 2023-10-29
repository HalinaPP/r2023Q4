export interface ApiData {
  name: string;
  url: string;
}

export interface ApiResults {
  count: number;
  data: ApiData[];
}

export interface ApiResultInfo {
  next: string;
  previous: string;
  count: number;
  results: ApiData[];
}
