Node.js notes API

Following [this guide](https://www.freecodecamp.org/news/building-a-simple-node-js-api-in-under-30-minutes-a07ea9e390d2/) on Freecodecamp

Install dependencies:
```
npm install
```

Serve:

```
npm run serve
```

See `app/routes/note_routes.js` for routes

You will need to add your own `config/db.js` with the following:
```
module.exports = {
    url : "mongodb://<username>:<password>@cluster..."
};
```
