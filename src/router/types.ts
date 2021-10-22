export enum RoutesEnum {
  StartPage = '/',
  UserLogin = '/login',
  RegisterCooperation = '/register-cooperation',
  RegisterUser = '/register-user',
  ManageUser = '/main/manage-user',
  MainPage = '/main',
  Cooperation = '/main/cooperation',
  Polls = '/main/polls',

  NotFound = '/:catchAll(.*)',
}
