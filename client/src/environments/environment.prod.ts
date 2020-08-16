const server = 'https://wcwm.herokuapp.com';

export const environment = {
  production: true,
  url: {
    login: server + '/login',
    group: server + '/groups',
    user: server + '/users',
    meeting: server + '/meetings',
    addUser: (id) => `${server}/groups/${id}/add_user`,
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
  }
};
