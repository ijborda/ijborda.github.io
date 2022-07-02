+++
author = "Imari Joy C. Borda"
title = "Use Fuzzy Search in MongoDb"
date = "2022-06-26"
description = "Use Fuzzy Search in MongoDb"
tags = [
    "tech",
    "mongodb",
    "javascript",
    "search",
    "database"
]
toc = true
draft = true
+++

Special thanks to [Mayanwolfe](https://www.twitch.tv/videos/1508382565) for the walkthrough!

## Configure MongoDb to enable indexing

1. Go to MongoDb > Search Indexes > Create Index. Choose JSON Editor.
2. Select the correct database and collection. Paste the following JSON. Be sure that the correct field is used in the JSON.

   ```json
   {
   	"mappings": {
   		"dynamic": false,
   		"fields": {
   			"title": [
   				{
   					"foldDiacritics": false,
   					"maxGrams": 7,
   					"minGrams": 3,
   					"tokenization": "edgeGram",
   					"type": "autocomplete"
   				}
   			]
   		}
   	}
   }
   ```

## Configure MongoDB to also load Object ID

Use destructuring to use both `MongoClient` and `ObjectID` when loading `mongodb`.

```js
const { MongoClient, ObjectId } = require('mongodb');
```

## Setup a GET request for search

The use of this search request is to bring back autocomplete matches (like the dropdown that appear when typing).

```js
app.get('/search', async (req, res) => {
	try {
		let result = await collection
			.aggregate([
				{
					$search: {
						autocomplete: {
							query: `${req.query.query}`,
							path: 'title',
							fuzzy: {
								maxEdits: 2, // num of characters allowed to be wrong
								prefixLength: 3, // minimum num of characters to allow autocomplete
							},
						},
					},
				},
			])
			.toArray();
		res.send(result);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
});
```

## Setup a GET request for result

```js
app.get('/get/:id', asyn(req, res) => {
  try {
    let result = await.collection.findOne({
      "_id": ObjectID(req.params.id)
    });
    res.send(result);
  } catch {
    res.status(500).send({ message: error.message });
  }
})
```

## Setup the client side JS using JQuery

Load JQuery in the HTML head

```html
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
	integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ=="
	crossorigin="anonymous"
	referrerpolicy="no-referrer"
></script>
```

On your JS file:

```js
$(document).ready(function () {
  $('#title').autocomplete({
        source: async function(req, res) => {
          let data = await fectch(`http:localhost:8000/search?query=${req.term}`)
                      .then(results => results.json())
                      .then(results => results.map(result => {
                        return {
                          label: result.title,
                          value: result.title,
                          id: result._id
                        }
                      }))
              res(data)
        },
        minLength: 2,
        select: function(event, ui) {
          console.log(ui.item.id);
          fetch(`http:localhost:8000/get?query=${ui.item.id}`)
            .then(result => result.json())
            .then(result => {
              $('#cast').empty()
              result.cast.forEach(cast => {
                $('#cast').append(`<li>${cast}</li>`)
              })
              $('img').attr(src, result.poster)
            })
        }
  })
});
```
