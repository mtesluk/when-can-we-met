const server = 'http://139.162.135.51';
const prefix = 'wcwm';

export const environment = {
  production: true,
  url: {
    login: `${server}/${prefix}/login`,
    group: `${server}/${prefix}/groups`,
    user: `${server}/${prefix}/users`,
    meeting: `${server}/${prefix}/meetings`,
    addUser: (id) => `${server}/${prefix}/groups/${id}/add_user`,
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
