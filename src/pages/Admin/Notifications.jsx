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
        // Sort messages by createdAt in descending order (newest first)
        const sortedMessages = response.data.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setMessages(sortedMessages);
        filterMessages(sortedMessages, "week"); // Default filter: Last Week
      } catch (error) {
        console.error("Error fetching messages", error);
      }
    };
    fetchMessages();
  }, []);

  const filterMessages = (data, criteria) => {
    const now = moment();
    let filtered = [...data]; // Create a copy to avoid mutating the original array

    if (criteria === "today") {
      filtered = filtered.filter(msg => moment(msg.createdAt).isSame(now, "day"));
    } else if (criteria === "week") {
      filtered = filtered.filter(msg => moment(msg.createdAt).isAfter(now.subtract(7, "days")));
    } else if (criteria === "month") {
      filtered = filtered.filter(msg => moment(msg.createdAt).isAfter(now.subtract(30, "days")));
    } else if (criteria === "all") {
      filtered = data; // No filtering for "All"
    }

    setFilteredMessages(filtered);
    setFilter(criteria);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4 sm:mb-0 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Notifications
          </h1>
          <select
            className="w-full sm:w-auto p-3 rounded-xl bg-white border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm hover:shadow-md transition-all duration-300 text-sm font-medium"
            value={filter}
            onChange={(e) => filterMessages(messages, e.target.value)}
          >
            <option value="all">All Notifications</option>
            <option value="today">Today</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
          </select>
        </div>

        {/* Notifications List */}
        <div className="space-y-6">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((msg) => (
              <div
                key={msg._id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-100"
              >
                <div className="flex items-start space-x-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-sm">
                      {msg.firstname[0].toUpperCase()}
                    </div>
                  </div>

                  {/* Notification Content */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-lg font-semibold text-gray-900">
                          {msg.firstname} {msg.lastname}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {msg.phonenumber} | <span className="text-indigo-600">{msg.email}</span>
                        </p>
                      </div>
                      <p className="text-xs text-gray-500">
                        {moment(msg.createdAt).format("MMMM Do YYYY, h:mm A")}
                      </p>
                    </div>
                    <p className="text-gray-700 mt-3 leading-relaxed">{msg.problem}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-xl shadow-md">
              <p className="text-gray-500 text-lg font-medium">No notifications found for this period.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;