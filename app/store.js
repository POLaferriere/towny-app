import TriviaCollection from './models/trivia/trivia-collection';
import Trivia from './models/trivia/trivia';
import Session from './models/session';
import User from './models/user';
import CommentCollection from './models/comment-collection'
import TownCollection from './models/town-collection'

let trivia, session, towns;

let triviaCache = {};
let commentsCache = {};


export default {
  getTownCollection() {
    return(towns = towns || new TownCollection())
  }, 

  getTown(id) {
    return towns.get(id)
  },

  getTriviaCollection(id) {
      return (triviaCache[id] = triviaCache[id] || new TriviaCollection({townId: id}));
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

  getCurrentUser() {
    return session.get('currentUser');
  },

  getTriviaComments(id) {
    let comments = (commentsCache[id] = commentsCache[id] || new CommentCollection(null, {triviaId: id}));
    return comments;    
  },

  commentOnTrivia(id, comment) {
    let userId = session.get('currentUser').get('objectId');
    let comments = (commentsCache[id] = commentsCache[id] || new CommentCollection(null, {triviaId: id, userId: userId}))
    comments.create({
      text: comment,
      comment_on: {objectId: id},
      comment_by: {objectId: userId},
    })
  }
}