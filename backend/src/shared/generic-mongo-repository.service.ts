import { Model } from 'mongoose';

export interface IGenericRepository<T> {
  findAll(criteria?: any): Promise<T[]>;

  create(entity: T): Promise<T>;

  update(id: string, entity: Partial<T>, criteria?: any): Promise<T | null>;

  findOne(id: string|null, criteria?: any): Promise<T | null>;

  delete(id: string, criteria?: any): Promise<void>;
}

export class GenericMongoRepository<T extends object>
  implements IGenericRepository<T>
{
  constructor(protected readonly model: Model<T>) {}

  findAll(criteria?: any): Promise<T[]> {
    return this.model.find(criteria);
  }

  create(entity: T): Promise<T> {
    return this.model.create(entity);
  }

  update(id: string, entity: Partial<T>, criteria?: any): Promise<T | null> {
    return this.model.findOneAndUpdate({ _id: id, ...criteria }, entity, {
      new: true,
    });
  }

  findOne(id: string|null, criteria?: any): Promise<T | null> {
    if (criteria) {
      return this.model.findOne({  ...criteria });
    }
    return this.model.findById(id);
  }

  delete(id: string, criteria?: any): Promise<void> {
    if (criteria) {
      return this.model.findOneAndDelete({ _id: id, ...criteria });
    }
    return this.model.findByIdAndDelete(id);
  }
}
