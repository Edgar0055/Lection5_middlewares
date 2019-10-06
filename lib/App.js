/* eslint-disable no-useless-constructor */
class App {
    constructor () {
        this._middlewares = [];
    }

    use (middleware) {
        if (middleware instanceof Function) {
            this._middlewares.push(middleware);
        } else {
            // eslint-disable-next-line quotes
            throw new Error(`Error middleware`);
        }
    }

    handle (req, res) {
        console.log('-------');
        const next = (index, middlewares) => () => {
            call(index + 1, middlewares);
        };
        const call = (index, middlewares) => {
            if (index in middlewares) {
                const middleware = middlewares[index];
                middleware(req, res, next(index, middlewares));
            }
        };
        call(0, this._middlewares)
        res.end();
    }
};

module.exports = App;

// Output in the console should be
// middleware 1 start
// middleware 2
// hello from middleware 1
// middleware 3
// middleware 1 end
