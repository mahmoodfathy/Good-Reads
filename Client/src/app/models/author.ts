export interface Author {
  _id?: number;
  firstname?: string;
  lastname?: string;
  imageURL?: string;
  dob?: string;
  shortdescription?: string;
  book?: [{ _id: number }];
}
