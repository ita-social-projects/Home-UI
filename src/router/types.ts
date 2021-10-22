export enum RoutesEnum {
  StartPage = '/',
  UserLogin = '/login',
  RegisterCooperation = '/register-cooperation',
  RegisterUser = '/register-user',
  ManageUser = '/main/manage-user',
  MainPage = '/main',
  Cooperation = '/main/cooperation',
  ApartmentsMock = '/cooperation/apartments-mock',
  ApartmentsInfoMock = '/cooperation/apartments-info-mock',
  Polls = '/main/polls',

  NotFound = '/:catchAll(.*)',
}
