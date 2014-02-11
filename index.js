var api = require('marvel-api');
var settingsFile = "./settings";
var settings = require(settingsFile);

var marvel = api.createClient({
  publicKey: settings.publicKey,
  privateKey: settings.privateKey
});

var numComics, randComic, randOffset = 0;

marvel.comics.findAll(1, function(err, results) {
  if (err) {
    return console.error(err);
  }

  numComics = (results.meta.total);
  randComic = Math.floor(Math.random() * numComics) + 1;
  randOffset = Math.ceil((randComic+1)/10)*10;

  marvel.comics.findAll(1, randOffset, function(err, results) {
    if (err) {
      return console.error(err);
    }

    console.log("Data provided by Marvel. © 2014 Marvel");
    console.log(results.data[0].title);
    console.log(results.data[0].description);
    console.log(results.data[0].thumbnail.path + "/portrait_uncanny." + results.data[0].thumbnail.extension);
  });

});


