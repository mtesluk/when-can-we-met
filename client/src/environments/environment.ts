// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: {
    login: '/login',
    group: '/groups',
    user: '/users',
    meeting: '/meetings',
    addUser: (id) => `/groups/${id}/add_user`,
  },
  colors: {
    lightOrange: '#f5dcc0',
    lightGreen: '#aeed91',
    lightBlue: '#a5c4f7',
    lightRed: '#f3b6b7',
    green: '#60b553',
  },
  notify: {
    horizontal: 'end',
    vertical: 'right',
    class: 'notification-popup',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
