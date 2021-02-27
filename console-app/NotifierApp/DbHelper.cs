using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;
using MongoDB.Bson;


namespace NotifierApp
{
    public class DbHelper
    {
        private IMongoDatabase db;

        public DbHelper(string connetion,string database)
        {
            var client = new MongoClient(connetion);
            db = client.GetDatabase(database);
        }


        public void InsertRecord<T>(string table, T record)
        {
            var collection = db.GetCollection<T>(table);
            collection.InsertOne(record);
        }


        public List<T> GetAllRecords<T>(string table)
        {
            var collection = db.GetCollection<T>(table);
            return collection.Find(new BsonDocument()).ToList();
        }


        public T GetRecordById<T>(string table, ObjectId id)
        {
            var collection = db.GetCollection<T>(table);
            var filter = Builders<T>.Filter.Eq("_id", id);


            return collection.Find(filter).First();
        }

        [Obsolete]
        public void UpdateRecord<T>(string table, ObjectId id, T record)
        {
            var collection = db.GetCollection<T>(table);
            var result = collection.ReplaceOne(
                new BsonDocument("_id", id),
                record,
                new UpdateOptions { IsUpsert = true }
                );
        }


        public void DeleteRecord<T>(string table, ObjectId id)
        {
            var collection = db.GetCollection<T>(table);
            var filter = Builders<T>.Filter.Eq("_id", id);


            collection.DeleteOne(filter);
        }

    }
}
