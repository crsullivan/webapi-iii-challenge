// code away!
const express =  require('express');
const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter');

const server = express();


function logger(req, res, next) {
    console.dir([req.originalUrl, req.method, new Date().toISOString()])  
    next();
}

server.use(logger)

server.use(express.json());

server.use('/posts', postRouter)
server.use('/users', userRouter)

server.get('/',(req, res) => {
    console.log("Lambda Project")
    res.send(`
        <h1>Lambda Project, web api 3<h1>
    `);
});

const port = 8000;
server.listen(port, () => console.log('\n=== API on port 8000 ===\n'));