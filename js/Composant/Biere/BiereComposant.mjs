import ServiceBiere from "../../ServiceBiere.mjs";
import Composant from "../Composant.mjs";

export default class BiereComposant extends Composant {
    template = "biere";
    noeudParent = ""

    constructor(id, gabarit) {
        let pathGabarit = "./js/Composant/Biere/biere.html";
        super("", pathGabarit);
        this.noeudParent = document.querySelector(".app");
        this.data = {};
        this.getInformation(id);
        //?
        this.id = id;
    }

    getInformation(id) {
        ServiceBiere.getCommentaires(id, this.setCommentaire.bind(this));
        ServiceBiere.getUneBiere(id, this.setBiere.bind(this));
    }

    setBiere(data) {
        this.data.biere = data.data;
        this.setData(this.data);
    }

    setCommentaire(data) {
        this.data.commentaires = data.data;
        this.setData(this.data);
    }

    ajouterListener() {
        this.noeudParent.querySelector(".btnSoumettre").addEventListener("click", (evt) => {
            let courriel = this.noeudParent.querySelector("[name='courriel']").value;
            let commentaire = this.noeudParent.querySelector("[name='commentaire']").value;
            this.validation(courriel, commentaire);
        })
    }

    validation(courriel, commentaire) {
        //regex et inspiration (je n'avais jamais utilisé match() avant) pour le code de validation provenant de https://masteringjs.io/tutorials/fundamentals/email-regex
        let regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
        if (!courriel.match(regex)) {
            document.querySelector(".courriel-invalide").innerHTML = "Veuillez entrer un courriel valide";
        } else {
            if (commentaire == "") {
                document.querySelector(".commentaire-invalide").innerHTML = "Veillez entrer un commentaire";
                document.querySelector(".courriel-invalide").innerHTML = "";
            } else {
                ServiceBiere.ajouterCommentaires(6, { courriel: courriel, commentaire: commentaire }, (data) => {
                    console.log(data);
                    ServiceBiere.getCommentaires(this.id, this.setCommentaire.bind(this));
                });
                document.querySelector(".commentaire-invalide").innerHTML = "";
                document.querySelector(".courriel-invalide").innerHTML = "";
            }
        }
    }




}