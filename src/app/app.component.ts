import { Component, ElementRef, ViewChild, ɵisDefaultChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Note } from './services/interfaces/note.interface';
import { NotelistService } from './services/notelist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  noteForm!: FormGroup;
  isDisable: boolean = true;
  recordNote: any = {title: "", content: ""}
  @ViewChild('title')titleField!: ElementRef;

  get title(): FormControl {
    return this.noteForm.get('title') as FormControl;
  }

  get content(): FormControl {
    return this.noteForm.get('content') as FormControl;
  }
  constructor(private fb: FormBuilder, public noteService: NotelistService){}
  ngOnInit(): void {
    this.noteForm = this.fb.group({
      title: [''],
      content: [''],
    });
  }

  onSubmit(){
    console.log(this.noteForm.value)
    this.noteService.saveNote(this.noteForm.value);

    this.title.reset("");
    this.content.reset("");
  }

  deleteNote(title: string){
    this.noteService.removeNote(title)
  }

  displayNote(title: string){
    const curNote = this.noteService.findNoteByTitle(title);
    this.title.reset(curNote?.title);
    this.content.reset(curNote?.content)
    this.recordNote = curNote
    this.isDisable = true
  }

  enableBtn(){
    this.isDisable = false;
  }

  revert(){
    this.title.reset(this.recordNote.title);
    this.content.reset(this.recordNote.content);
    this.isDisable = true;
  }

  startEnter(){
    this.title.reset("");
    this.content.reset("");
    this.titleField.nativeElement.focus();
    this.isDisable = true;
  }



}
