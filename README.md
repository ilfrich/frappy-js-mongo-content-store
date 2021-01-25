# MongoDB Content Stores for NodeJS

Content Storage for NodeJS using MongoDB

## Usage

```javascript
import { ContentStore } from "@frappy/js-mongo-content-store"
import mongodb from "mongodb"

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017"
// create mongoDB connection
mongodb.MongoClient.connect(MONGO_URL, {
    useNewUrlParser: true,
}).then(client => {
    // initialise store
    const contentStore = new ContentStore(client, "myDatabaseName", "content")
    
    contentStore.findByReference("mydemoreference").then(contentList => { 
        // list of content elements that are associated with the provided reference
        contentList.forEach(content => {
            console.log(content.references, content.content)  // content.content is the payload structure
        })  
    })
})
```

## Methods

- `findByReference(referenceId)` - returns a list of content objects assigned to the given reference
- `findByType(contentType)` - returns a list of content objects of a given type (structure)
- `findByReferenceAndType(referenceId, contentType)` - returns a list of content objects of a given type / structure 
 that are associated to a given reference.
- `updateContent(docId, label, references, content)` - updates the `label`, `references` (assignments) and `content`
 (payload) of a given content element. The `contentType` is the only attribute that cannot / should not be updated.
 