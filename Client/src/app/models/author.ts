export interface Author{
  _id?:number,
  firstname?: String,
  lastname?: String,
  imageURL?: String,
  dob?: String,
  shortdescription?: String,
  book?:[{_id:number}]
}
