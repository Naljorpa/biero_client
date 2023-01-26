import Affichage from "../Affichage.mjs";

export default class Composant {
    tmplComposant = "";
    constructor(data, gabarit){
        if(data) {
            this.data = data;
        }
        if(gabarit){
            this.gabarit = gabarit;
        }
        this.ChargeTemplate(this.gabarit);
    }
    /**
     * 
     * @param {*} data 
     * @param {boolean} bDirty Force le rafraichissement des données (et l'affichage)
     */
    setData(data, bDirty){
        this.data = data;
        this.AfficherTemplate();
    }

    getData(){
        return this.data;
    }

    AfficherTemplate(){
        if(this.tmplComposant){
            this.#Afficher();
        }
        else{
            this.ChargeTemplate();
        }

    }

    ChargeTemplate(){
        fetch(this.gabarit)
            .then(reponse => reponse.text())
            .then(tmpl => {
                this.tmplComposant = tmpl
                if(this.data){
                    this.#Afficher();
                }
            });
    }

    #Afficher(){
        let chaineHTML = Mustache.render(this.tmplComposant, this.data);
        this.noeudParent.innerHTML = chaineHTML;
        if(this.ajouterListener)
        {
            this.ajouterListener();
        } 
        return chaineHTML;
    }

}