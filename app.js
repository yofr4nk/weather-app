const koa = require('koa'); 
const koaRouter = require('koa-router'); 
const koaBody = require('koa-bodyparser'); 
const cors = require('koa-cors');
const { graphqlKoa, graphiqlKoa } = require('graphql-server-koa');
const app = new koa();
const router = new koaRouter();
const PORT = process.env.PORT || 3000;
const myGraphQLSchema = require('./graphql/schemas/index');
const {mongoDBConnect} = require('./models/connection');

app.use(cors());
app.use(koaBody({
  extendTypes: {
    json: ['application/x-javascript']
  }
}));

router.post('/graphql', koaBody(), graphqlKoa({ schema: myGraphQLSchema }));
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT, () => {
  mongoDBConnect();
	console.log('The Weather App Server is running in port', PORT);
});