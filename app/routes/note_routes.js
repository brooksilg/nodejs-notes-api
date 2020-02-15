var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, notesDatabase) {

    app.get('/notes', (req, res) => {

        notesDatabase.find().toArray().then(notes => {
            res.send(notes);
        }).catch(() => {
            res.send({ 'error': 'An error has occurred' });
        })

    });

    app.post('/notes', (req, res) => {

        // construct the node object to send to MongoDB
        const date = new Date(new Date().toUTCString());
        const note = {
            text: req.body.body,
            title: req.body.title,
            date: date
        };

        notesDatabase.insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                console.log(result);
                res.send(result.ops[0]);
            }
        });
    });

    app.get('/notes/:id', (req, res) => {

        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };

        notesDatabase.findOne(details, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(result);
            }
        });
    });

    app.delete('/notes/:id', (req, res) => {

        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };

        notesDatabase.remove(details, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log(result);
                res.send('Note ' + id + ' deleted successfully');
            }
        });
    });

    app.put('/notes/:id', (req, res) => {

        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };

        const date = new Date(new Date().toUTCString());
        const note = {
            text: req.body.body,
            title: req.body.title,
            date: date
        };

        notesDatabase.update(details, note, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log(result);
                res.send(note);
            }
        });
    });
    
};
