'use strict'

let express = require('express');
let ArticleController = require('../controllers/article');

let router = express.Router();

let multiparty = require('connect-multiparty');
let mdUpload = multiparty({uploadDir: './upload/articles'});


// Test routes
router.post('/course-data', ArticleController.courseData);
router.get('/test-controller', ArticleController.test);

// Useful routes
router.post('/create-article', ArticleController.createArticle);
router.get('/articles/:last?', ArticleController.getArticles);
router.get('/article/:id', ArticleController.getArticle);
router.put('/article/:id', ArticleController.updateArticle);
router.delete('/article/:id', ArticleController.deleteArticle);
router.post('/upload-file/:id?', mdUpload, ArticleController.uploadFile);
router.get('/get-file/:image?', ArticleController.getFile);
router.get('/search/:search', ArticleController.search);


module.exports = router;
