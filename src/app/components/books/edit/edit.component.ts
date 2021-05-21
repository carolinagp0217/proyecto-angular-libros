import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { NgAuthService } from 'src/app/services/ng-auth.service';
import { Books } from 'src/app/shared/navigation/models/books.interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  book: Books;
  bookForm!: FormGroup;
  showMsg: boolean = false;
  result!: String;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public ngAuthService: NgAuthService,
    private bookService: BooksService
  ) {
    const navitation = this.router.getCurrentNavigation();
    this.book = navitation?.extras?.state?.value;
    this.initForm();
  }

  /**
   * Método inicial que valida si exite un libro cargado en caso contrario redirecciona
   */
  ngOnInit(): void {
    if (typeof this.book == 'undefined') {
      this.router.navigate(['create']);
    }
    else {
      this.bookForm.patchValue(this.book);
    }
  }

  /**
   * Método que guarda libro modificado
   */
  onSave(): void {
    this.bookService.modifyBook(this.bookForm.value).subscribe(
      result => {        
        this.showMsg = true;
        this.result = result.mensaje;
        setTimeout(() => {
          this.showMsg = false;
          this.router.navigate(["list"]);
        }, 3000);        
      },error => {console.log(error)}
    )
  }

  /**
   * Carga el formulario de edición
   */
  private initForm(): void {
    this.bookForm = this.fb.group({
      id : ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      autor: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      edicion: ['', [Validators.required]],
      isbn: ['', [Validators.required]],
      imagen: ["https://image.isu.pub/150228191052-49b2c93e476582e2fc70328008d7fc1b/jpg/page_1.jpg"],
      resumen: ['', [Validators.required]],
      serie: ['', [Validators.required]],
      tema: ['', [Validators.required]]
    });
  }


}
