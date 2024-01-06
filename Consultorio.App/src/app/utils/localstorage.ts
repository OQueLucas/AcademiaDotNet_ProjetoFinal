export class LocalStorageUtils {
  public obterUsuario() {
    return JSON.parse(localStorage.getItem('consultorio.user'));
  }

  public salvarDadosLocaisUsuario(response: any) {
    this.salvarTokenUsuario(response.accessToken);
    this.salvarUsuario(response.userToken);
  }

  public limparDadosLocaisUsuario() {
    localStorage.removeItem('consultorio.token');
    localStorage.removeItem('consultorio.user');
  }

  public obterTokenUsuario(): string {
    return localStorage.getItem('consultorio.token');
  }

  public salvarTokenUsuario(token: string) {
    localStorage.setItem('consultorio.token', token);
  }

  public salvarUsuario(user: string) {
    localStorage.setItem('consultorio.user', JSON.stringify(user));
  }
}
