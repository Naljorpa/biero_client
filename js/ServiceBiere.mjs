/**
 * Module de gestion des données et des requêtes des bieres
 *
 * @module Biere
 */
export default class ServiceBiere {
    /**
     * URL de base du service Web utilisé pour les appels de l'API.
     * @static
     * @memberof Biere
     */
    static api_url = "http://127.0.0.1:8000/webservice/php/";


    /**
     * Récupérer l'ensemble des biere sur le service Web
     *
     * @static
     * @returns void
     * @memberof Biere
     */
    static getListeBieres(fctRappel) {
        fetch(this.api_url + "biere")
            .then(reponse => reponse.json())
            .then(data => fctRappel(data));
    }

    /** 
     * Récupérer les cinq meilleurs bieres sur le service Web
     * 
     * @static
     * @returns void
     * @memberof Biere
     */
    static getListeDesMeilleuresBieres(fctRappel) {
        fetch(this.api_url + "biere")
            .then(reponse => reponse.json())
            .then(data => {
                let bieres = data.data;
                bieres.sort((a, b) => {
                    return a.note_moyenne - b.note_moyenne;
                })
                // Je devais changer la structure du tableau retourné pour avoir un {data: Array()} au lieu d'un tableau non identifié. La formule du slice va chercher les cinq derniers élément du tableau organisé généré plus haut.
                data = { data: bieres.slice(Math.max(bieres.length - 5)) };

                fctRappel(data);
            });
    }

    /**
     * Récupérer une biere sur le service Web grace au id
     * 
     * @static
     * @returns void
     * @memberof Biere
     * @param {*} id 
     */
    static getUneBiere(id, fctRappel) {
        fetch(this.api_url + "biere" + "/" + id)
            .then(reponse => reponse.json())
            .then(data => {
                fctRappel(data)
            });
    }

    /**
  * Récupérer les commentaires d'une sur le service Web grace au id
  * 
  * @static
  * @returns void
  * @memberof Commentaire
  * @param {*} id 
  */
    static getCommentaires(id, fctRappel) {
        fetch(this.api_url + "biere" + "/" + id + "/commentaire")
            .then(reponse => reponse.json())
            .then(data => {
                fctRappel(data)
            });
    }

    /**
     * Récupérer les notes sur le service Web grace au id
     * 
     * @static
     * @returns void
     * @memberof Note
     * @param {*} id 
     */
    static getNote(id, fctRappel) {
        fetch(this.api_url + "biere" + "/" + id + "/note")
            .then(reponse => reponse.json())
            .then(data => {
                fctRappel(data)
            });
    }

    /**
     * Ajoute un commentaire sur une biere grace au id de la bière
     * 
     * @param {*} id 
     * @param {*} commentaire 
     */
    static ajouterCommentaires(id, commentaire, fctRappel) {
        var entete = new Headers();
        entete.append("Content-Type", "application/json");
        entete.append("Authorization", "Basic " + btoa("biero:biero"));

        fetch(this.api_url + "biere" + "/" + id + "/commentaire", {
            method: "PUT",
            body: JSON.stringify(commentaire),
            headers: entete
        })
            .then(reponse => reponse.json())
            .then(data => {
                fctRappel(data)
            });
    }

}