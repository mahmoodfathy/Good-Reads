export interface Author{
  _id?:number,
  firstname?: String,
  lastname?: String,
  imageURL?: String,
  dob?: Date,
  shortDescription?: String,
  book?:[{_id:number}]
}
