// code away!
const express =  require('express');
const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter');

const server = express();

server.use(express.json());

server.get('/',(req, res) => {
    console.log("Lambda Project")
    res.send(`
        <h1>Lambda Project, web api 3<h1>
    `);
});

server.use('/posts', postRouter)
server.use('/users', userRouter)

const port = 8000;
server.listen(port, () => console.log('\n=== API on port 8000 ===\n'));