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
  Rol,
  MenuRol,
} from '../models';
import {RolRepository} from '../repositories';

export class RolMenuRolController {
  constructor(
    @repository(RolRepository) protected rolRepository: RolRepository,
  ) { }

  @get('/rols/{id}/menu-rols', {
    responses: {
      '200': {
        description: 'Array of Rol has many MenuRol',
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
    return this.rolRepository.menuRols(id).find(filter);
  }

  @post('/rols/{id}/menu-rols', {
    responses: {
      '200': {
        description: 'Rol model instance',
        content: {'application/json': {schema: getModelSchemaRef(MenuRol)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Rol.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MenuRol, {
            title: 'NewMenuRolInRol',
            exclude: ['id'],
            optional: ['rolId']
          }),
        },
      },
    }) menuRol: Omit<MenuRol, 'id'>,
  ): Promise<MenuRol> {
    return this.rolRepository.menuRols(id).create(menuRol);
  }

  @patch('/rols/{id}/menu-rols', {
    responses: {
      '200': {
        description: 'Rol.MenuRol PATCH success count',
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
    return this.rolRepository.menuRols(id).patch(menuRol, where);
  }

  @del('/rols/{id}/menu-rols', {
    responses: {
      '200': {
        description: 'Rol.MenuRol DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(MenuRol)) where?: Where<MenuRol>,
  ): Promise<Count> {
    return this.rolRepository.menuRols(id).delete(where);
  }
}
