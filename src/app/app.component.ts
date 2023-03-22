import { Component } from '@angular/core';
import { SubjectService } from './service/subject.service';
import { AboutComponent } from './about/about.component';
import { Routes, RouterModule } from '@angular/router';
import { Subject } from 'src/models/subject';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {


  constructor(private _subjectService: SubjectService, private router: Router) {}

  title:string = 'Subjects & Users CRUD';  

  subjects: Subject [] = [];

  subject:Subject = {_id:'',name:'',users: [], semester:0, difficulty:'easy'};
  subjectForEditing:Subject = {_id:'',name:'',users: [], semester:0, difficulty:'easy'};
  msg:string = '';
  hideUpdate:boolean = true;

  myValue = 0;
  ngOnInit(): void {
    this.getSubjects();
  }

  getSubjects(){
    this._subjectService.getSubjects().subscribe(data => {
      console.log(data);
      this.subjects = data;
      }, error => {
      console.log(error);
    })
  }

  eraseSubject(id:string){
    var answer = confirm('Estas seguro de querer eliminarlo?');
    if(answer){
      this._subjectService.deleteSubject(id).subscribe(data => {
        this.subjects = [];
        this.getSubjects();    
      }, error => {
        console.log(error);
      })
    }    
  }

  saveSubject(){
    this._subjectService.addSubject(this.subject).subscribe(data => {
      this.subjects = [];
      this.getSubjects();
      //Vaciamos el JSON provisional de subject.
      this.subject = {_id:'',name:'',users: [], semester:0, difficulty:'easy'}; 
    }, error => {
      console.log(error);
    })
  }

  editSubject(id:string){
    this._subjectService.updateSubject(id,this.subjectForEditing).subscribe(data =>{
      this.subjectForEditing = {_id:'',name:'',users: [], semester:0, difficulty:'easy'};
      this.hideUpdate = true;
      this.subjects = [];
      this.getSubjects();
    }, error => {
      console.log(error);
    })
  }

  
  displayingEdit(i:number):void{
    this.hideUpdate = false;
    this.subjectForEditing
    this.subjectForEditing.name = this.subjects[i].name;
    this.subjectForEditing.users = this.subjects[i].users;
    this.subjectForEditing.semester = this.subjects[i].semester;
    this.subjectForEditing.difficulty = this.subjects[i].difficulty;
    this.myValue = i;
  }
  
  closeAlert():void{
    this.msg = '';
  }
  redirectAbout(){
    this.router.navigate(['about_component']);
  }

  redirectToExternalPage() {
    window.location.href = 'https://localhost:4200/about_component';
  } 
  deleteAllSubjects(){
    this.subjects = [];
    this._subjectService.eraseAllSubjects().subscribe(data =>{
      this.hideUpdate = true;
      this.subjects = [];
      this.getSubjects();
    }, error => {
      console.log(error);
    })
    
  }

}
