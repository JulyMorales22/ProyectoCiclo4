import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Menu,
  MenuRol,
} from '../models';
import {MenuRepository} from '../repositories';

export class MenuMenuRolController {
  constructor(
    @repository(MenuRepository) protected menuRepository: MenuRepository,
  ) { }

  @get('/menus/{id}/menu-rols', {
    responses: {
      '200': {
        description: 'Array of Menu has many MenuRol',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MenuRol)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<MenuRol>,
  ): Promise<MenuRol[]> {
    return this.menuRepository.menuRols(id).find(filter);
  }

  @post('/menus/{id}/menu-rols', {
    responses: {
      '200': {
        description: 'Menu model instance',
        content: {'application/json': {schema: getModelSchemaRef(MenuRol)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Menu.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MenuRol, {
            title: 'NewMenuRolInMenu',
            exclude: ['id'],
            optional: ['menuId']
          }),
        },
      },
    }) menuRol: Omit<MenuRol, 'id'>,
  ): Promise<MenuRol> {
    return this.menuRepository.menuRols(id).create(menuRol);
  }

  @patch('/menus/{id}/menu-rols', {
    responses: {
      '200': {
        description: 'Menu.MenuRol PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MenuRol, {partial: true}),
        },
      },
    })
    menuRol: Partial<MenuRol>,
    @param.query.object('where', getWhereSchemaFor(MenuRol)) where?: Where<MenuRol>,
  ): Promise<Count> {
    return this.menuRepository.menuRols(id).patch(menuRol, where);
  }

  @del('/menus/{id}/menu-rols', {
    responses: {
      '200': {
        description: 'Menu.MenuRol DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(MenuRol)) where?: Where<MenuRol>,
  ): Promise<Count> {
    return this.menuRepository.menuRols(id).delete(where);
  }
}
