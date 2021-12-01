import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Rol, RolRelations, MenuRol} from '../models';
import {MenuRolRepository} from './menu-rol.repository';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype.id,
  RolRelations
> {

  public readonly menuRols: HasManyRepositoryFactory<MenuRol, typeof Rol.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MenuRolRepository') protected menuRolRepositoryGetter: Getter<MenuRolRepository>,
  ) {
    super(Rol, dataSource);
    this.menuRols = this.createHasManyRepositoryFactoryFor('menuRols', menuRolRepositoryGetter,);
    this.registerInclusionResolver('menuRols', this.menuRols.inclusionResolver);
  }
}
