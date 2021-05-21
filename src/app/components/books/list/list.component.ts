import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BooksService } from 'src/app/services/books.service';
import { NgAuthService } from 'src/app/services/ng-auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  booksList!: any;
  books$ = this.bookService.books;
  bookForm!: FormGroup;

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public ngAuthService: NgAuthService,
    private bookService: BooksService
  ) {
    // this.initForm();
  }

  /**
   * Carga el listado de libros
   */
  ngOnInit(): void {
    this.getList();
  }

  /**
   * Método que recibe el libro para editar
   * @param item
   */
  onGoToEdit(item: any): void {
    this.navigationExtras.state!.value = item;
    this.router.navigate(['edit'], this.navigationExtras);
  }

  /**
   * Método que recibe el id del libro para eliminar
   * @param item
   */
  onGoToDelete(item: any): void {
    if (confirm("Are you sure to delete?")) {
      this.bookService.deleteBook(item.id).subscribe(
        result => {
          alert(result.mensaje);
          this.getList();
        }, error => { console.log(error) }
      )
    }
  }

  /**
   * Método que carga toda la información relacionada con los libros
   * @param item
   */
  onGoToDetails(item: any): void {
    this.navigationExtras.state!.value = item;
    this.router.navigate(['details'], this.navigationExtras);
  }

  /**
   * Método que lista los libros
   */
  getList() {
    this.bookService.getListBooks().subscribe(
      result => {
        this.booksList = result.resultado;
      }, error => { console.log(error) }
    )
  }

  /**
   * Método que permite obtener un libro en especifico
   * @param search 
   */
  onGoToSearch(search: string) {
    console.log("onGoToSearch id:", search);

    this.router.events.pipe(filter(search => search instanceof this.booksList)).subscribe(
      search => {
        this.bookService.getSpecificBook(this.booksList.id).subscribe(
          result => {
            this.booksList = result.resultado;
            console.log(this.bookService);
          }, error => { console.log(error) })
      });
  }

}
