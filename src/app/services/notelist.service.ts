import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from './interfaces/note.interface';

@Injectable({
  providedIn: 'root'
})
export class NotelistService {
  notelist: Note[] = [];
  notelist$ = new BehaviorSubject<Note[]>(this.notelist);

  constructor() { }

  ngOnInit(){
    // const storageVal = localStorage.getItem("notelist")
    // this.notelist = storageVal ? storageVal : []
  }

  checkNoteExist(title: string){
    let res = false
    this.notelist.forEach((note) => {
      if(note.title === title){
        res = true
      }
    })
    return res
  }

  //Save note to local storage
  saveNote(note: any){
    //const storageVal = localStorage.getItem("notelist")
    //const val = storageVal ? JSON.parse(storageVal) : [];
    //push to val

    if(this.checkNoteExist(note.title)){
      //If exist, update the note
      const tmp = this.notelist.filter((curnote) => note.title !== curnote.title);
      this.notelist = [...tmp, note];
      this.notelist$.next(this.notelist);
    }else{
      //Else add it to the list
      alert("Note Was Saved!")
      this.notelist = [...this.notelist, note];
      this.notelist$.next(this.notelist);
    }
    //val.push(note);
    //Save to local storage
    //localStorage.setItem("notelist", JSON.stringify(this.notelist))
  }

  removeNote(title: string){
    this.notelist = this.notelist.filter((note) => note.title !== title);
    this.notelist$.next(this.notelist)
  }

  findNoteByTitle(title: string){
    return this.notelist.find((note) => note.title === title)
  }


}
