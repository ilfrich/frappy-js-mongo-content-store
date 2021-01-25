import MongoDbStore from "@frappy/js-mongo-store"
import mongodb from "mongodb"


class ContentStore extends MongoDbStore {
    findByReference(referenceId) {
        return this.find(
            {
                references: referenceId,
            })
    }

    findByType(contentType) {
        return this.find(
            {
                contentType,
            })
    }

    findByReferenceAndType(referenceId, contentType) {
        return this.find(
            {
                references: referenceId,
                contentType,
            })
    }

    updateContent(docId, label, references, content) {
        const setUpdate = {
            label,
            references,
            content,
        }

        return new Promise((resolve, reject) => {
            this.collection
                .updateOne(
                    { _id: mongodb.ObjectID(docId) },
                    {
                        $set: setUpdate,
                    }
                )
                .then(() => {
                    resolve()
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}

export default ContentStore
