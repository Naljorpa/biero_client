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
        console.log("ajouter listener");
        document.querySelector(".btnNomASC").addEventListener("click", (evt)=>{
            console.log(evt)
            this.data.data.sort((a,b)=>{
                return a.nom.localeCompare(b.nom);
            })
            //console.log(this.data.data[0])
            this.setData(this.data, true);
        })
        document.querySelector(".btnNomDESC").addEventListener("click", (evt)=>{
            console.log(evt)
            this.data.data.sort((a,b)=>{
                return b.nom.localeCompare(a.nom);
            })
            //console.log(this.data.data[0])
            this.setData(this.data, true);
        })
    }

    
}