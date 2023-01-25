import ServiceBiere from "../../ServiceBiere.mjs";
import Composant from "../Composant.mjs";

export default class BiereComposant extends Composant{
    template = "biere";
    noeudParent = ""
    
    constructor(id, gabarit){
        let pathGabarit ="./js/Composant/Biere/biere.html";
        super("", pathGabarit);
        this.noeudParent = document.querySelector(".app");
        this.data = {};
        this.getInformation(id);
        

    }

    getInformation(id){
        
        ServiceBiere.getCommentaires(id, this.setCommentaire.bind(this));
        ServiceBiere.getUneBiere(id, this.setBiere.bind(this));

    }

    setBiere(data){
        this.data.biere = data.data;
        console.log(this.data)
        this.setData(this.data);
    }

    setCommentaire(data){
        this.data.commentaires =data.data;
        console.log(this.data)
        this.setData(this.data);
    
    }
    AjouterListener(){
        this.noeudParent.querySelector(".btnSoumettre").addEventListener("click", (evt)=>{
            let courriel = this.noeudParent.querySelector("[name='courriel']").value;
            console.log(courriel)
            ServiceBiere.ajouterCommentaires(6, {courriel : "toto@toto.com", commentaire:" allo le monde"}, (data)=>{
                console.log(data);
            });

        })
    }

    
}