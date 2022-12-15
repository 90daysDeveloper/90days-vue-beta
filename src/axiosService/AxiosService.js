import axios from "axios";

export default class AxiosService {
  constructor(filter) {
    switch(filter){
      case 'directus':
        this.url = process.env.VUE_APP_API_BASE 
        
        this.header = {
          headers:{
            'Authorization': `Bearer ${process.env.VUE_APP_BEARER_DIRECTUS}`
          }
        }

        console.log("🚀 ~ file: AxiosService.js:15 ~ AxiosService ~ constructor ~ this.url", this.url, this.header)
        break
      case 'mailchimp':
        this.url = process.env.VUE_APP_MAIL_CHIMP_API_BASE 
        this.header = {
          headers:{
            'Authorization': `Bearer ${process.env.VUE_APP_MAIL_CHIMP_BEARER}`
          }
        }
        console.log("🚀 ~ file: AxiosService.js:24 ~ AxiosService ~ constructor ~ this.url", this.url, this.header)
        break
    }
  }


  leggiVanilla(){
    return axios.get(this.url+'members', this.header).then(res => res.data)
  }

  // MALLEABILE -----------------------------------------------------
  leggi(nomeFiltro, valoreFiltro) {
    if (nomeFiltro && valoreFiltro) {
      return axios
        .get( this.url + "?filter[" + nomeFiltro + "]=" + valoreFiltro, this.header)
        .then((res) => res.data);
    } else {
      return axios.get( this.url ).then((res) => res.data);
    }
  }

  crea(item) {
    return axios.post( this.url , item, this.header).then((res) => res.data);
  }

  modifica(item) {
    return axios.patch( this.url + item.id, item, this.header).then((res) => res.data);
  }

  elimina(id) {
    return axios.delete( this.url  + id, this.header).then((res) => res.data);
  }

  leggiById(nomeTabella, idRiga){
    return axios.get( this.url +nomeTabella + '/' + idRiga, this.header).then(res => res.data)
  }

  // UTENTI -----------------------------------------------------
  leggiUtenti(nomeFiltro, valoreFiltro) {
    if (nomeFiltro && valoreFiltro) {
      return axios
        .get( this.url +"Utenti/" + "?filter[" + nomeFiltro + "]=" + valoreFiltro, this.header)
        .then((res) => res.data);
    } else {
      return axios.get( this.url +"Utenti", this.header).then((res) => res.data);
    }
  }

  creaUtenti(item) {
    return axios.post( this.url +"Utenti", item, this.header).then((res) => res.data);
  }

  modificaUtenti(item) {
    return axios.patch( this.url +"Utenti/" + item.id, item, this.header).then((res) => res.data);
  }

  eliminaUtenti(id) {
    return axios.delete( this.url +"Utenti/" + id, this.header).then((res) => res.data);
  }

  // HELPER -----------------------------------------------------
  leggiHelper(nomeFiltro, valoreFiltro) {
    if (nomeFiltro && valoreFiltro) {
      return axios
        .get( this.url +"Helper/" + "?filter[" + nomeFiltro + "]=" + valoreFiltro, this.header)
        .then((res) => res.data);
    } else {
      return axios.get( this.url +"Helper", this.header).then((res) => res.data);
    }
  }

  creaHelper(item) {
    return axios.post( this.url +"Helper", item, this.header).then((res) => res.data);
  }

  modificaHelper(item) {
    return axios.patch( this.url +"Helper/" + item.id, item, this.header).then((res) => res.data);
  }

  eliminaHelper(id) {
    return axios.delete( this.url +"Helper/" + id, this.header).then((res) => res.data);
  }

  // ORARI -----------------------------------------------------
  leggiOrari(nomeFiltro, valoreFiltro) {
    if (nomeFiltro && valoreFiltro) {
      return axios
        .get( this.url +"Orari/" + "?filter[" + nomeFiltro + "]=" + valoreFiltro, this.header)
        .then((res) => res.data);
    } else {
      return axios.get( this.url +"Orari", this.header).then((res) => res.data);
    }
  }

  creaOrari(item) {
    return axios.post( this.url +"Orari", item, this.header).then((res) => res.data);
  }

  modificaOrari(item) {
    return axios.patch( this.url +"Orari/" + item.id, item, this.header).then((res) => res.data);
  }

  eliminaOrari(id) {
    return axios.delete( this.url +"Orari/" + id, this.header).then((res) => res.data);
  }

  // OBIETTIVI -----------------------------------------------------
  leggiObiettivi(nomeFiltro, valoreFiltro) {
    if (nomeFiltro && valoreFiltro) {
      return axios
        .get( this.url +"Obiettivi/" + "?filter[" + nomeFiltro + "]=" + valoreFiltro, this.header)
        .then((res) => res.data);
    } else {
      return axios.get( this.url +"Obiettivi", this.header).then((res) => res.data);
    }
  }

  creaObiettivi(item) {
    return axios.post( this.url +"Obiettivi", item, this.header).then((res) => res.data);
  }

  modificaObiettivi(item) {
    return axios.patch( this.url +"Obiettivi/" + item.id, item, this.header).then((res) => res.data);
  }

  eliminaObiettivi(id) {
    return axios.delete( this.url +"Obiettivi/" + id, this.header).then((res) => res.data);
  }

  // ABITUDINI -----------------------------------------------------
  leggiAbitudini(nomeFiltro, valoreFiltro) {
    if (nomeFiltro && valoreFiltro) {
      return axios
        .get( this.url +"Abitudini/" + "?filter[" + nomeFiltro + "]=" + valoreFiltro, this.header)
        .then((res) => res.data);
    } else {
      return axios.get( this.url +"Abitudini", this.header).then((res) => res.data);
    }
  }

