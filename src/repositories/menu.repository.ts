import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Menu, MenuRelations, MenuRol} from '../models';
import {MenuRolRepository} from './menu-rol.repository';

export class MenuRepository extends DefaultCrudRepository<
  Menu,
  typeof Menu.prototype.id,
  MenuRelations
> {

  public readonly menuRols: HasManyRepositoryFactory<MenuRol, typeof Menu.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MenuRolRepository') protected menuRolRepositoryGetter: Getter<MenuRolRepository>,
  ) {
    super(Menu, dataSource);
    this.menuRols = this.createHasManyRepositoryFactoryFor('menuRols', menuRolRepositoryGetter,);
    this.registerInclusionResolver('menuRols', this.menuRols.inclusionResolver);
  }
}
