import { ImenssageStatus } from './ImenssageError';
import { Iteam } from './Iteam';

export interface Iteams {
  findAll(): Promise<Iteam[]>;
  findByPk(id: number): Promise<ImenssageStatus>;
}
