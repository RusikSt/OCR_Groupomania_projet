// in controllers

const Post = require('../models/post');
const fs = require('fs');

exports.get = (req, res, next) => {
  Post.find()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({
      error
    }));
};
exports.save = (req, res, next) => {

  let image = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : '';

  const post = new Post({
    post: req.body.post,
    userId: req.body.userId,
    image,
    like: 0,
    dislike: 0
  });
  post.save()
    .then(() => res.status(201).json({
      message: 'Post enregistré !'
    }))
    .catch(error => res.status(400).json({
      error
    }));
};
exports.getOne = (req, res, next) => {
  Post.findOne({
      _id: req.params.id
    })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({
      error
    }));
};
exports.modifyPost = (req, res, next) => {
  const postObject = req.file ? {
    ...JSON.parse(req.body.post),
    image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : {
    ...req.body
  };
  Post.updateOne({
      _id: req.params.id
    }, {
      ...postObject,
      _id: req.params.id
    })
    .then(() => res.status(200).json({
      message: 'Post modifié !'
    }))
    .catch(error => res.status(400).json({
      error
    }));
};
exports.deletePost = (req, res, next) => {

  Post.findOne({
    _id: req.params.id
  })
  .then(post => {
      if (post.image != '') {
        console.log(post.image.split('/images/')[1])
        fs.unlink(`images/${post.image.split('/images/')[1]}`, (err) => {
          if (err) throw err;
          console.log('Image supprimé avec succès');
        });
      }

      Post.deleteOne({
        _id: req.params.id
      })
      .then(() => res.status(200).json({
        message: 'Post supprimé !'
      }))
      .catch(error => res.status(400).json({
        error
      }));

    })
    .catch(error => res.status(500).json({
      error
    }));
};
exports.likePost = async (req, res, next) => {
  try {


    const post = await Post.findOne({
      _id: req.params.id
    });
    if (!post) {
      res.status(404).json({
        message: 'not found !'
      })
      return;
    }
    switch (req.body.like) {
      case 1:

        await Post.updateOne({
          _id: req.params.id
        }, {
          $inc: {
            likes: 1
          },
          $push: {
            usersLiked: req.body.userId
          },
          _id: req.params.id
        });
        res.status(201).json({
          message: 'Tu aime'
        });

        break;
      case -1:
        await Post.updateOne({
          _id: req.params.id
        }, {
          $inc: {
            dislikes: 1
          },
          $push: {
            usersDisliked: req.body.userId
          },
          _id: req.params.id
        })
        res.status(201).json({
          message: 'Tu n`aime pas'
        });


        break;
      case 0:
        const like = post.usersLiked.find(value => value === req.body.userId);
        if (like) {
          await Post.updateOne({
            _id: req.params.id
          }, {
            $inc: {
              likes: -1
            },
            $pull: {
              usersLiked: req.body.userId
            },
            _id: req.params.id
          })
        } else {
          await Post.updateOne({
            _id: req.params.id
          }, {
            $inc: {
              dislikes: -1
            },
            $pull: {
              usersDisliked: req.body.userId
            },
            _id: req.params.id
          });
        }
        res.status(201).json({

        });
        break;
      default:
        break;
    }
  } catch (error) {
    res.status(400).json({
      error
    });
  }

};