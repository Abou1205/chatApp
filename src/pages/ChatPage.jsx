import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db, auth, storage } from "../firebase/config";
import { useEffect, useState } from "react";
import Message from "../components/Message";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { BsCardImage } from "react-icons/bs";
import { IoSend } from "react-icons/io5";

const ChatPage = ({ room, setRoom, setIsAuth }) => {
  const [msg, setMsg] = useState();

  const uploadImage = async (file) => {
    // if file is not image stop the function
    if (!file || !file.type.startsWith("image")) return null;
    // create reference
    const fileRef = ref(storage, file.name);

    // upload file
    await uploadBytes(fileRef, file);

    // get the file url
    return await getDownloadURL(fileRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageContent = e.target[0].files[0];

    const url = await uploadImage(imageContent);

    // referencing collection
    const msgCollection = collection(db, "messages");

    // add new document to collection
    await addDoc(msgCollection, {
      text: e.target[1].value,
      imageContent: url,
      room,
      author: {
        name: auth.currentUser?.displayName,
        id: auth.currentUser?.uid,
        image: auth.currentUser?.photoURL,
      },
      createdAt: serverTimestamp(),
    });
    // form reset
    e.target.reset();
  };

  useEffect(() => {
    const msgCollection = collection(db, "messages");

    // filter settings
    const q = query(
      msgCollection,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );

    onSnapshot(q, (snapshot) => {
      const tempMsg = [];
      // forEach all documents, get the data, add to array
      snapshot.docs.forEach((doc) => {
        tempMsg.push(doc.data());
      });
      // adding messages to state
      setMsg(tempMsg);
    });
  }, []);

  return (
    <div className="chat-page">
      <header>
        <p>{auth.currentUser?.displayName}</p>
        <p className="room">{room}</p>
        <div>
          <button onClick={(e) => setRoom(e.target.value)}>Diff. Room</button>
          <button
            className="sign-out"
            onClick={() => {
              setIsAuth(false);
              localStorage.removeItem("TOKEN");
            }}
            type="button"
          >
            Sign Out
          </button>
        </div>
      </header>
      <main>
        {msg?.map((data, i) => (
          <Message data={data} key={i} />
        ))}
      </main>

      <form onSubmit={handleSubmit}>
        <label htmlFor="image-input" className="input-file-label">
          <BsCardImage />
        </label>
        <input type="file" className="input-file" id="image-input" />
        <input
          className="text-input"
          type="text"
          placeholder="Write your message"
          required
        />
        <button>
          <IoSend />
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
