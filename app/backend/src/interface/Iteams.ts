import { Iteam } from './Iteam';

export interface Iteams {
  findAll(): Promise<Iteam[]>
}
