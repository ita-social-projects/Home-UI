// state: {
//     user: null
//   },
//   mutations: {
//     SET_USERS(state, user) {
//       state.user = user;
//       localStorage.setItem('token', JSON.stringify(user));
//       HTTP.defaults.headers.common.Authorization = `Basic ${user?.token}`;
//     }
//   },
//   actions: {
//     login( { commit }, payload) {
//     return HTTP
//         .get('/users', { params: { email: payload } })
//         .then( response => {
//           commit('SET_USERS', response.data[0]);
//           return response.data.length !== 0;
//         });
//     }
//   },
//   getters: {
//     loggedIn (state) {
//       return !!state.user;
//     }
