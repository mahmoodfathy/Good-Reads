export interface Book{
  _id?:String;
  name?: String,
  cover?:String,
  description?: String,
  details?: [{
     Paperback: String ,
     PublishedDate: String,
     OriginalTitle: String,
     EditionLanguage: String,
     Characters: String }
  ],
  avgRating?:number,
  totalRatingCount?: number,
  totalRatingValue?: number,
  totalReviewsCount?: number,
  addedDate?: Date,
  rating?: number,
  review?: String,
  author?: {_id?:String,firstname?:String,lastname?:String},
  category?: {_id?:String,category?:String}
}
