import {InMemoryDbService  } from "angular-in-memory-web-api";
import { Category } from "./pages/categories/shared/category.model";
import { Entry } from "./pages/entries/shared/entry.model";
export class InMemoryDataBase implements InMemoryDbService{
    createDb(){
        const categories : Category[] = [
            {id:1, name:"Moradia",description:"Pagamento das contas de casa"},
            {id:2, name:"Saúde",description:"Plano de saúde e remédios"},
            {id:3, name:"Lazer",description:"Cinema, parque , praia"},
            {id:4, name:"Salário",description:"Recebimento de salário"},
            {id:5, name:"Freelas",description:"Trabalhos freela"},

        ];

        const entries: Entry[] = [
            {id:1, name:'Gasolina', categoryId:categories[0].id, category:categories[0], paid:false,date:'14/04/2018', amount:'200',type:'revenue',description:'Gastos com gás de cozinha' } as Entry,
            {id:2, name:'Parque', categoryId:categories[0].id, category:categories[0], paid:false,date:'14/04/2018', amount:'200',type:'revenue',description:'Gastos com gás de cozinha' } as Entry,
            {id:3, name:'Zoologico', categoryId:categories[0].id, category:categories[0], paid:true,date:'14/04/2018', amount:'1000',type:'expense',description:'Gastos com gás de cozinha' } as Entry,
            {id:4, name:'Gás de cozinha', categoryId:categories[0].id, category:categories[0], paid:false,date:'14/04/2018', amount:'3000',type:'expense',description:'Gastos com gás de cozinha' } as Entry,
            {id:5, name:'Gás de cozinha', categoryId:categories[0].id, category:categories[0], paid:true,date:'14/04/2018', amount:'5000',type:'expense',description:'Gastos com gás de cozinha' } as Entry,
            {id:6, name:'Gás de cozinha', categoryId:categories[0].id, category:categories[0], paid:false,date:'14/04/2018', amount:'100',type:'revenue',description:'Gastos com gás de cozinha' } as Entry,

        ]


        return {categories, entries};
    }
}
