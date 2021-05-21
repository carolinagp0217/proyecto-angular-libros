import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Books } from '../shared/navigation/models/books.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgAuthService } from './ng-auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books!: Observable<Books[]>;
  url_api = 'https://us-central1-back-practica-final.cloudfunctions.net/app/api/libros';
  headers: HttpHeaders = new HttpHeaders({
    'uuid': Math.random().toString()
  });
  
  constructor(
    private http: HttpClient,
    public ngAuthService: NgAuthService,
    ) { }

  getListBooks() {
    return this.http
    .get<Books>(this.url_api, { headers: this.headers  })
    .pipe(map(books => books));
  }

  saveBook(book: Books) {    
     return this.http
      .post<Books>(this.url_api, book, { headers: this.headers })
  }

  deleteBook(id: string) {
    return this.http
      .delete<Books>(`${this.url_api}/${id}`, { headers: this.headers })
  }

  modifyBook(book: any) {    
     return this.http
      .put<Books>(`${this.url_api}/${book.id}`, book, { headers: this.headers });
  }

  getSpecificBook(id: string) {
    console.log("getSpecifiBook Service:", id);
    return this.http
    .get<Books>(`${this.url_api}/${id}`, { headers: this.headers  })
    .pipe(map(books => books));
  }

}
