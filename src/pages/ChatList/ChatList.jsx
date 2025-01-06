import React from "react";
import "./ChatList.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import baseUrl from "../../utils/urls";
import { Navbar } from "../../components";

const ChatList = () => {
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery("chatParticipants", async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const userId = localStorage.getItem("user_id");
    if (!userId) {
      throw new Error("User ID not found");
    }

    try {
      const response = await axios.get(`${baseUrl}/chat-participants/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      console.error("Error fetching chat participants:", err.response?.data || err.message);
      throw err;
    }
  });

  const handleViewChat = (participant) => {
    navigate(`/chat?username=${participant.username}`);
  };

  if (isLoading) {
    return <div className="loading__message">Loading chat participants...</div>;
  }

  if (error) {
    return (
      <div className="error__message">
        {error.message === "No authentication token found"
          ? "Please login to view your chats"
          : "Error loading chat participants"}
      </div>
    );
  }

  return (
    <div className="mychats__main">
      <Navbar />
      <div className="mychats__container">
        <h1>My Chats</h1>
        {data?.length === 0 ? (
          <div className="no__chats">No chats found</div>
        ) : (
          <ul className="chat__list">
            {data.map((participant) => {
              console.log("Participant Data:", participant); // Debug to verify participant data
              return (
                <li
                  key={participant.id}
                  className="chat__item"
                  onClick={() => handleViewChat(participant)}
                >
                  <div className="chat__details">
                    <span className="chat__username">{participant.username}</span>
                    <span className="chat__message__count">
                      {participant.unread_count || 0} unread messages
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ChatList;
