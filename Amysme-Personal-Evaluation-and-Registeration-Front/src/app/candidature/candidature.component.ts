import { Component, OnInit } from '@angular/core';
import { CandidatureService } from '../core/services/candidature.service';
import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';


export interface Education {
  name: string;
}
export interface WorkExperience {
  name: string;
}


@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.css']
})
export class CandidatureComponent {


  public newCandidature = {
    languages: []as string[],
    softSkills: []as string[],
    technicalSkills: []as string[],
    education: []as string[],
    workExperience: []as string[],
    rating: 0,
  };

languagesList = ['Anglais', 'Arabe', 'Francais', 'Allemand'];
softSkillsList = ['Public Speaking', 'Negotiation', 'Conflit resolution', 'Confidence', 'Friendlines', 'Empathetic listening', 'Decision making', 'Communication', 'Creativity', 'Analytical thinking', 'Questioning', 'Ambitious', 'Motivated' ];
technicalSkillsList = ['C/C++', 'C#', 'JavaScript', 'PHP', 'Python', 'Go', 'R', 'SQL', 'Node', 'git', 'Angular', 'ReactJs' ];



addOnBlur = true;
readonly separatorKeysCodes = [ENTER, COMMA] as const;
educations: Education[] = [];
workExperiences: WorkExperience[] = []

afficheResult = false;


constructor(private candidatureService: CandidatureService){}


removeEducation(education: Education): void {
const index = this.educations.indexOf(education);

if (index >= 0) {
this.educations.splice(index, 1);
}
}




addEducation(event: MatChipInputEvent): void {
const value = (event.value || '').trim();
if (value) {
this.educations.push({name: value});
}
event.chipInput!.clear();
}


editEducation(education: Education, event: MatChipEditedEvent) {
const value = event.value.trim();

if (!value) {
this.removeEducation(education);
return;
}
const index = this.educations.indexOf(education);
if (index > 0) {
this.educations[index].name = value;
}
}









removeWorkExperience(workExperience: WorkExperience): void {
const index = this.workExperiences.indexOf(workExperience);

if (index >= 0) {
this.workExperiences.splice(index, 1);
}
}




addWorkExperience(event: MatChipInputEvent): void {
const value = (event.value || '').trim();
if (value) {
this.workExperiences.push({name: value});
}
event.chipInput!.clear();
}


editWorkExperience(workExperience: WorkExperience, event: MatChipEditedEvent) {
const value = event.value.trim();

if (!value) {
this.removeWorkExperience(workExperience);
return;
}
const index = this.educations.indexOf(workExperience);
if (index > 0) {
this.workExperiences[index].name = value;
}
}












sendData() {

if(this.newCandidature.languages.includes("Anglais")){
  this.newCandidature.rating++;


}
if(this.newCandidature.languages.length = 4){
  this.newCandidature.rating++;

}
if(this.newCandidature.softSkills.includes("Public Speaking")){
  this.newCandidature.rating++;

}
if(this.newCandidature.softSkills.includes("Conflit resolution")){
  this.newCandidature.rating++;

}
if(this.newCandidature.softSkills.includes("Creativity")){
  this.newCandidature.rating++;

}
if(this.newCandidature.softSkills.includes("Decision making")){
  this.newCandidature.rating++;

}
if(this.newCandidature.softSkills.includes("Motivated")){
  this.newCandidature.rating++;

}
if(this.newCandidature.softSkills.length >= 6){
  this.newCandidature.rating++;
}
if(this.newCandidature.technicalSkills.includes("C#")){
  this.newCandidature.rating++;

}
if(this.newCandidature.technicalSkills.includes("Angular")){
  this.newCandidature.rating++;

}
if(this.newCandidature.technicalSkills.includes("Go")){
  this.newCandidature.rating++;

}
if(this.newCandidature.technicalSkills.includes("Node")){
  this.newCandidature.rating++;

}
if(this.newCandidature.technicalSkills.length >= 6){
  this.newCandidature.rating++;
}
if(this.newCandidature.education.includes("insat")){
  this.newCandidature.rating = this.newCandidature.rating + 2 ;

}
if(this.newCandidature.education.includes("supcom")){
  this.newCandidature.rating ++ ;

}
if(this.newCandidature.technicalSkills.length >= 5){
  this.newCandidature.rating++;
}
if(this.newCandidature.workExperience.length >= 2){
  this.newCandidature.rating++;
}
if(this.newCandidature.workExperience.length >= 5){
  this.newCandidature.rating = this.newCandidature.rating + 2 ;
}


this.newCandidature.rating = this.newCandidature.rating / 2
console.log(this.newCandidature.rating);


this.candidatureService.postCandidature(this.newCandidature);
this.afficheResult = true

}


}


