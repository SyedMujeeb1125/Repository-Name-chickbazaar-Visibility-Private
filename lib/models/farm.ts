export interface Farm {
  id: string;

  farmName: string;

  ownerName: string;

  mobile: string;

  zone: string;

  address: string;

  status:
    | "new"
    | "approved"
    | "inactive";
}