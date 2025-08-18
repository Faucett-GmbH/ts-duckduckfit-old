
export interface IFindable<T> {
  find(id: string): Promise<T>; // find or throw a not found error
  findById(id: string): Promise<T | null>;
}


export interface IRepository<T> extends IFindable<T> {

  save(item: T): Promise<void>;

  list(): Promise<T[]>;

}