export interface PropertyComment {
  id: number;
  propertyId: number;
  authorName: string;
  text: string;
  createdAt: Date;
  replies?: PropertyComment[];
}