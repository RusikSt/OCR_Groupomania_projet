// schema pour les objet en ligne//

const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  userId: { type: String, required: true },//identifiant unique//
  post: { type: String, required: true },//description//
  image: { type: String, required: false },//image//
  likes: { type: Number, required: false, default: 0 },//nombre des utilisateur qui aime//
  dislikes: { type: Number, required: false, default: 0 },//nombre des utilisateur qui n'aime pas//
  usersLiked: { type: [String], required: false },
  usersDisliked: { type: [String], required: false },
});

module.exports = mongoose.model('post', postSchema);