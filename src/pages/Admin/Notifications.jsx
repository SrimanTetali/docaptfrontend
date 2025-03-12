import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const Notifications = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [filter, setFilter] = useState("week");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/contact");
        setMessages(response.data);
        filterMessages(response.data, "week"); // Default filter: Last Week
      } catch (error) {
        console.error("Error fetching messages", error);
      }
    };
    fetchMessages();
  }, []);

  const filterMessages = (data, criteria) => {
    const now = moment();
    let filtered = data;
    
    if (criteria === "today") {
      filtered = data.filter(msg => moment(msg.createdAt).isSame(now, "day"));
    } else if (criteria === "week") {
      filtered = data.filter(msg => moment(msg.createdAt).isAfter(now.subtract(7, "days")));
    } else if (criteria === "month") {
      filtered = data.filter(msg => moment(msg.createdAt).isAfter(now.subtract(30, "days")));
    }
    
    setFilteredMessages(filtered);
    setFilter(criteria);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <select
            className="p-2 pl-4 pr-8 border border-gray-300 rounded-full bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            value={filter}
            onChange={(e) => filterMessages(messages, e.target.value)}
          >
            <option value="all">All</option>
            <option value="today">Today</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
          </select>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((msg) => (
              <div
                key={msg._id}
                className="group p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out border border-gray-100 hover:border-blue-100"
              >
                <div className="flex items-start space-x-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {msg.firstname[0]}
                    </div>
                  </div>

                  {/* Notification Content */}
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-gray-900">
                      {msg.firstname} {msg.lastname}
                    </p>
                    <p className="text-sm text-gray-600">
                      {msg.phonenumber} | {msg.email}
                    </p>
                    <p className="text-gray-700 mt-2">{msg.problem}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {moment(msg.createdAt).format("MMMM Do YYYY, h:mm A")}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No notifications found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;