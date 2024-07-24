import { Model } from 'mongoose';
import { IGenericRepository } from './generic-mongo-repository.service';

export interface IGenericService<T> {
  findAll(criteria?: any): Promise<T[]>;

  create(entity: T): Promise<T>;

  update(id: string, entity: Partial<T>, criteria?: any): Promise<T>;

  findOne(id: string, criteria?: any): Promise<T>;

  delete(id: string, criteria?: any): Promise<void>;
}

export class GenericService<T> implements IGenericService<T> {
  constructor(protected readonly repository: IGenericRepository<T>) {}

  findAll(criteria?: any): Promise<T[]> {
    throw new Error('Method not implemented.');
  }

  update(id: string, entity: Partial<T>, criteria?: any): Promise<T> {
    throw new Error('Method not implemented.');
  }

  findOne(id: string, criteria?: any): Promise<T> {
    throw new Error('Method not implemented.');
  }

  delete(id: string, criteria?: any): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async create(entity: T): Promise<T> {
    console.log('Calling create ', entity);
    return await this.repository.create(entity);
  }
}
