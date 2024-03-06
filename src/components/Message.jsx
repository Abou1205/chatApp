import { auth } from "../firebase/config";

const Message = ({ data }) => {
  if (auth.currentUser?.uid === data.author.id) {
    return (
      <>
        <p className="msg-user">
          {data.text}
          <img src={data.imageContent} className="auth-user-pic" />
        </p>
      </>
    );
  }

  return (
    <>
      <div className="msg-other">
        <p className="user-info">
          <img src={data.author.image} alt="" />
          <span>{data.author.name}</span>
        </p>

        <p className="msg-text">
          {data.text}
          <img src={data.imageContent} className="other-pic" />
        </p>
      </div>
    </>
  );
};

export default Message;
