using System;
using System.Collections.Generic;
using System.Text;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace NotifierApp.Model
{
    [BsonIgnoreExtraElements]
    public class Notification
    {
        public ObjectId Id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public List<string> buttons { get; set; }
        public int times_shown { get; set; }


        public Notification()
        {
            buttons = new List<string>();
        }
    }
}
