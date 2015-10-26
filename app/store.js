import TriviaCollection from './models/trivia/trivia-collection';
import Trivia from './models/trivia/trivia';

let trivia;

export default {
  getTriviaCollection() {
      return (trivia = trivia || new TriviaCollection());
  },

  getTriviaModel() {
    return new Trivia();
  },
}