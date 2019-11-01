import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ServiceService {
  constructor(public http: HttpClient, private httpPost: Http) {}

  access_token: string = "";
  dataUser: any = {};

  api_url: string = "https://ctrlztest.com.ar/quiero-mi-birra/apirest/";
  // api_url: string = "assets/data/"

  // getPromos(): Observable<any>{
  //   return this.http.get(this.api_url + "promos.json");
  // }

  validarUsuario(data) {
    return this.http.get(
      this.api_url +
        "validarusuario.php" +
        "?email=" +
        data.email +
        "&password=" +
        data.password
    );
  }

  // ***********************************************************
  // ---------------- GET
  // ***********************************************************

  traerCervecerias() {
    return this.http.get(this.api_url + "traercervecerias.php");
  }

  traerPromosPorUsuario(usuarioid: string) {
    return this.http.get(
      this.api_url + "traerpromosporusuario.php" + "?usuarioid=" + usuarioid
    );
  }

  traerCanjesPorUsuario(usuarioid: string) {
    return this.http.get(
      this.api_url + "traercanjesporusuario.php" + "?usuarioid=" + usuarioid
    );
  }

  traerPromosPorId(id) {
    return this.http.get(
      this.api_url + "traerpromosporid.php?cerveceriaid=" + id
    );
  }

  traerCompras(usuarioid: string) {
    return this.http.get(
      this.api_url + "traercompras.php" + "?usuarioid=" + usuarioid
    );
  }

  traerPuntos(usuarioid: string) {
    return this.http.get(
      this.api_url + "traerpuntos.php" + "?usuarioid=" + usuarioid
    );
  }

  traerDataUsuario(usuarioid: string) {
    return this.http.get(
      this.api_url + "traerdatausuario.php" + "?usuarioid=" + usuarioid
    );
  }

  // ***********************************************************
  // ---------------- CREATE
  // ***********************************************************

  crearUsuario(registro: any, fechadecreacion: string): Observable<any> {
    let url = this.api_url + "crearusuario.php";

    var headers = new Headers();
    headers = this.headersAppend(headers);
    const requestOptions = new RequestOptions({ headers: headers });

    var body = JSON.stringify({
      nombre: registro.nombre,
      apellido: registro.apellido,
      email: registro.email,
      password: registro.password,
      fechanacimiento: registro.nacimiento,
      fechadecreacion: fechadecreacion
    });

    return this.httpPost.post(url, body, {
      headers: headers,
      withCredentials: true
    });
  }

  // crearCompraPromo(promo: any, dataUser: any) {
  //   let url = this.api_url + "crearcomprapromo.php";

  //   var headers = new Headers();
  //   headers = this.headersAppend(headers);
  //   const requestOptions = new RequestOptions({ headers: headers });

  //   var body = JSON.stringify({
  //     promocionid: promo.promocionid,
  //     cerveceriaid: promo.cerveceriaid,
  //     usuarioid: dataUser.usuarioid
  //   });

  //   console.log("BODY, entrega: ", body);

  //   return this.httpPost.post(url, body, {
  //     headers: headers,
  //     withCredentials: true
  //   });
  // }

  retirarCompraPromo(promo: any, dataUser: any) {
    let url = this.api_url + "retirarcomprapromo.php";

    var headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT");
    headers.append("Accept", "application/json");
    headers.append("content-type", "application/json");
    const requestOptions = new RequestOptions({ headers: headers });

    var body = JSON.stringify({
      usuarioid: dataUser.usuarioid,
      promocionid: promo.promocionid,
      puntos_promo: promo.puntos_promo
    });

    console.log("BODY, entrega: ", body);

    return this.httpPost.post(url, body, {
      headers: headers,
      withCredentials: true
    });
  }

  retirarCompraCanje(canje: any, dataUser: any) {
    let url = this.api_url + "retirarcompracanje.php";

    var headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT");
    headers.append("Accept", "application/json");
    headers.append("content-type", "application/json");
    const requestOptions = new RequestOptions({ headers: headers });

    var body = JSON.stringify({
      usuarioid: dataUser.usuarioid,
      canjeid: canje.canjeid,
      puntos_canje: canje.puntos_canje
    });

    console.log("BODY, entrega: ", body);

    return this.httpPost.post(url, body, {
      headers: headers,
      withCredentials: true
    });
  }

  crearcomprapromo(promo: any, dataUser: any) {
    let url = this.api_url + "crearcomprapromo.php";

    var headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT");
    headers.append("Accept", "application/json");
    headers.append("content-type", "application/json");
    const requestOptions = new RequestOptions({ headers: headers });

    var body = JSON.stringify({
      usuarioid: dataUser.usuarioid,
      promocionid: promo.promocionid
    });

    console.log("BODY, entrega: ", body);

    return this.httpPost.post(url, body, {
      headers: headers,
      withCredentials: true
    });
  }

  crearcompracanje(canje: any, dataUser: any) {
    let url = this.api_url + "crearcompracanje.php";

    var headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT");
    headers.append("Accept", "application/json");
    headers.append("content-type", "application/json");
    const requestOptions = new RequestOptions({ headers: headers });

    var body = JSON.stringify({
      usuarioid: dataUser.usuarioid,
      canjeid: canje.canjeid
    });

    console.log("BODY, entrega: ", body);

    return this.httpPost.post(url, body, {
      headers: headers,
      withCredentials: true
    });
  }

  headersAppend(headers) {
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT");
    headers.append("Accept", "application/json");
    headers.append("content-type", "application/json");
    return headers;
  }
}
