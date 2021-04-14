export interface Author{
  _id?:number,
  firstname?: String,
  lastname?: String,
  imageUrl?: String,
  dob?: Date,
  shortdescription?: String,
  book?:[{_id:number}]
}
