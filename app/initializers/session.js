import store from '../store';

window.session = store.getSession();
session.restore();