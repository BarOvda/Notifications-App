using NotifierApp.Model;
using System;
using System.Collections.Generic;
using System.Threading;

namespace NotifierApp
{
    class Program
    {
       static string connection = "mongodb+srv://my_user1:1234@cluster0.9h1vb.mongodb.net/takoomi?retryWrites=true&w=majority";
        static string database = "takoomi";
        static string table = "notifications";
        static DbHelper dbHelper = new DbHelper(connection, database);

        [Obsolete]
        static void Main(string[] args)
        {
            List<Notification> _notifications = dbHelper.GetAllRecords<Notification>(table);

            var startTimeSpan = TimeSpan.Zero;
            var periodTimeSpan = TimeSpan.FromMinutes(3);
            Timer t = new Timer(RnadomizeNotification, table, startTimeSpan, periodTimeSpan);



            string command = string.Empty;
            while (!command.Equals("exit",StringComparison.OrdinalIgnoreCase))
            {
                command = Console.ReadLine();
                if (command.ToLower() == "Report".ToLower())
                {
                    t.Dispose();
                    PrintReport();
                    t = new Timer(RnadomizeNotification, table, periodTimeSpan, periodTimeSpan);
                }
            }

            t.Dispose();

        }

        [Obsolete]
        public static void RnadomizeNotification(Object o)
        {
            string table = o.ToString();
            var _notifications = dbHelper.GetAllRecords<Notification>("notifications");
            Random random = new Random();

            int num = random.Next(0, _notifications.Count);

            var _notf = _notifications[num];
            
            if (_notf != null)
            {
                DisplayNotification(_notf);
                UpdateNnotification(_notf);
            }

            GC.Collect();
        }      
        
        private static void DisplayNotification(Notification notification)
        {
            Console.Out.WriteLine("-----------------------------------------------------------------------");
            Console.Out.WriteLine("------ Notification Title = " + notification.title);
            Console.Out.WriteLine("------ Notification Description = " + notification.description);
            Console.Out.WriteLine("------ Notification Button = " + string.Join(",", notification.buttons));
            Console.Out.WriteLine("------ Times Shown = " + notification.times_shown);
            Console.Out.WriteLine("-----------------------------------------------------------------------");
            Console.Out.WriteLine();
        }

        [Obsolete]
        private static void UpdateNnotification(Notification notification)
        {
            notification.times_shown++;
            dbHelper.UpdateRecord("notifications", notification.Id, notification);
        }

        private static void PrintReport()
        {
            Console.Out.WriteLine("-----------------------------------------------------------------------");
            Console.Out.WriteLine("-------------------        Report       -------------------------------");
            Console.Out.WriteLine("-----------------------------------------------------------------------");
            Console.Out.WriteLine();
            var _notifications = dbHelper.GetAllRecords<Notification>("notifications");
            foreach (var item in _notifications)
            {
                DisplayNotification(item);
            }

            Console.Out.WriteLine();
            Console.Out.WriteLine("-----------------------------------------------------------------------");
            Console.Out.WriteLine("-------------------    End Report       -------------------------------");
            Console.Out.WriteLine("-----------------------------------------------------------------------");
            Console.Out.WriteLine();
        }

    }
}
