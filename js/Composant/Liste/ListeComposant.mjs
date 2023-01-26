import ServiceBiere from "../../ServiceBiere.mjs";
import Composant from "../Composant.mjs";

export default class ListeComposant extends Composant{
    template = "liste";
    noeudParent = ""
    //pathGabarit ="/js/Composant/Liste/liste.html";
    constructor(data, gabarit){
        let pathGabarit ="./js/Composant/Liste/liste.html";
        super(data, pathGabarit);
        this.noeudParent = document.querySelector(".app");
        console.log(data)
        
        if(!data){
            this.getBieres();
        }else{
            console.log(data);
            this.setData(data, true); 
        }

    }

    getBieres(){
        ServiceBiere.getListeBieres(this.setData.bind(this));

    }

    AjouterListener(){

         //bouton ascendant et descendant pour nom de la biere
        document.querySelector(".btnNomASC").addEventListener("click", (evt)=>{
            this.data.data.sort((a,b)=>{
                return a.nom.localeCompare(b.nom);
            })
            this.setData(this.data, true);
        })
        document.querySelector(".btnNomDESC").addEventListener("click", (evt)=>{
            this.data.data.sort((a,b)=>{
                return b.nom.localeCompare(a.nom);
            })
            this.setData(this.data, true);
        })
        //bouton ascendant et descendant pour brasserie
        document.querySelector(".btnBrasserieASC").addEventListener("click", (evt)=>{
            this.data.data.sort((a,b)=>{
                return a.brasserie.localeCompare(b.brasserie);
            })
            this.setData(this.data, true);
        })
        document.querySelector(".btnBrasserieDESC").addEventListener("click", (evt)=>{
            this.data.data.sort((a,b)=>{
                return b.brasserie.localeCompare(a.brasserie);
            })
            this.setData(this.data, true);
        })
          //bouton ascendant et descendant pour les notes
          document.querySelector(".btnNoteASC").addEventListener("click", (evt)=>{
            console.log(this.data.data);
            this.data.data.sort((a,b)=>{
                return a.note_moyenne.localeCompare(b.note_moyenne);
            })
            this.setData(this.data, true);
        })
        document.querySelector(".btnNoteDESC").addEventListener("click", (evt)=>{
            this.data.data.sort((a,b)=>{
                return b.note_moyenne.localeCompare(a.note_moyenne);
            })
            this.setData(this.data, true);
        })
    }

    
}