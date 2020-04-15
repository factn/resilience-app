import { BaseFirestoreRepository, IEntity } from 'fireorm';

export class BaseRepository<T extends IEntity> extends BaseFirestoreRepository<T> {
   
    // not sure why this is not default behavior in fireorm
    // but if there are undefined properties on an object, firestore 
    // throws an exception so you have to strip them out first 
    stripUndefined(obj:any) : any {
        for (let key in obj) {
            if (obj[key] === undefined) {
                delete obj[key]
            }
        }
        return obj
    }
  
    create(item: T): Promise<T> {
        return super.create(this.stripUndefined(item))
    }

    update(item: T): Promise<T> {
        return super.update(this.stripUndefined(item))
    }
}