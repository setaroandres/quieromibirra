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
  fbid: any = 0;

  api_url: string = "https://ctrlztest.com.ar/birrah/apirest/";
  api_url_super: string = "https://ctrlztest.com.ar/birrah/apirest/superadmin/"; // Para imgs

  // api_url: string = "assets/data/"

  // getPromos(): Observable<any>{
  //   return this.http.get(this.api_url + "promos.json");
  // }

  validarUsuario(data) {
    console.log(data);

    return this.http.get(
      this.api_url +
        "validarusuario.php" +
        "?email=" +
        data.email +
        "&password=" +
        data.password
    );
  }

  recuperarPassword(email) {
    let url = this.api_url + "recuperarpassword.php";

    var headers = new Headers();
    headers = this.headersAppend(headers);
    const requestOptions = new RequestOptions({ headers: headers });

    var body = JSON.stringify({
      email: email
    });

    return this.httpPost.post(url, body, {
      headers: headers,
      withCredentials: true
    });
  }

  // ***********************************************************
  // ---------------- GET
  // ***********************************************************

  traerPuntos(usuarioid: string) {
    return this.http.get(
      this.api_url + "traerpuntos.php" + "?usuarioid=" + usuarioid
    );
  }

  validarFBUser(fb_id) {
    let url = this.api_url + "validarfbuser.php?fbuser=" + fb_id;
    console.log("url fb", url);

    return this.http.get(url);
  }

  traerDataUsuario(usuarioid: string) {
    return this.http.get(
      this.api_url + "traerdatausuario.php" + "?usuarioid=" + usuarioid
    );
  }

  traerCervecerias() {
    return this.http.get(this.api_url + "traercerveceriasactivas.php");
  }

  traerEstadoCerveceria(cerveceriaid) {
    return this.http.get(this.api_url + "traerestadocerveceria.php?cerveceriaid=" + cerveceriaid);
  }

  traerPromosPorCerveceria(id) {
    return this.http.get(
      this.api_url + "traerpromosporcerveceria.php?cerveceriaid=" + id
    );
  }

  traerCanjesPorCerveceria(id) {
    return this.http.get(
      this.api_url + "traercanjesporcerveceria.php?cerveceriaid=" + id
    );
  }

  // ---- Promos y canjes -> trae si tiene compras tmb para saber si las compró o no

  traerPromosPorUsuario(usuarioid: string) {
    return this.http.get(
      this.api_url + "traerpromosporusuario.php" + "?usuarioid=" + usuarioid
    );
  }

  traerCanjesPorUsuario(usuarioid: string) {
    let url = this.api_url + "traercanjesporusuario.php" + "?usuarioid=" + usuarioid;
    console.log("url", url);
    
    return this.http.get(url);
  }

  // --- Compras

  traerComprasPromos(usuarioid: string) {
    return this.http.get(
      this.api_url + "traercompraspromos.php" + "?usuarioid=" + usuarioid
    );
  }

  traerComprasCanjes(usuarioid: string) {
    return this.http.get(
      this.api_url + "traercomprascanjes.php" + "?usuarioid=" + usuarioid
    );
  }

  habilitar(){
    return this.http.get(this.api_url + "habilitar.php");
    
  }

  // ***********************************************************
  // ---------------- CREATE
  // ***********************************************************

  crearConsulta(usuarioid, texto, fechayhora) {
    let url = this.api_url + "crearconsulta.php";

    var headers = new Headers();
    headers = this.headersAppend(headers);
    const requestOptions = new RequestOptions({ headers: headers });

    var body = JSON.stringify({
      usuarioid: usuarioid,
      texto: texto,
      fechayhora: fechayhora
    });

    console.log("BODY, ", body);

    return this.httpPost.post(url, body, {
      headers: headers,
      withCredentials: true
    });
  }

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
      fechadecreacion: fechadecreacion,
      facebookid: this.fbid
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

  retirarCompraPromo(
    usuarioid: string,
    promocionid: string,
    compra_promoid: string,
    puntos_promo: string
  ) {
    let url = this.api_url + "retirarcomprapromo.php";

    var headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT");
    headers.append("Accept", "application/json");
    headers.append("content-type", "application/json");
    const requestOptions = new RequestOptions({ headers: headers });

    var body = JSON.stringify({
      usuarioid: usuarioid,
      promocionid: promocionid,
      compra_promoid: compra_promoid,
      puntos_promo: puntos_promo
    });

    console.log("BODY, entrega (promo): ", body);

    return this.httpPost.post(url, body, {
      headers: headers,
      withCredentials: true
    });
  }

  retirarCompraCanje(
    usuarioid: string,
    canjeid: string,
    compra_canjeid: string,
    puntos_canje: string
  ) {
    let url = this.api_url + "retirarcompracanje.php";

    var headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT");
    headers.append("Accept", "application/json");
    headers.append("content-type", "application/json");
    const requestOptions = new RequestOptions({ headers: headers });

    var body = JSON.stringify({
      usuarioid: usuarioid,
      canjeid: canjeid,
      compra_canjeid: compra_canjeid,
      puntos_canje: puntos_canje
    });

    console.log("BODY, entrega: ", body);

    return this.httpPost.post(url, body, {
      headers: headers,
      withCredentials: true
    });
  }

  crearcomprapromo(promo: any, fecha: any, hora: any, dataUser: any) {
    let url = this.api_url + "crearcomprapromo.php";

    var headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT");
    headers.append("Accept", "application/json");
    headers.append("content-type", "application/json");
    const requestOptions = new RequestOptions({ headers: headers });

    var body = JSON.stringify({
      usuarioid: dataUser.usuarioid,
      promocionid: promo.promocionid,
      fecha: fecha,
      hora: hora
    });

    console.log("BODY, entrega: ", body);

    return this.httpPost.post(url, body, {
      headers: headers,
      withCredentials: true
    });
  }

  crearcompracanje(canje, fecha, hora , dataUser) {
    let url = this.api_url + "crearcompracanje.php";

    var headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT");
    headers.append("Accept", "application/json");
    headers.append("content-type", "application/json");
    const requestOptions = new RequestOptions({ headers: headers });

    var body = JSON.stringify({
      usuarioid: dataUser.usuarioid,
      canjeid: canje.canjeid,
      fecha: fecha,
      hora: hora
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
