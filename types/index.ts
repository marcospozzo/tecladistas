export interface ItemProps {
  id: number;
  userId: 112243;
  type: "product" | "service";
  condition: "news" | "used";
  category:
    | "keyboards"
    | "controller"
    | "piano"
    | "electric-piano"
    | "organ"
    | "synth"
    | "case"
    | "other";
  brand: string;
  model: string;
  title: string;
  description: string;
  year: number;
  tradeIns: boolean;
  status: "active" | "inactive" | "deleted" | "sold";
  price: number;
  visibility: "open" | "closed";
  pictures: Array<string>;
  location: string;
  createdAt: string;
}
