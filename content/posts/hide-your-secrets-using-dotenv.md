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

##
