import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/Llaves';
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
const generador = require("password-generator");
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");


@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository
  ) { }

  /*
   * Add service methods here
   */
  //generador: primer parametro longitud clave y segundo intensidad por ejemplo muy fuerte true (numeros, letras y caracteres especiales) y false (numeros y letras)
  GenerarClave() {
    let clave = generador(8, false);
    console.log(clave);
    return clave;
  }

  CifrarClave(clave: string) {
    let claveCifrada = cryptoJs.MD5(clave).toString();
    return claveCifrada;
  }

  IdentificarUsuario(usuario: string, clave: string) {
    try {
      let u = this.usuarioRepository.findOne({where: {user: usuario, clave: clave}});
      return u;
    } catch {
      return false;
    }

  }

  GenerarTokenJWT(usuario: Usuario) {
    let token = jwt.sign({
      data: {
        id: usuario.id,
        correo: usuario.personaId.correoElectronico,
        nombre: usuario.personaId.nombre + " " + usuario.personaId.apellidos
      }

    }, Llaves.claveJWT)
    return token;
  }

  ValidarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    } catch {
      return false;
    }
  }

}
