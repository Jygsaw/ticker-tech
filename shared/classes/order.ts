export class Order {
  id: number;
  user_id: number;

  quantity: number;
  listing_id: number;

  action: string;
  conditions: string[];
  status: string;
}
