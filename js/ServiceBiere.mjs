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
    static getListeBieres (fctRappel){
        //console.log(this);
        fetch(this.api_url+"biere")
            .then(reponse=> reponse.json())
            .then(data => fctRappel(data));
    }

    static getListeDesMeilleuresBieres(fctRappel){
        fetch(this.api_url+"biere")
        .then(reponse=> reponse.json())
        .then(data => {
            // Comment ne garder que les 5 meilleures bières ?   
            //@todo...
            let bieres = data.data;
            bieres.sort((a,b)=>{
                return a.note_moyenne.localeCompare(b.note_moyenne);
            })
            let cinqMeilleuresBieres = bieres.slice(Math.max(bieres.length - 5));
            fctRappel(cinqMeilleuresBieres)
        });
    }

    static getUneBiere(id, fctRappel){
        fetch(this.api_url+"biere"+"/"+id)
        .then(reponse=> reponse.json())
        .then(data => {
            fctRappel(data)
        });
    }

    static getCommentaires(id, fctRappel){
        fetch(this.api_url+"biere"+"/"+id+"/commentaire")
            .then(reponse=> reponse.json())
            .then(data => {
                fctRappel(data)
            });
    }

    static ajouterCommentaires(id, commentaire, fctRappel){
        var entete = new Headers();
        entete.append("Content-Type", "application/json");
        entete.append("Authorization", "Basic " + btoa("biero:biero"));
        
        fetch(this.api_url+"biere"+"/"+id+"/commentaire", {
            method:"PUT",
            body : JSON.stringify(commentaire),
            headers : entete
        })
            .then(reponse=> reponse.json())
            .then(data => {
                fctRappel(data)
            });
    }

}