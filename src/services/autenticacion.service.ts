import { /* inject, */ BindingScope, injectable} from '@loopback/core';
const generador = require("password-generator");
const cryptoJs = require("crypto-js");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) { }

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
}
