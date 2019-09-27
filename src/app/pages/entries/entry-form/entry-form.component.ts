import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Entry } from "../shared/entry.model";
import { EntryService } from "../shared/entry.service";

import  toastr from "toastr";
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit, AfterContentChecked {

  currentAction : string;
  entryForm : FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  entry : Entry = new Entry();

  imaskconfig ={
    mask:Number,
    scale:2,
    thousandsSeparator: '',
    padFractionalZeros:true,
    normalizeZeros:true,
    radix:','
  };


  constructor(
      private entryService: EntryService,
      private route: ActivatedRoute,
      private router: Router,
      private formBuilder: FormBuilder
       ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildEntryForm();
    this.loadEntry();
  }

  private loadEntry() {
    if(this.currentAction == "edit"){
      this.route.paramMap.pipe(
        switchMap(params=> this.entryService.getById(+params.get("id")))
      )
      .subscribe(
        (entry)=> {
          this.entry = entry;
          this.entryForm.patchValue(entry);//binds loaded entry data to entryform
        },
        (error)=> alert("Ocorreu um erro no seevidor")
        
        )
      
      }
  }
  private buildEntryForm() {
    this.entryForm = this.formBuilder.group({
      id:[null],
      name: [null,[Validators.required,Validators.minLength(2)]],
      description : [null],
      type : [null, Validators.required],
      amount : [null, Validators.required],
      date : [null, Validators.required],
      paid : [null, Validators.required],
      categoryId : [null, Validators.required]
    })
  }
  private setCurrentAction() {
    if(this.route.snapshot.url[0].path == "new")
    {
      this.currentAction = "new";
    }
    else{
      this.currentAction = "edit";
    }
  }

  ngAfterContentChecked(){
    this.setPageTitle();
  }

  private setPageTitle() {
    if(this.currentAction == "new")
    {
      this.pageTitle = "Cadastro de Novo LAnçamento";      
    }
    else{
      const entryName = this.entry.name || "";
      this.pageTitle = "Edição de Lançamento " + entryName;
    }
  }

  submitForm(){
    this.submittingForm = true;
    if(this.currentAction == "new")
    {
      this.createEntry();
    }
    else{
      this.updateEntry();
    }
  }

  private createEntry() {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);

    this.entryService.create(entry)
      .subscribe(
        entry=> this.actionsForSuccess(entry),
        error=> this.actionsForError(error)
      )
  }
  private updateEntry() {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);

    this.entryService.update(entry)
      .subscribe(
        entry=> this.actionsForSuccess(entry),
        error=> this.actionsForError(error)
      )
  }

  private actionsForError(error): void {
    toastr.error("Ocorreu um erro ao processar sua solicitação");

    this.submittingForm = false;
    if(error.status === 422 ){
      this.serverErrorMessages = JSON.parse(error.body).errors;
    }
    else{
      this.serverErrorMessages = ["Falha na comunicação com o servidor"];
    }

  }
  private actionsForSuccess(entry:Entry): void {
    toastr.success("Solicitação procesada com sucesso");

    //redirect/reload component page
    this.router.navigateByUrl("entries",{skipLocationChange: true}).then(
      ()=>this.router.navigate(["entries",entry.id,"edit"])
    )
  }

  
  

}
