const koa = require('koa'); 
const koaRouter = require('koa-router'); 
const koaBody = require('koa-bodyparser'); 
const cors = require('koa-cors');
const app = new koa();
const router = new koaRouter();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(koaBody({
  extendTypes: {
    json: ['application/x-javascript']
  }
}));
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT, () => {
	console.log('The Weather App Server is running in port', PORT);
});