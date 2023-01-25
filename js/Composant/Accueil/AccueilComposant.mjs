import ServiceBiere from "../../ServiceBiere.mjs";
import Composant from "../Composant.mjs";

export default class AccueilComposant extends Composant{
    template = "accueil";
    noeudParent = ""
    //pathGabarit ="/js/Composant/Accueil/accueil.html";
    constructor(data, gabarit){
        let pathGabarit ="./js/Composant/Accueil/accueil.html";
        super(data, pathGabarit);
        this.noeudParent = document.querySelector(".app");
        
        this.getBieres();
        

    }

    getBieres(){
        ServiceBiere.getListeDesMeilleuresBieres(this.setData.bind(this));
        //ServiceBiere.getListeBieres(this.setData.bind(this));
        
    }

    
}