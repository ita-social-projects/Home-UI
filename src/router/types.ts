export enum RoutesEnum {
  StartPage = '/',
  UserLogin = '/login',
  RegisterCooperation = '/register-cooperation',
  RegisterUser = '/register-user',
  ManageUser = '/main/manage-user',
  MainPage = '/main',
  Cooperation = '/main/cooperation',
  ManageApartments = '/main/cooperation/:id',
  ApartmentInfo = '/main/cooperation/:id/:apartment',
  Polls = '/main/polls',
  InvitationSection = '/main/invitations',
  PageErrorInvintation = '/broken-link',
  PollInfo = '/main/polls/:id',

  NotFound = '/:catchAll(.*)',

  TodoAppSection = '/main/todo',
}
