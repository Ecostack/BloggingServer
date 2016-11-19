const router = require('koa-router')();
const Post = require('../models/post');
const mongoose = require('mongoose');

router
    .get('/', async(ctx) => {
        ctx.body = await Post.find({});
    })
    .post('/', async(ctx) => {
        if (!ctx.request.body.title || !ctx.request.body.content) {
            throw new Error('Not enough parameter');
        }

        ctx.body = await new Post(ctx.request.body).save();
    })
    .put('/:id', async(ctx) => {
        var query = {
            _id: mongoose.Types.ObjectId(ctx.params.id)
        };
        await Post.update(query, ctx.request.body);
    });
;

module.exports = router;
