export interface RedactorModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;

}

export interface NewRedactor {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
