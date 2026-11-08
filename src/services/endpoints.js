// Central place for every backend route used by the integration.
// Adapt the paths here if the real contract differs.
export const endpoints = {
  csrf: '/auth/csrf/',
  login: '/auth/login/',
  me: '/auth/me/',
  logout: '/auth/logout/',
  changePassword: '/auth/change-password/',
  patients: '/patients/',
  patient: id => `/patients/${encodeURIComponent(id)}/`,
  profile: '/profile/',
  support: '/support/',
  terms: '/terms/',
}
