export interface Book{
  _id:number;
  name: String,
  cover:String,
  description: String,
  details: [{
     Paperback: String ,
     PublishedDate: String,
     OriginalTitle: String,
     EditionLanguage: String,
     Characters: String }
  ],
  totalRatingCount: number,
  totalRatingValue: number,
  totalReviewsCount: number,
  addedDate: Date,
  rating: number,
  review: String,
  author: {_id:number},
  category: {_id:number}

}
