const app = require('express')();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.set('port', process.env.PORT || 8081);

app.get('/api/test', (req, res) => {
  try {
    console.log('its working!');
    //console.log("About to send all the skills");
    res.send(JSON.parse('{"name":"John", "age":30, "city":"New York"}'));
  } catch (err) {
    console.log(err);
  }
});

app.listen(app.get('port'), function () {
  console.log('Express app vercel-express-react-demo is running on port', app.get('port'));
});

module.exports = app;
