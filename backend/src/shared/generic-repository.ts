import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

export interface IGenericRepository<T> {
  findAll(criteria?: any): Promise<T[]>;

  create(entity: T): Promise<T>;

  update(id: string, entity: Partial<T>, criteria?: any): Promise<T>;

  findOne(id: string, criteria?: any): Promise<T>;

  delete(id: string, criteria?: any): Promise<void>;
}

@Injectable()
export class GenericRepository<T> implements IGenericRepository<T> {
  constructor(private readonly model: Model<T>) {}

  findAll(criteria?: any): Promise<T[]> {
    return this.model.find(criteria);
  }

  create(entity: T): Promise<T> {
    return this.model.create(entity);
  }

  update(id: string, entity: Partial<T>, criteria?: any): Promise<T | null> {
    if (criteria) {
      return this.model.findOneAndUpdate({ _id: id, ...criteria }, entity, {
        new: true,
      });
    }
    return this.model.findByIdAndUpdate(id, entity, { new: true });
  }

  async findOne(id: string, criteria?: any): Promise<T | null> {
    if (criteria) {
      return this.model.findOne({ _id: id, ...criteria });
    }
    return this.model.findById(id);
  }

  async delete(id: string, criteria?: any): Promise<void> {
    if (criteria) {
      await this.model.findOneAndDelete({ _id: id, ...criteria });
    }
    await this.model.findByIdAndDelete(id);
  }
}
