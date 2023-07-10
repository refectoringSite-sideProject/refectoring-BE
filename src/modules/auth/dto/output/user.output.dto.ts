export class UserOutputDto {
  private id: number;
  private email: string;
  private password: string;
  private point: number;
  private nickname: string;

  get _id() {
    return this.id;
  }
  get _email() {
    return this.email;
  }
  get _password() {
    return this.password;
  }
}
