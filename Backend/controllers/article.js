'use strict'

// Libraries
let validator = require('validator');
let fs = require('fs');
let path = require('path');

let Article = require('../models/article');

let controller = {

    courseData: (req, res) => {
        let hello = req.body.hello;

        return res.status(200).send({
            curse: 'Master en Frameworks JS',
            author: 'Daniel Gil Alegre',
            url: 'codemincer.es',
            hello
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'Soy la acción test de mi controlador de artículos.'
        });
    },

    createArticle: (req, res) => {
        // Collect params by post
        let params = req.body;
        let validate_title;
        let validate_content;

        // Validate data (validator)
        try {
            validate_title = !validator.isEmpty(params.title);
            validate_content = !validator.isEmpty(params.content);
        } catch (e) {
            return res.status(200).send({
                status: 'error',
                message: 'Parameters are missing.'
            });
        }

        if (validate_title && validate_content) {

            // Create object
            let article = new Article();

            // Assign values
            article.title = params.title;
            article.content = params.content;
            article.image = null;

            // Save the object
            article.save((err, articleStored) => {
                if (err || !articleStored) {
                    return res.status(404).send({
                        status: 'success',
                        message: 'Problema al guardar el archivo.'
                    });
                }

                // Return a response
                return res.status(200).send({
                    status: 'success',
                    article: articleStored
                });
            });

        } else {
            return res.status(200).send({
                status: 'error',
                message: 'The data is invalid.'
            });
        }
    },

    getArticles: (req, res) => {

        let last = req.params.last;

        let query = Article.find({});

        if (last || last !== undefined) {
            query.limit(2);
        }

        // Find objects
        query.sort('_id').exec((err, articles) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error returning objects.'
                });
            }

            if (!articles) {
                return res.status(404).send({
                    status: 'error',
                    message: 'There are no objects to show.'
                });
            }

            return res.status(200).send({
                status: 'success',
                articles
            });
        });

    },

    getArticle: (req, res) => {

        // Get id of URL
        let _id = req.params.id;

        // Check if exists
        if (!_id) {
            return res.status(404).send({
                status: 'error',
                message: 'Identifier error.'
            })
        }

        // Search object
        Article.findById(_id, (err, article) => {

            if (!article) {
                return res.status(404).send({
                    status: 'error',
                    message: 'There are no objects to show with that id.'
                });
            }

            return res.status(200).send({
                status: 'success',
                article
            });

        })

    },

    updateArticle: (req, res) => {

        // Variables
        let validate_title;
        let validate_content;

        // Get id of URL
        let _id = req.params.id;

        // Get the received data from method put
        let params = req.body;

        // Validate data
        try {
            validate_title = !validator.isEmpty(params.title);
            validate_content = !validator.isEmpty(params.content);
        } catch (e) {
            return res.status(404).send({
                status: 'error',
                message: 'Parameters are missing to send.'
            })
        }

        // Check if exists
        if (validate_title && validate_content) {

            // Find and update object
            Article.findOneAndUpdate({_id: _id}, params, {new: true}, (err, objectUpdated) => {
                if (err || !objectUpdated) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'Error updating object data.'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    article: objectUpdated
                })
            });

        } else {
            return res.status(200).send({
                status: 'error',
                message: 'The parameters are invalid.'
            });
        }

    },

    deleteArticle: (req, res) => {

        // Get id of URL
        let _id = req.params.id;

        // Find and delete object
        Article.findOneAndDelete({_id: _id}, (err, objectDeleted) => {
            if (err || !objectDeleted) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error deleting object.'
                });
            }

            return res.status(200).send({
                status: 'success',
                article: objectDeleted
            })
        });

    },

    uploadFile: (req, res) => {

        // Check if file was selected
        if (!req.files) {
            return res.status(404).send({
                status: 'error',
                message: 'Unselected file.'
            });
        }

        // Get file data
        // let filePath = req.files.file0.path;
        // console.log(req.file.file0);
        // let fileSplit = filePath.split('\\'); // For Windows
        // let fileSplit = filePath.split('/'); // For Linux or macOS
        // let fileName = fileSplit[2];
        // let fileExt = fileName.split('\.')[1];

        // Check if the file as an image
        // if (fileExt !== 'png' && fileExt !== 'jpg' && fileExt !== 'jpeg' && fileExt !== 'gif') {
        //
        //     // Delete uploaded file
        //     fs.unlink(filePath, (err) => {
        //         return res.status(200).send({
        //             status: 'error',
        //             message: 'The file extension is invalid.'
        //         });
        //     });
        //
        // } else {
        //
        //     // If all are valid, get object id
        //     let _id = req.params.id;
        //     Article.findOneAndUpdate({_id: _id}, {image: fileName}, {new: true}, (err, objectUpdated) => {
        //
        //         if (err || !objectUpdated) {
        //             return res.status(200).send({
        //                 status: 'error',
        //                 message: 'Error saving file.'
        //             });
        //         }
        //
        //         return res.status(200).send({
        //             status: 'success',
        //             object: objectUpdated
        //         });
        //     });
        //
        // }

        return res.status(200).send({
            status: 'success',
            files: req.body
        });

    }, // End uploadFile

    getFile: (req, res) => {

        let file = req.params.image;
        let pathFile = './upload/articles/' + file;

        fs.exists(pathFile, (exists) => {
            console.log(exists);
            if (exists) {
                return res.sendFile(path.resolve(pathFile));
            } else {
                return res.status(404).send({
                    status: 'error',
                    message: 'The file doesn\'t exist.'
                });
            }
        })

    },

    search: (req, res) => {

        // Get parameter of search
        let search = req.params.search;

        Article
            .find({
                    '$or': [
                        {'title': {'$regex': search, '$options': 'i'}},
                        {'content': {'$regex': search, '$options': 'i'}}
                    ]
                }
            )
            .sort([['date', 'descending']])
            .exec((err, articles) => {

                // if (err) {
                //     return res.status(500).send({
                //         status: 'error',
                //         message: 'Execution error.'
                //     });
                // }
                //
                // if (!objects || objects.length <= 0) {
                //     return res.status(500).send({
                //         status: 'error',
                //         message: 'There isn\'t objects.'
                //     });
                // }

                return res.status(200).send({
                    status: 'success',
                    articles
                });
            });

    } // End search

}; // End Controller

module.exports = controller;