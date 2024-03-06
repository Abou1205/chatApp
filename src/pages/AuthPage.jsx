import { auth, provider } from "../firebase/config";
import { signInWithPopup } from "firebase/auth";

const AuthPage = ({ setIsAuth }) => {
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      // state update
      setIsAuth(true);

      // store token in local
      localStorage.setItem("TOKEN", data.user.refreshToken);
    });
  };

  return (
    <div className="container">
      <div className="auth">
        <h1>Chat Page</h1>

        <p>Sign in to continue</p>

        <button onClick={handleClick}>
          <img src="/g-logo.png" />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
