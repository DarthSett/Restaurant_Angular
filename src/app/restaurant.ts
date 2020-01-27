import {Food} from './food';

export class Restaurant {
  Name: string;
  Lat: string;
  Long: string;
  ID: number;
  Tables: number;
  Owner: string;
  AddedBy: string;
  AdderRole: string;
  Menu: Food[];
}
