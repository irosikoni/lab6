export interface Trip {
  id: string;
  name: string;
  country: string;
  start: string;
  end: string;
  unitPrice: number;
  limit: number;
  taken: number;
  rating: number;
  description: string;
  photo: string;
  photo2?: string;
  photo3?: string;
}