  creaAbitudini(item) {
    return axios.post( this.url +"Abitudini", item, this.header).then((res) => res.data);
  }

  modificaAbitudini(item) {
    return axios.patch( this.url +"Abitudini/" + item.id, item, this.header).then((res) => res.data);
  }

  eliminaAbitudini(id) {
    return axios.delete( this.url +"Abitudini/" + id, this.header).then((res) => res.data);
  }

  // DIARIO -----------------------------------------------------
  leggiDiario(nomeFiltro, valoreFiltro) {
    if (nomeFiltro && valoreFiltro) {
      return axios
        .get( this.url +"Diario/" + "?filter[" + nomeFiltro + "]=" + valoreFiltro, this.header)
        .then((res) => res.data);
    } else {
      return axios.get( this.url +"Diario", this.header).then((res) => res.data);
    }
  }

  creaDiario(item) {
    return axios.post( this.url +"Diario", item, this.header).then((res) => res.data);
  }

  modificaDiario(item) {
    return axios.patch( this.url +"Diario/" + item.id, item, this.header).then((res) => res.data);
  }

  eliminaDiario(id) {
    return axios.delete( this.url +"Diario/" + id, this.header).then((res) => res.data);
  }

  // RECAP SETTIMANALE -----------------------------------------------------
  leggiRecapSettimanale(nomeFiltro, valoreFiltro) {
    if (nomeFiltro && valoreFiltro) {
      return axios
        .get( this.url +
          "RecapSettimanale/" + "?filter[" + nomeFiltro + "]=" + valoreFiltro
        )
        .then((res) => res.data);
    } else {
      return axios.get( this.url +"RecapSettimanale", this.header).then((res) => res.data);
    }
  }

  creaRecapSettimanale(item) {
    return axios.post( this.url +"RecapSettimanale", item, this.header).then((res) => res.data);
  }

  modificaRecapSettimanale(item) {
    return axios
      .patch( this.url +"RecapSettimanale/" + item.id, item)
      .then((res) => res.data);
  }

  eliminaRecapSettimanale(id) {
    return axios.delete( this.url +"RecapSettimanale/" + id, this.header).then((res) => res.data);
  }

  // GRUPPI -----------------------------------------------------
  leggiGruppi(nomeFiltro, valoreFiltro) {
    if (nomeFiltro && valoreFiltro) {
      return axios
        .get( this.url +"Gruppi/" + "?filter[" + nomeFiltro + "]=" + valoreFiltro, this.header)
        .then((res) => res.data);
    } else {
      return axios.get( this.url +"Gruppi", this.header).then((res) => res.data);
    }
  }

  creaGruppi(item) {
    return axios.post( this.url +"Gruppi", item, this.header).then((res) => res.data);
  }

  modificaGruppi(item) {
    return axios.patch( this.url +"Gruppi/" + item.id, item, this.header).then((res) => res.data);
  }

  eliminaGruppi(id) {
    return axios.delete( this.url +"Gruppi/" + id, this.header).then((res) => res.data);
  }

  // PRIMO APPUNTAMENTO -----------------------------------------------------
  leggiPrimoAppuntamento(nomeFiltro, valoreFiltro) {
    if (nomeFiltro && valoreFiltro) {
      return axios
        .get( this.url +
          "PrimoAppuntamento/" + "?filter[" + nomeFiltro + "]=" + valoreFiltro
        )
        .then((res) => res.data);
    } else {
      return axios.get( this.url +"PrimoAppuntamento", this.header).then((res) => res.data);
    }
  }

  creaPrimoAppuntamento(item) {
    return axios.post( this.url +"PrimoAppuntamento", item, this.header).then((res) => res.data);
  }

  modificaPrimoAppuntamento(item) {
    return axios
      .patch( this.url +"PrimoAppuntamento/" + item.id, item)
      .then((res) => res.data);
  }

  eliminaPrimoAppuntamento(id) {
    return axios.delete( this.url +"PrimoAppuntamento/" + id, this.header).then((res) => res.data);
  }

  // PERCORSO -----------------------------------------------------
  leggiPercorso(nomeFiltro, valoreFiltro) {
    if (nomeFiltro && valoreFiltro) {
      return axios
        .get( this.url +"Percorso/" + "?filter[" + nomeFiltro + "]=" + valoreFiltro, this.header)
        .then((res) => res.data);
    } else {
      return axios.get( this.url +"Percorso", this.header).then((res) => res.data);
    }
  }

  creaPercorso(item) {
    return axios.post( this.url +"Percorso", item, this.header).then((res) => res.data);
  }

  modificaPercorso(item) {
    return axios.patch( this.url +"Percorso/" + item.id, item, this.header).then((res) => res.data);
  }

  eliminaPercorso(id) {
    return axios.delete( this.url +"Percorso/" + id, this.header).then((res) => res.data);
  }

  // PERCORSO FEEDBACK -----------------------------------------------------
  leggiPercorsoFeedback(nomeFiltro, valoreFiltro) {
    if (nomeFiltro && valoreFiltro) {
      return axios
        .get( this.url +
          "PercorsoFeedback/" + "?filter[" + nomeFiltro + "]=" + valoreFiltro
        )
        .then((res) => res.data);
    } else {
      return axios.get( this.url +"PercorsoFeedback", this.header).then((res) => res.data);
    }
  }

  creaPercorsoFeedback(item) {
    return axios.post( this.url +"PercorsoFeedback", item, this.header).then((res) => res.data);
  }

  modificaPercorsoFeedback(item) {
    return axios
      .patch( this.url +"PercorsoFeedback/" + item.id, item)
      .then((res) => res.data);
  }

  eliminaPercorsoFeedback(id) {
    return axios.delete( this.url +"PercorsoFeedback/" + id, this.header).then((res) => res.data);
  }
}
