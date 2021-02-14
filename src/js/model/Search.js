import axios from 'axios';
import { proxy} from '../config';
export default class Search{
    constructor(query){
       this.query=query;
    }
   async getResults(){
    //const proxy='https://cors-anywhere.herokuapp.com/';
    try{
        const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
        //console.log(res);
        this.result=res.data.recipes;
    }
    catch(error){
         alert(error);
    }
}
}







