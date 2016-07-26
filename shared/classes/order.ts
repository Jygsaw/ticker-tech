export class Order {
  id: number;
  user_id: number;

  listing_id: number;
  quantity: number;

  action: string;
  conditions: string[];
  status: string;
}
