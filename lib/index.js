/**
 * Created by lzq on 2018/4/26.
 */

const devMiddleware = require('webpack-dev-middleware');

module.exports = function koaMwr (compiler, options){
    let pubPah;
    let content;

    let middleware = devMiddleware(compiler, options)

    options.publicPath ? pubPah = options.publicPath : pubPah = '/';

    let waitUntilValid = middleware.waitUntilValid;
    let context = middleware.context;
    let fs = context.fs;

    async function koaMiddle (ctx, next){

        if(ctx.url === '/__webpack_hmr'){  // 这里需要改造的，容错太差，可以参考

        }else{
            let fileName = middleware.getFilenameFromUrl(pubPah, compiler, ctx.url);
            fileName = fileName + ctx.url;
            content = fs.readFileSync(fileName)
        }

        ctx.status = 200;
        // ctx.response.type = 'html';
        ctx.set({'Content-Type': 'text/html'});
        ctx.body = content;
        await next();
    }
    return {
        koaMiddle,
        waitUntilValid,
        context
    }
};


