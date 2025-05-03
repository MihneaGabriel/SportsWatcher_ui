export interface Nomenclature {
  id: number;
  value: string;
  key?: string;
  isActive?: boolean;
  createdAt?: string | Date;
  modifiedAt?: string | Date;
}