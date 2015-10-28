import TriviaCollection from './models/trivia/trivia-collection';
import Trivia from './models/trivia/trivia';
import Session from './models/session';
import User from './models/user';

let trivia, session;

export default {
  getTriviaCollection() {
      return (trivia = trivia || new TriviaCollection());
  },

  getTriviaModel() {
    return new Trivia();
  },

  getSession() {
    return (session = session || new Session());
  },

  getUser(options) {
    return new User(options);
  },
}