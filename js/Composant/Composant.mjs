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
        console.log(this.data);
        this.AfficherTemplate();
    }

    getData(){
        return this.data;
    }

    AfficherTemplate(){
        //console.log(this.tmplComposant)
        if(this.tmplComposant){
            //console.log("afficher")
            this.#Afficher();
        }
        else{
            //console.log("charge")
            this.ChargeTemplate();
        }

    }

    ChargeTemplate(){
        fetch(this.gabarit)
            .then(reponse => reponse.text())
            .then(tmpl => {
                this.tmplComposant = tmpl
                //console.log(this.tmplComposant);
                if(this.data){
                    //console.log(this.data)
                    this.#Afficher();
                }
            });


    }
    #Afficher(){
       // console.log(this.tmplComposant);
        let chaineHTML = Mustache.render(this.tmplComposant, this.data);
        //console.log(chaineHTML);
        this.noeudParent.innerHTML = chaineHTML;
        if(this.AjouterListener)
        {
            this.AjouterListener();
        } 
        return chaineHTML;
    }

}