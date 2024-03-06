import React from "react";

const RoomPage = ({ setRoom, setIsAuth }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const room = e.target[0].value;

    setRoom(room);
  };

  return (
    <form onSubmit={handleSubmit} className="room-page">
      <h1>Chat Page</h1>
      <p>Which room would you like to join?</p>
      <input type="text" placeholder="ex:friends" />
      <button type="submit">Join the room</button>
      <button
        onClick={() => {
          setIsAuth(false);
          localStorage.removeItem("TOKEN");
        }}
        type="button"
      >
        Sign Out
      </button>
    </form>
  );
};

export default RoomPage;
