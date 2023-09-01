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

export interface ProfessionalProps {
  id: number;
  firstName: string;
  lastName: string;
  nickname?: string;
  profilePicture?: string;
  type: "technician" | "teacher";
  workplace?: "onSite" | "offSite" | "both";
  email?: string;
  phone?: number;
  location?: string;
  createdAt: string;
}

export interface StudioProps {
  id: number;
  userId: number;
  name: string;
  description: string;
  services: Array<ServiceProps>;
  status: "active" | "inactive" | "deleted";
  visibility: "open" | "closed";
  pictures: Array<string>;
  location: string;
  createdAt: string;
}

export interface ServiceProps {
  id: number;
  name: string;
  createdAt: string;
}
