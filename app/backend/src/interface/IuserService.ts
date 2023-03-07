export default interface IuserService {
  LoginUser(email: string, password: string): Promise<{ token: string; }>;
}
