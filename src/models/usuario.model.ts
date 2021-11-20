import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Persona} from './persona.model';
import {Rol} from './rol.model';

@model()
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  user: string;

  @property({
    type: 'string',
    required: false,
  })
  clave: string;

  @belongsTo(() => Persona)
  personaId: Persona;

  @belongsTo(() => Rol)
  rolId: string;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
