export interface Author{
  _id?:number,
  firstname?: String,
  lastname?: String,
  imageURL?: String,
  dob?: String,
  shortDescription?: String,
  book?:[{_id:number}]
}
