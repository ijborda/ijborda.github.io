+++
author = "Imari Joy C. Borda"
title = "Use Fuzzy Search in MongoDb"
date = "2019-07-31"
description = "Use Fuzzy Search in MongoDb"
tags = [
    "tech",
    "mongodb",
    "javascript",
    "search",
    "database",
    "fuzzy search"
]
toc = true
draft = false
+++

Special thanks to [Mayanwolfe](https://www.twitch.tv/videos/1508382565) for the walkthrough!

## Configure MongoDb to enable indexing

1. Go to MongoDb > Target Collectio > Search Indexes > Create Index. Choose JSON Editor.
2. Select the correct database and collection. Paste the following JSON. Be sure that the correct field is used in the JSON. Also, make sure you input a descriptive index name.

   ```json
   {
   	"mappings": {
   		"dynamic": false,
   		"fields": {
   			"field-name": [
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

The use of this search request is to bring back autocomplete matches (like the dropdown that appears when typing).

```js
// Get autocomplete results
app.get('/search', async (req, res) => {
	try {
		let result = await collection
			.aggregate([
				{
					$search: {
						index: 'index-name',
						autocomplete: {
							query: `${req.query.query}`,
							path: 'field-name',
							fuzzy: {
								maxEdits: 2, // num of characters allowed to be wrong
								prefixLength: 2, // minimum num of characters to allow autocomplete
							},
						},
					},
				},
			])
			.toArray();
		res.send(result);
	} catch (err) {
		res.status(500).send({ message: err.message });
	}
});
```

## Setup a GET request for getting item information

This is used when a selection is made from fuzzy results.

```js
app.get('/item/:id', async (req, res) => {
	try {
		const result = await collection.findOne({ _id: ObjectId(req.params.id) });
		res.json(result);
	} catch {
		res.status(500).send({ message: err.message });
	}
});
```

## Setup up the HTML for the search

```html
<div>
	<input id="search" type="text" />
</div>
```

## Setup the client side JS using JQuery

Load JQuery in the HTML head.

```html
<link
	rel="stylesheet"
	href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css"
/>
<script src="//code.jquery.com/jquery-1.12.4.js"></script>
<script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
```

On your JS file:

```js
$(document).ready(function () {
	$('#input-name').autocomplete({
		// Define the source of the autocomplete results
		source: async function (req, res) {
			let data = await (await fetch(`/search?query=${req.term}`)).json();
			let results = data.map((result) => {
				return {
					label: result['field-name'],
					value: result['field-name'],
					id: result._id,
				};
			});
			res(results);
		},
		// Minimum Length
		minLength: 2,
		// Define the action when a result is selected
		select: function (_, ui) {
			// Somehow, async/await does not work here.
			const id = ui.item.id;
			fetch(`/item/${id}`)
				.then((result) => result.json())
				.then((result) => {
					// Insert here what your want to do with the result
					console.log(result);
				});
		},
	});
});
```
