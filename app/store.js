import TriviaCollection from './models/trivia/trivia-collection';
import Trivia from './models/trivia/trivia';
import Session from './models/session';
import User from './models/user';
import CommentCollection from './models/comment-collection'
import TownCollection from './models/town-collection'
import PictureCollection from './models/picture-collection'
import Event from './models/event';
import EventCollection from './models/event-collection';

let session, towns;

let triviaCache = {};
let commentsCache = {};
let picturesCache = {};
let eventsCache = {};


export default {
  getTownCollection() {
    return(towns = towns || new TownCollection())
  }, 

  getTown(id) {
    return towns.get(id)
  },

  newTown(name, location) {
    towns.create({
      name: name,
      location: {
        __type: 'GeoPoint',
        latitude: location.lat,
        longitude: location.lng,
      }
    })
  },

  getTriviaCollection(id) {
    let trivia = (triviaCache[id] = triviaCache[id] || new TriviaCollection({townId: id}));
    triviaCache[id] = trivia;
    return trivia;
  },

  newTownTrivia(id, text) {
    let trivia = (triviaCache[id] = triviaCache[id] || new TriviaCollection({townId: id}));
    trivia.create({
      body: text,
      town: {objectId: id}
    })
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
    commentsCache[id] = comments;
    return comments;    
  },

  commentOnTrivia(id, comment) {
    let userId = session.get('currentUser').get('objectId');
    let comments = (commentsCache[id] = commentsCache[id] || new CommentCollection(null, {triviaId: id, userId: userId}))
    comments.create({
      text: comment,
      comment_on: {objectId: id},
    })
  },

  getPictureCollection(id) {
    let pictures = (picturesCache[id] = picturesCache[id] || new PictureCollection({townId: id}));
    picturesCache[id] = pictures;
    return pictures;
  },

  getPictureComments(id) {
    let comments = (commentsCache[id] = commentsCache[id] || new CommentCollection(null, {pictureId: id}));
    commentsCache[id] = comments;
    return comments;
  },

  commentOnPicture(id, comment) {
    let comments = (commentsCache[id] = commentsCache[id] || new CommentCollection(null, {pictureId: id}));
    comments.create({
      text: comment,
      comment_on: {objectId: id},
    })
  },

  newEvent(townId, userId, event) {
    let events = (eventsCache[id] = eventsCache[id] || new EventCollection({townId: id}))
    events.create({
      title: event.title,
      description: event.description,
      url: event.url,
      date: {"__type": "Date", "iso": event.date},
      town: {objectId: townId},
      creator: {objectId: userId}
    })
  },
  
  getEventsCollection(id) {
    let events = (eventsCache[id] = eventsCache[id] || new EventCollection({townId: id}));
    eventsCache[id] = events;
    return events;
  },

  getEvent(townId, eventId) {
    return eventsCache[townId].get(eventId);
  },

  getEventComments(id) {
    let comments = (commentsCache[id] = commentsCache[id] || new CommentCollection(null, {eventId: id}));
    commentsCache[id] = comments;
    return comments; 
  },

  commentOnEvent(id, comment) {
    let comments = (commentsCache[id] = commentsCache[id] || new CommentCollection(null, {eventId: id}));
    comments.create({
      text: comment,
      comment_on: {objectId: id},
    })
  },
}