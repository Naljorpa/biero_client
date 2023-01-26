import ServiceBiere from "../../ServiceBiere.mjs";
import Composant from "../Composant.mjs";

export default class AccueilComposant extends Composant {
    template = "accueil";
    noeudParent = ""

    constructor(data, gabarit) {
        let pathGabarit = "./js/Composant/Accueil/accueil.html";
        super(data, pathGabarit);
        this.noeudParent = document.querySelector(".app");

        this.getBieres();

    }

    // Va chercher la liste des 5 meilleures bieres
    getBieres() {
        ServiceBiere.getListeDesMeilleuresBieres(this.setData.bind(this));
    }


}