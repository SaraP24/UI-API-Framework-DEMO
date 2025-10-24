export type PetStatus = 'available' | 'pending' | 'sold';

export interface IPet {
  id: number;
  name: string;
  status: PetStatus;
  photoUrls?: string[];
  category?: {
    id: number;
    name: string;
  };
  tags?: Array<{
    id: number;
    name: string;
  }>;
}

export interface IOrder {
  id: number;
  petId: number;
  quantity: number;
  shipDate: string;
  status: 'placed' | 'approved' | 'delivered';
  complete: boolean;
}