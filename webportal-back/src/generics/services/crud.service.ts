import { Repository } from 'typeorm';

export abstract class CrudService<Entity> {
  constructor(private repository: Repository<Entity>) {}
  public async findAll(): Promise<Entity[]> {
    return await this.repository.find();
  }
  public abstract findById(id: string): Promise<Entity>;
  public async create(entity): Promise<Entity> {
    return this.repository.save(entity);
  }
  public async update(id: string, entity): Promise<Entity> {
    const newEntity = await this.repository.preload({
      id,
      ...entity,
    });
    if (newEntity) {
      this.repository.save(newEntity);
      return newEntity;
    }
  }
  public async delete(id: string): Promise<Entity> {
    const entity = await this.findById(id);
    await this.repository.softDelete(id);
    return entity;
  }
  public async restore(id: string): Promise<Entity> {
    const entity = await this.findById(id);
    await this.repository.restore(id);
    return entity;
  }
}
