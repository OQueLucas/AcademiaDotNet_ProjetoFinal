export interface Role {
  id: string;
  name: string;
  normalizedName: string;
  concurrencyStamp: number | null;
}
