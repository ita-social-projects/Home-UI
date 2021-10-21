export enum RoutesEnum {
  StartPage = '/',
  UserLogin = '/login',
  RegisterCooperation = '/register-cooperation',
  RegisterUser = '/register-user',
  MainPage = '/main',
  Cooperation = '/main/cooperation',
  Polls = '/main/polls',

  NotFound = '/:catchAll(.*)',
}
