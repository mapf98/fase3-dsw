export interface Address {
  id?: number
  firstStreet?: string;
  secondStreet?: string;
  cityName?: string;
  state?: string;
  zipcode?: string;
  default?: boolean;
  customer?: {
    id: number;
  };
  status?: {

    id: number;
  };
}
