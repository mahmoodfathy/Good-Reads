import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthorsService } from '../../../../Services/authors.service';
import { ActivatedRoute } from '@angular/router';
import { Author } from '../../../../models/author';
import { UserBooksService } from '../../../../Services/userBooks.service';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css'],
})
export class AuthorDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private getOneAuthorService: AuthorsService,
    private authorActivatedRoute: ActivatedRoute
  ) {}
  AuthorsDetails: Author = {};
  subscriber: any;
  ngOnInit(): void {
    this.subscriber = this.getOneAuthorService
      .getAuthorById(this.authorActivatedRoute.snapshot.params.id)
      .subscribe(
        (res: any) => {
          this.AuthorsDetails = res.body;
          console.log(this.AuthorsDetails);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
}
