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
        this.id = id;
    }

    // Va chercher les info des bieres et leurs commentaires de part leur id
    getInformation(id) {
        ServiceBiere.getCommentaires(id, this.setCommentaire.bind(this));
        ServiceBiere.getUneBiere(id, this.setBiere.bind(this));
        ServiceBiere.getNote(id, this.setNote.bind(this));
    }

    // Utilise la classe Composant pour afficher les data de la bière
    setBiere(data) {
        this.data.biere = data.data;
        this.setData(this.data);
    }

     // Utilise la classe Composant pour afficher les data des commentaires
    setCommentaire(data) {
        this.data.commentaires = data.data;
        this.setData(this.data);
    }

     // Utilise la classe Composant pour afficher les data des notes
     setNote(data) {
        this.data.note = data.data;
        this.setData(this.data);
    }

    // Ajoute le bouton pour soumettre le commentaire et active la validation
    ajouterListener() {
        this.noeudParent.querySelector(".btnSoumettre").addEventListener("click", () => {
            let courriel = this.noeudParent.querySelector("[name='courriel']").value;
            let commentaire = this.noeudParent.querySelector("[name='commentaire']").value;
            this.validation(courriel, commentaire);
        })
    }

    // Valide et envoie les infos au serveur
    validation(courriel, commentaire) {
        //regex et inspiration (je n'avais jamais utilisé match() avant) pour le code de validation provenant de https://masteringjs.io/tutorials/fundamentals/email-regex
        let regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
        if (!courriel.match(regex)) {
            document.querySelector(".courriel-invalide").innerHTML = "Veuillez entrer un courriel valide";
        } else {
            if (commentaire == "") {
                document.querySelector(".commentaire-invalide").innerHTML = "Veuillez entrer un commentaire";
                document.querySelector(".courriel-invalide").innerHTML = "";
            } else {
                ServiceBiere.ajouterCommentaires(this.id, { courriel: courriel, commentaire: commentaire }, () => {
                    ServiceBiere.getCommentaires(this.id, this.setCommentaire.bind(this));
                });
                document.querySelector(".commentaire-invalide").innerHTML = "";
                document.querySelector(".courriel-invalide").innerHTML = "";
            }
        }
    }




}