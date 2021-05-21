import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { NgAuthService } from 'src/app/services/ng-auth.service';
import { Books } from 'src/app/shared/navigation/models/books.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  books: any;
  modal: boolean = false;

  navigationExtras: NavigationExtras = {
    state: {
      books: null
    }
  }
 
  constructor(
    private router: Router,
    public ngAuthService: NgAuthService,
    private bookService: BooksService
  ) { 
    const navigation = this.router.getCurrentNavigation();
    this.books = navigation?.extras?.state?.value;
  }

  /**
   * Método que redirecciona a vista list en caso de no tener libros cargados
   */
  ngOnInit(): void {
    if(typeof this.books == 'undefined'){
      this.router.navigate(['list']);
    }
  }

  /**
   * Método que carga la información del libro y la edita
   * @param books
   */
  onGoToEdit(books: any): void{
    this.navigationExtras.state!.value = books;    
    this.router.navigate(['edit'], this.navigationExtras);
  }
  
  /**
   * Método que elimina el libro por medio del ID
   * @param id 
   */
  onGoToDelete(id: string): void{
    if(confirm("Are you sure to delete?")) {
      this.bookService.deleteBook(id).subscribe(
        result => {        
          alert(result.mensaje);
          this.router.navigate(['list']);
        },error => {console.log(error)}
      )
    }    
  }

}
