import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Post from "./components/Post";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "./firebase";
import ImageUpload from "./components/ImageUpload";
import axios from "./axios";
import Pusher from "pusher-js";

const pusher = new Pusher("0aa81767445fc05af66e", {
  cluster: "ap2",
});

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const [user, setUser] = useState(null);
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSignIn, setOpenSignIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser: any) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);

  const fetchPosts = async () => {
    await axios.get("/sync").then((response) => setPosts(response.data));
  };

  useEffect(() => {
    const channel = pusher.subscribe("posts");
    channel.bind("inserted", (data) => {
      fetchPosts();
    });
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  const signIn = (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).catch((error) =>
      console.log("err signin >>> ", error.message)
    );
    setOpenSignIn(false);
  };

  const signUp = (e: any) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser: any) => {
        updateProfile(authUser.user, {
          displayName: username,
        })
          .then(() => {
            // Profile updated!
            console.log("Profile updated");
          })
          .catch((error) => {
            // An error occurred
            console.log("updateProfile err >>> ", error);
          });
      })
      .catch((error: any) => console.log("err signup >>> ", error.message));
    setOpen(false);
  };

  return (
    <div className="app">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="logo192.png"
                alt="Header"
              />
            </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>
              Sign Up
            </Button>
          </form>
        </div>
      </Modal>
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="logo192.png"
                alt="Header"
              />
            </center>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>
              Sign In
            </Button>
          </form>
        </div>
      </Modal>
      <div className="app__header">
        <img className="app__headerImage" src={logo} alt="Header" />
        {user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
      </div>
      <div className="app__posts">
        {posts.map((post) => (
          <Post
            key={post._id}
            username={post.user}
            caption={post.caption}
            imageUrl={post.image}
          />
        ))}
      </div>
      {user ? (
        <ImageUpload user={user} />
      ) : (
        <h3 className="app__notLogin">Need to login to upload</h3>
      )}
    </div>
  );
}

export default App;
