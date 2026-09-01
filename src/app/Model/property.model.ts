import { PropertyComment } from "./comment.model";

export interface Property {
  id: number;
  title: string;
  description: string;
  location: string;
  rent: number;
  bedrooms: number;
  bathrooms: number;
  propertyType: string;
  imageUrl: string;
  available: boolean;
  comments?: PropertyComment[];
}