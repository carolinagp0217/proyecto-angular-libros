import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { NgAuthService } from 'src/app/services/ng-auth.service';
import { Books } from 'src/app/shared/navigation/models/books.interface';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

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

  ngOnInit(): void {
  }

  /**
   * Método que consume la capacidad para guardar un libro
   */
  onSave(): void {
    this.bookService.saveBook(this.bookForm.value).subscribe(
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
   * Método que inicializa el formulario de creación
   */
  private initForm(): void {
    this.bookForm = this.fb.group({
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
