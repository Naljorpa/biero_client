import Affichage from "../Affichage.mjs";

export default Composant {
    constructor(data, gabarit){
        if(data) {
            this.data = data;
        }
        if(gabarit){
            this.gabarit = gabarit;
        }        
    }

    setData(data){
        this.data = data;
    }

    getData(){
        return this.data;
    }
    ChargeTemplate(){
        
    }
    Afficher(){
        
    }
}