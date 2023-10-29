export interface ApiData {
  name: string;
  height: number;
  mass: number;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
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
