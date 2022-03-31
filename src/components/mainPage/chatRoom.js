import "../mainPage/style.css";
import menuIcon from "../img/menu.png";
import chat from "../img/chat.png";
import avatar2 from "../img/user.png";
// import search from "../img/search.png";
import addVideo from "../img/play-button (1).png";
import addPhoto from "../img/images.png";
import Circle from "react-circle";
import srollBottom from "../img/img_280188.png";
// import check1 from "../img/checkmark-512 (1).png";
// import check2 from "../img/checkmark-512.png";
import closeProfil from "../img/left-arrow.png";
import profil from "../img/user (1).png";
import addContact from "../img/add-friend.png";
import play from "../img/play-button-28243.png";
import iconVideo from "../img/play-button.png";
import emoji from "../img/grinning.png";
import send from "../img/send.png";
import close from "../img/left-turn-arrow.png";
import close2 from "../img/cancel.png";
import noTelepone from "../img/vintage-telephone-call.png";
import AutoScroll from "react-scrollable-feed";
import ListContact from "../feature/listContact";
import Chatsetting from "../feature/chatSetting";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Profil from "./profil";
import ContactProfil from "./contactProfil";
import Emoji from "../emojies";
import downArrow from "../img/arrow-203-24.png";
// import downArrow2 from "../img/arrow-203-24 (1).png";
import camera from "../img/photo-camera.png";
// import { Link, animateScroll as scroll } from "react-scroll";
import {
  getContact,
  getUser,
  getRoom,
  getRoomContact,
  sendChat,
  getChats,
  getAccount,
  getRoomId,
  loadProfilRoom,
  SendImage,
  SendVideo,
  deleteChat,
} from "../reducer/action";
import AddContact from "../feature/addcontact";
import moment from "moment";
import ReactPlayer from "react-player/lazy";
const ChatRoom = ({
  getChats,
  showListContact,
  addAccount,
  showContact,
  getContact,
  showAddContact,
  showAddContactMenu,
  listRoomChat,
  getUser,
  listUser,
  getAccount,
  hideContactMenu,
  getRoom,
  chats,
  roomId,
  sendChat,
  getRoomId,
  getRoomContact,
  account,
  assetLoading,
  roomProfil,
  loadProfilRoom,
  contactProfil,
  showContactProfil,
  SendImage,
  SendVideo,
  contentImageLoading,
  progressImage,
  deleteChat,
  setChatSetting,
  chatSetting,
  searchInput,
  setSearchInput,
  screenOpen,
  setScreenOpen,
}) => {
  if (!localStorage.getItem("chatLogin")) {
    localStorage.setItem("chatLogin", "false");
  }
  const [chatContent, setChatContent] = useState("");
  const [collapsChat, setCollapsChat] = useState("chatContent");
  const [chatOpt, setChatOpt] = useState("");
  const [openImg, setOpenImg] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const [forwardChat, setForwardChat] = useState(false);
  const [forwardMessage, setForwardMessage] = useState({
    name: "",
    chat: "",
    type: "",
    forwardSenderId: "",
    forwardChatId: "",
  });
  const [openDelChat, setOpenDelChat] = useState(false);
  const [delId, setDelId] = useState({});
  const [param, setParam] = useState("");
  console.log(param);
  // const showMenu = () => {
  //   if (showmenu === false) {
  //     setShowmenu(true);
  //   }
  //   if (showmenu === true) {
  //     setShowmenu(false);
  //   }
  // };

  const hideMenu = () => {
    if (chatSetting === true) {
      setChatSetting(false);
    }
  };

  const closeChatOpt = () => {
    if (chatOpt !== "") {
      setChatOpt("");
    }
  };
  useEffect(() => {
    getUser();
  }, [getUser]);
  useEffect(() => {
    getRoom();
  }, [getRoom]);
  useEffect(() => {
    getRoomContact();
  }, [getRoomContact]);
  useEffect(() => {
    getChats(roomId);
  }, [getChats, roomId]);
  useEffect(() => {
    loadProfilRoom(listRoomChat);
  }, [loadProfilRoom, listRoomChat]);
  useEffect(() => {
    getAccount();
  }, [getAccount]);

  const Send = (data) => {
    setChatContent("");
    setCollapsChat("chatContent");
    setForwardChat(false);
    setOpenEmoji(false);
    sendChat(data);
    scroll("toBottom");
  };
  const OpenEmoji1 = () => {
    setOpenEmoji(true);
    setForwardChat(false);
    setCollapsChat("chatContent2");
  };

  const OpenEmoji2 = () => {
    setOpenEmoji(true);
    setCollapsChat("chatContent4");
  };

  const CloseEmoji1 = () => {
    setOpenEmoji(false);
    setCollapsChat("chatContent");
  };

  const CloseEmoji2 = () => {
    setOpenEmoji(false);
    setCollapsChat("chatContent3");
  };

  const RoomId = (data) => {
    getRoomId(data);
    CloseEmoji1();
    setForwardChat(false);
    setScreenOpen("chat");
  };

  const functionOpenImg = (url) => {
    setOpenImg(true);
    setImage(url);
  };

  const functionOpenVideo = (url) => {
    setOpenVideo(true);
    setVideo(url);
  };
  const openForward = (data) => {
    setForwardChat(true);
    setOpenEmoji(false);
    setChatOpt(false);
    setCollapsChat("chatContent3");
    setForwardMessage({
      name: data.name,
      chat: data.chat,
      type: data.type,
      forwardSenderId: data.forwardSenderId,
      forwardChatId: data.forwardChatId,
    });
  };

  const closeForwardChat1 = () => {
    setForwardChat(false);
    setCollapsChat("chatContent");
  };

  const closeForwardChat2 = () => {
    setForwardChat(false);
    setCollapsChat("chatContent2");
  };

  const confirmDelChat = (data) => {
    console.log(data);
    setDelId(data);
    setOpenDelChat(true);
  };

  const closeDelChat = () => {
    setOpenDelChat(false);
    deleteChat(delId);
  };

  const sendImage = (data) => {
    setForwardChat(false);
    setOpenEmoji(false);
    setCollapsChat("chatContent");
    SendImage(data);
    scroll("toBottom");
  };

  const sendVideo = (data) => {
    setForwardChat(false);
    setOpenEmoji(false);
    setCollapsChat("chatContent");
    SendVideo(data);
    scroll("toBottom");
  };

  const hide = () => {
    hideMenu();
  };

  const scroll = (val) => {
    const element = document.getElementById(val);
    element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="root">
      <div className="blue-bg"></div>
      <div className="white-bg"></div>
      {openImg === true && (
        <div className="openImg position-fixed">
          <div
            className="d-flex justify-content-end"
            onClick={() => setOpenImg(false)}
          >
            <img className="closeImg" src={close} alt="" />
          </div>
          <img className="profilImgShow" src={image} alt="" />
        </div>
      )}
      {openVideo === true && (
        <div className="openImg position-fixed">
          <div
            className="d-flex justify-content-end"
            onClick={() => setOpenVideo(false)}
          >
            <img className="closeImg" src={close} alt="" />
          </div>
          <ReactPlayer
            playing
            width="80%"
            height="80vh"
            className="profilVideoShow"
            url={video}
            controls
          />
        </div>
      )}

      {
        <div className="main">
          {assetLoading === true && (
            <div>
              <div class="spinner-grow text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {assetLoading === false && (
            <div
              className={
                contactProfil === false
                  ? "ChatBox d-flex justify-content-between shadow "
                  : "ChatBox d-flex justify-content-between shadow "
              }
            >
              {
                <div
                  className={
                    screenOpen === "list-room" && contactProfil === false
                      ? "listRoom align-items-center border-end border-2"
                      : "listRoom-none align-items-center border-end border-2"
                  }
                >
                  <div className="left ">
                    <div className="chat-menu d-flex justify-content-center align-items-center">
                      <img
                        onClick={() => showContactProfil("myProfil")}
                        src={profil}
                        alt=""
                        width="25px"
                      />
                      <img
                        onClick={() => showContact(true)}
                        className="border-menu"
                        src={noTelepone}
                        alt=""
                        width="25px"
                      />
                      <img
                        onClick={() => showAddContactMenu(true)}
                        src={addContact}
                        alt=""
                        width="25px"
                      />
                    </div>

                    <div className="row menuChat d-flex justify-content-between">
                      {showListContact === false && (
                        <p className="col-3">Chats</p>
                      )}
                      {showListContact === true && (
                        <p className="col-3">
                          <img
                            onClick={() => showContact(false)}
                            className="backListContact"
                            alt=""
                            src={close}
                            width="20px"
                          />
                        </p>
                      )}
                    </div>
                    {showListContact === true && (
                      <input
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Cari kontak"
                        className="inpt"
                        autoFocus
                      />
                    )}
                  </div>

                  {showListContact === false && listRoomChat.length !== 0 && (
                    <div className="listChat">
                      {listRoomChat
                        .filter((val) => val.chat.length !== 0)
                        .map((e, index) => {
                          return (
                            <div className="listmap border-bottom border-2">
                              <div
                                onClick={() =>
                                  RoomId({
                                    userId: e.userId,
                                    destinationId: e.destinationId,
                                    roomId: e.id,
                                    destinationName: e.destinationName,
                                    destination: e.destination,
                                    account: e.accounts,
                                  })
                                }
                                className={
                                  "listView d-flex " +
                                  (e.id === roomId.myRoomId
                                    ? "blackBackground"
                                    : "")
                                }
                              >
                                <div>
                                  {e.accounts.imageProfil !== "" && (
                                    <img
                                      src={e.accounts.imageProfil}
                                      width="50px"
                                      height="50px"
                                      alt=""
                                    />
                                  )}
                                  {e.accounts.imageProfil === "" && (
                                    <img
                                      src={avatar2}
                                      width="50px"
                                      height="50px"
                                      alt=""
                                    />
                                  )}
                                </div>

                                <div className="name align-items-center">
                                  {e.destinationName === "" && (
                                    <div className="nameAndTime d-flex justify-content-between">
                                      <p className="name1">{e.destination}</p>
                                      <p className="timeRoomChat">
                                        {e.chat[e.chat.length - 1].time}
                                      </p>
                                    </div>
                                  )}

                                  {e.destinationName !== "" && (
                                    <div className="nameAndTime d-flex justify-content-between">
                                      <p className="name1">
                                        {e.destinationName}
                                      </p>
                                      <p className="timeRoomChat">
                                        {e.chat[e.chat.length - 1].time}
                                      </p>
                                    </div>
                                  )}

                                  {(e.chat[e.chat.length - 1].type === "text" ||
                                    e.chat[e.chat.length - 1].type ===
                                      "forwardText-replyText" ||
                                    e.chat[e.chat.length - 1].type ===
                                      "forwardImage-replyText" ||
                                    e.chat[e.chat.length - 1].type ===
                                      "forwardEmoji-replyText" ||
                                    e.chat[e.chat.length - 1].type ===
                                      "forwardVideo-replyText" ||
                                    e.chat[e.chat.length - 1].type ===
                                      "emoji" ||
                                    e.chat[e.chat.length - 1].type ===
                                      "forwardText-replyEmoji" ||
                                    e.chat[e.chat.length - 1].type ===
                                      "forwardEmoji-replyEmoji" ||
                                    e.chat[e.chat.length - 1].type ===
                                      "forwardImage-replyEmoji" ||
                                    e.chat[e.chat.length - 1].type === "" ||
                                    e.chat[e.chat.length - 1].type ===
                                      "forwardVideo-replyEmoji") && (
                                    <p className="pEdit textPreview">
                                      {e.chat[e.chat.length - 1].chat}
                                    </p>
                                  )}
                                  {(e.chat[e.chat.length - 1].type ===
                                    "image" ||
                                    e.chat[e.chat.length - 1].type ===
                                      "forwardText-replyImage" ||
                                    e.chat[e.chat.length - 1].type ===
                                      "forwardEmoji-replyImage" ||
                                    e.chat[e.chat.length - 1].type ===
                                      "forwardImage-replyImage" ||
                                    e.chat[e.chat.length - 1].type ===
                                      "forwardVideo-replyImage") && (
                                    <p className="textPreview">
                                      <img
                                        className="imageTypeLastChat"
                                        src={camera}
                                        alt=""
                                        width="14px"
                                        height="13px"
                                      />
                                      {"  "}
                                      Foto
                                    </p>
                                  )}
                                  {(e.chat[e.chat.length - 1].type ===
                                    "video" ||
                                    e.chat[e.chat.length - 1].type ===
                                      "forwardText-replyVideo" ||
                                    e.chat[e.chat.length - 1].type ===
                                      "forwardEmoji-replyVideo" ||
                                    e.chat[e.chat.length - 1].type ===
                                      "forwardImage-replyVideo" ||
                                    e.chat[e.chat.length - 1].type ===
                                      "forwardVideo-replyVideo") && (
                                    <p className="textPreview">
                                      <img
                                        className="imageTypeLastChat"
                                        src={iconVideo}
                                        alt=""
                                        width="14px"
                                        height="13px"
                                      />
                                      {"  "}
                                      Video
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                  {showListContact === false && listRoomChat.length === 0 && (
                    <div className="listChat justify-content-center">
                      <button
                        onClick={() => showContact(true)}
                        className="newChatIsEmpty"
                      >
                        Mulai chat baru
                      </button>
                    </div>
                  )}

                  {showListContact === true && <ListContact />}
                </div>
              }
              {showAddContact === true && <AddContact />}
              {roomId.destination !== "" && (
                <div
                  className={
                    contactProfil === false
                      ? `chatView justify-content-center ${
                          screenOpen === "chat" ? "" : "none"
                        }`
                      : `chatView2 justify-content-center ${
                          screenOpen === "chat" ? "" : "none"
                        }`
                  }
                >
                  <div className="contactView d-flex align-items-center border-bottom border-2">
                    {chatSetting === true && <Chatsetting />}
                    <div
                      className="close-chat"
                      onClick={() => setScreenOpen("list-room")}
                    >
                      <img
                        src={closeProfil}
                        width="25px"
                        height="25px"
                        alt=""
                      />
                    </div>
                    {roomId.account.imageProfil !== "" && (
                      <img
                        className="miniProfil"
                        src={roomId.account.imageProfil}
                        alt="avatar"
                      />
                    )}
                    {roomId.account.imageProfil === "" && (
                      <img className="miniProfil" src={avatar2} alt="avatar" />
                    )}
                    {roomId.destinationName !== "" && (
                      <div
                        onClick={() => showContactProfil("contactProfil")}
                        className="dest-name d-flex justify-content-start align-items-center"
                      >
                        {roomId.destinationName}
                      </div>
                    )}
                    {roomId.destinationName === "" && (
                      <div
                        onClick={() => showContactProfil("contactProfil")}
                        className="dest-name d-flex justify-content-start align-items-center"
                      >
                        {roomId.destination}
                      </div>
                    )}
                    <div
                      onClick={() => setChatSetting(true)}
                      className="menu-chat"
                    >
                      <img src={menuIcon} alt="search" width="18px" />
                    </div>
                  </div>
                  <div className={collapsChat} onClick={() => hide()}>
                    <AutoScroll>
                      {chats
                        .filter((val) => val.chat !== "")
                        .map((e, index) => {
                          return (
                            <div id={e.chat + e.timeStamp}>
                              <div
                                onClick={() => closeChatOpt("")}
                                className={
                                  e.senderId === roomId.userId
                                    ? "chatAndProfil d-flex justify-content-end"
                                    : "chatAndProfil d-flex justify-content-start"
                                }
                              >
                                {(e.type === "text" ||
                                  e.type === "forwardText-replyText" ||
                                  e.type === "forwardEmoji-replyText" ||
                                  e.type === "forwardImage-replyText" ||
                                  e.type === "forwardVideo-replyText" ||
                                  e.type === "emoji" ||
                                  e.type === "forwardText-replyEmoji" ||
                                  e.type === "forwardEmoji-replyEmoji" ||
                                  e.type === "forwardImage-replyEmoji" ||
                                  e.type === "forwardVideo-replyEmoji") && (
                                  <div
                                    className={
                                      e.senderId === roomId.userId
                                        ? "chat-ui2 shadow-sm mark1"
                                        : "chat-ui shadow-sm"
                                    }
                                  >
                                    <div>
                                      <div className="chat-content">
                                        {e.type === "text" && (
                                          <p className="text-chat">{e.chat}</p>
                                        )}
                                        {e.type === "forwardText-replyText" && (
                                          <div>
                                            <div
                                              onClick={() =>
                                                setParam(e.forwardChatId)
                                              }
                                              className="forwardText-content-text"
                                            >
                                              <div
                                                onClick={() =>
                                                  scroll(e.forwardChatId)
                                                }
                                              >
                                                <div className="forward-content-text">
                                                  <b>
                                                    {localStorage.getItem(
                                                      "chatId"
                                                    ) === e.forwardSenderId
                                                      ? "Anda"
                                                      : roomId.destinationName !==
                                                        ""
                                                      ? roomId.destinationName
                                                      : roomId.destination}
                                                  </b>
                                                </div>
                                                <div className="forward-content-text">
                                                  {e.forwardChat}
                                                </div>
                                              </div>
                                            </div>
                                            <p className="text-chat">
                                              {e.chat}
                                            </p>
                                          </div>
                                        )}
                                        {e.type ===
                                          "forwardEmoji-replyText" && (
                                          <div>
                                            <div
                                              onClick={() =>
                                                setParam(e.forwardChatId)
                                              }
                                              className="forwardText-content-text"
                                            >
                                              <div
                                                onClick={() =>
                                                  scroll(e.forwardChatId)
                                                }
                                              >
                                                <div className="forward-content-text">
                                                  <b>
                                                    {localStorage.getItem(
                                                      "chatId"
                                                    ) === e.forwardSenderId
                                                      ? "Anda"
                                                      : roomId.destinationName !==
                                                        ""
                                                      ? roomId.destinationName
                                                      : roomId.destination}
                                                  </b>
                                                </div>
                                                <div className="emoji-text-forward forward-content-text">
                                                  {e.forwardChat}
                                                </div>
                                              </div>
                                            </div>
                                            <p className="text-chat">
                                              {e.chat}
                                            </p>
                                          </div>
                                        )}
                                        {e.type ===
                                          "forwardImage-replyText" && (
                                          <div>
                                            <div
                                              onClick={() =>
                                                setParam(e.forwardChatId)
                                              }
                                              className="forwardText-content-image"
                                            >
                                              <div
                                                onClick={() =>
                                                  scroll(e.forwardChatId)
                                                }
                                              >
                                                <div className="forward-content-text">
                                                  <b>
                                                    {localStorage.getItem(
                                                      "chatId"
                                                    ) === e.forwardSenderId
                                                      ? "Anda"
                                                      : roomId.destinationName !==
                                                        ""
                                                      ? roomId.destinationName
                                                      : roomId.destination}
                                                  </b>
                                                </div>
                                                <div className="forward-content-text d-flex align-items-center">
                                                  <img
                                                    className="forward-img-prev"
                                                    src={camera}
                                                    alt=""
                                                    width="16px"
                                                    height="16px"
                                                  />
                                                  Foto
                                                  <img
                                                    className="forward-img"
                                                    alt=""
                                                    src={e.forwardChat}
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                            <p className="text-chat">
                                              {e.chat}
                                            </p>
                                          </div>
                                        )}
                                        {e.type ===
                                          "forwardVideo-replyText" && (
                                          <div>
                                            <div
                                              onClick={() =>
                                                setParam(e.forwardChatId)
                                              }
                                              className="forwardText-content-image"
                                            >
                                              <div
                                                onClick={() =>
                                                  scroll(e.forwardChatId)
                                                }
                                              >
                                                <div className="forward-content-text">
                                                  <b>
                                                    {localStorage.getItem(
                                                      "chatId"
                                                    ) === e.forwardSenderId
                                                      ? "Anda"
                                                      : roomId.destinationName !==
                                                        ""
                                                      ? roomId.destinationName
                                                      : roomId.destination}
                                                  </b>
                                                </div>
                                                <div className="forward-content-text d-flex align-items-center">
                                                  <img
                                                    className="forward-img-prev"
                                                    src={iconVideo}
                                                    alt=""
                                                    width="16px"
                                                    height="16px"
                                                  />
                                                  Video
                                                  <video
                                                    className="forward-img"
                                                    alt=""
                                                    src={e.forwardChat}
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                            <p className="text-chat">
                                              {e.chat}
                                            </p>
                                          </div>
                                        )}

                                        {e.type === "emoji" && (
                                          <p className="emoji-text text-chat">
                                            {e.chat}
                                          </p>
                                        )}
                                        {e.type ===
                                          "forwardText-replyEmoji" && (
                                          <div>
                                            <div
                                              onClick={() =>
                                                setParam(e.forwardChatId)
                                              }
                                              className="forwardText-content-text"
                                            >
                                              <div
                                                onClick={() =>
                                                  scroll(e.forwardChatId)
                                                }
                                              >
                                                <div className="forward-content-text">
                                                  <b>
                                                    {localStorage.getItem(
                                                      "chatId"
                                                    ) === e.forwardSenderId
                                                      ? "Anda"
                                                      : roomId.destinationName !==
                                                        ""
                                                      ? roomId.destinationName
                                                      : roomId.destination}
                                                  </b>
                                                </div>
                                                <div className="forward-content-text">
                                                  {e.forwardChat}
                                                </div>
                                              </div>
                                            </div>
                                            <p className="emoji-text text-chat">
                                              {e.chat}
                                            </p>
                                          </div>
                                        )}
                                        {e.type ===
                                          "forwardEmoji-replyEmoji" && (
                                          <div>
                                            <div
                                              onClick={() =>
                                                setParam(e.forwardChatId)
                                              }
                                              className="forwardText-content-text"
                                            >
                                              <div
                                                onClick={() =>
                                                  scroll(e.forwardChatId)
                                                }
                                              >
                                                <div className="forward-content-text">
                                                  <b>
                                                    {localStorage.getItem(
                                                      "chatId"
                                                    ) === e.forwardSenderId
                                                      ? "Anda"
                                                      : roomId.destinationName !==
                                                        ""
                                                      ? roomId.destinationName
                                                      : roomId.destination}
                                                  </b>
                                                </div>
                                                <div className="emoji-text-forward forward-content-text">
                                                  {e.forwardChat}
                                                </div>
                                              </div>
                                            </div>
                                            <p className="emoji-text text-chat">
                                              {e.chat}
                                            </p>
                                          </div>
                                        )}
                                        {e.type ===
                                          "forwardImage-replyEmoji" && (
                                          <div>
                                            <div
                                              onClick={() =>
                                                setParam(e.forwardChatId)
                                              }
                                              className="forwardText-content-image"
                                            >
                                              <div
                                                onClick={() =>
                                                  scroll(e.forwardChatId)
                                                }
                                              >
                                                <div className="forward-content-text">
                                                  <b>
                                                    {localStorage.getItem(
                                                      "chatId"
                                                    ) === e.forwardSenderId
                                                      ? "Anda"
                                                      : roomId.destinationName !==
                                                        ""
                                                      ? roomId.destinationName
                                                      : roomId.destination}
                                                  </b>
                                                </div>
                                                <div className="forward-content-text d-flex align-items-center">
                                                  <img
                                                    className="forward-img-prev"
                                                    src={camera}
                                                    alt=""
                                                    width="16px"
                                                    height="16px"
                                                  />
                                                  Foto
                                                  <img
                                                    className="forward-img"
                                                    alt=""
                                                    src={e.forwardChat}
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                            <p className="emoji-text text-chat">
                                              {e.chat}
                                            </p>
                                          </div>
                                        )}
                                        {e.type ===
                                          "forwardVideo-replyEmoji" && (
                                          <div>
                                            <div
                                              onClick={() =>
                                                setParam(e.forwardChatId)
                                              }
                                              className="forwardText-content-image"
                                            >
                                              <div
                                                onClick={() =>
                                                  scroll(e.forwardChatId)
                                                }
                                              >
                                                <div className="forward-content-text">
                                                  <b>
                                                    {localStorage.getItem(
                                                      "chatId"
                                                    ) === e.forwardSenderId
                                                      ? "Anda"
                                                      : roomId.destinationName !==
                                                        ""
                                                      ? roomId.destinationName
                                                      : roomId.destination}
                                                  </b>
                                                </div>
                                                <div className="forward-content-text d-flex align-items-center">
                                                  <img
                                                    className="forward-img-prev"
                                                    src={iconVideo}
                                                    alt=""
                                                    width="16px"
                                                    height="16px"
                                                  />
                                                  Video
                                                  <video
                                                    className="forward-img"
                                                    alt=""
                                                    src={e.forwardChat}
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                            <p className="emoji-text text-chat">
                                              {e.chat}
                                            </p>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    <div
                                      onClick={() => setChatOpt(e.id)}
                                      className="setting-content-text d-flex justify-content-center align-items-center"
                                    >
                                      <img
                                        src={downArrow}
                                        alt="check"
                                        width="13px"
                                        height="13px"
                                      />
                                    </div>
                                    <div className="time-content-text d-flex justify-content-center align-items-center">
                                      {e.time}
                                    </div>
                                    {chatOpt === e.id && (
                                      <div className="chat-setting-text shadow">
                                        {e.senderId === roomId.userId && (
                                          <div>
                                            <p
                                              onClick={() =>
                                                openForward({
                                                  name: "Anda",
                                                  chat: e.chat,
                                                  type: e.type,
                                                  forwardSenderId: e.senderId,
                                                  forwardChatId:
                                                    e.chat + e.timeStamp,
                                                })
                                              }
                                            >
                                              Balas
                                            </p>
                                            <p
                                              onClick={() =>
                                                confirmDelChat({
                                                  userId:
                                                    localStorage.getItem(
                                                      "chatId"
                                                    ),
                                                  roomId: e.senderRoomId,
                                                  chatId: e.id,
                                                  chat: chats,
                                                })
                                              }
                                            >
                                              Hapus
                                            </p>
                                          </div>
                                        )}
                                        {e.senderId !== roomId.userId && (
                                          <div>
                                            <p
                                              onClick={() =>
                                                openForward({
                                                  name: roomId.destinationName,
                                                  chat: e.chat,
                                                  type: e.type,
                                                  forwardSenderId: e.senderId,
                                                  forwardChatId:
                                                    e.chat + e.timeStamp,
                                                })
                                              }
                                            >
                                              Balas
                                            </p>
                                            <p
                                              onClick={() =>
                                                confirmDelChat({
                                                  userId:
                                                    localStorage.getItem(
                                                      "chatId"
                                                    ),
                                                  roomId: e.receiverRoomId,
                                                  chatId: e.id,
                                                  chat: chats,
                                                })
                                              }
                                            >
                                              Hapus
                                            </p>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                )}
                                {(e.type === "image" ||
                                  e.type === "forwardText-replyImage" ||
                                  e.type === "forwardEmoji-replyImage" ||
                                  e.type === "forwardImage-replyImage" ||
                                  e.type === "forwardVideo-replyImage" ||
                                  e.type === "video" ||
                                  e.type === "forwardText-replyVideo" ||
                                  e.type === "forwardEmoji-replyVideo" ||
                                  e.type === "forwardImage-replyVideo" ||
                                  e.type === "forwardVideo-replyVideo") && (
                                  <div
                                    className={
                                      e.senderId === roomId.userId
                                        ? "chat-ui2 shadow-sm"
                                        : "chat-ui shadow-sm"
                                    }
                                  >
                                    <div>
                                      <div className="chat-content">
                                        {e.type === "image" && (
                                          <img
                                            onClick={() =>
                                              functionOpenImg(e.chat)
                                            }
                                            className="Content-image"
                                            src={e.chat}
                                            alt=""
                                          />
                                        )}
                                        {e.type ===
                                          "forwardText-replyImage" && (
                                          <div>
                                            <div
                                              onClick={() =>
                                                setParam(e.forwardChatId)
                                              }
                                              className="max-img forwardText-content-text"
                                            >
                                              <div
                                                onClick={() =>
                                                  scroll(e.forwardChatId)
                                                }
                                              >
                                                <div className="forward-content-text">
                                                  <b>
                                                    {localStorage.getItem(
                                                      "chatId"
                                                    ) === e.forwardSenderId
                                                      ? "Anda"
                                                      : roomId.destinationName !==
                                                        ""
                                                      ? roomId.destinationName
                                                      : roomId.destination}
                                                  </b>
                                                </div>
                                                <div className="forward-content-text">
                                                  {e.forwardChat}
                                                </div>
                                              </div>
                                            </div>
                                            <img
                                              onClick={() =>
                                                functionOpenImg(e.chat)
                                              }
                                              className="Content-image"
                                              src={e.chat}
                                              alt=""
                                            />
                                          </div>
                                        )}
                                        {e.type ===
                                          "forwardEmoji-replyImage" && (
                                          <div>
                                            <div
                                              onClick={() =>
                                                setParam(e.forwardChatId)
                                              }
                                              className="max-img forwardText-content-text"
                                            >
                                              <div
                                                onClick={() =>
                                                  scroll(e.forwardChatId)
                                                }
                                              >
                                                <div className="forward-content-text">
                                                  <b>
                                                    {localStorage.getItem(
                                                      "chatId"
                                                    ) === e.forwardSenderId
                                                      ? "Anda"
                                                      : roomId.destinationName !==
                                                        ""
                                                      ? roomId.destinationName
                                                      : roomId.destination}
                                                  </b>
                                                </div>
                                                <div className="emoji-text-forward forward-content-text">
                                                  {e.forwardChat}
                                                </div>
                                              </div>
                                            </div>
                                            <img
                                              onClick={() =>
                                                functionOpenImg(e.chat)
                                              }
                                              className="Content-image"
                                              src={e.chat}
                                              alt=""
                                            />
                                          </div>
                                        )}
                                        {e.type ===
                                          "forwardImage-replyImage" && (
                                          <div>
                                            <div
                                              onClick={() =>
                                                setParam(e.forwardChatId)
                                              }
                                              className="forwardText-content-image"
                                            >
                                              <div
                                                onClick={() =>
                                                  scroll(e.forwardChatId)
                                                }
                                              >
                                                <div className="forward-content-text">
                                                  <b>
                                                    {localStorage.getItem(
                                                      "chatId"
                                                    ) === e.forwardSenderId
                                                      ? "Anda"
                                                      : roomId.destinationName !==
                                                        ""
                                                      ? roomId.destinationName
                                                      : roomId.destination}
                                                  </b>
                                                </div>
                                                <div className="forward-content-text d-flex align-items-center">
                                                  <img
                                                    className="forward-img-prev"
                                                    src={camera}
                                                    alt=""
                                                    width="16px"
                                                    height="16px"
                                                  />
                                                  Foto
                                                  <img
                                                    className="forward-img"
                                                    alt=""
                                                    src={e.forwardChat}
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                            <img
                                              onClick={() =>
                                                functionOpenImg(e.chat)
                                              }
                                              className="Content-image"
                                              src={e.chat}
                                              alt=""
                                            />
                                          </div>
                                        )}
                                        {e.type ===
                                          "forwardVideo-replyImage" && (
                                          <div>
                                            <div
                                              onClick={() =>
                                                setParam(e.forwardChatId)
                                              }
                                              className="forwardText-content-image"
                                            >
                                              <div
                                                onClick={() =>
                                                  scroll(e.forwardChatId)
                                                }
                                              >
                                                <div className="forward-content-text">
                                                  <b>
                                                    {localStorage.getItem(
                                                      "chatId"
                                                    ) === e.forwardSenderId
                                                      ? "Anda"
                                                      : roomId.destinationName !==
                                                        ""
                                                      ? roomId.destinationName
                                                      : roomId.destination}
                                                  </b>
                                                </div>
                                                <div className="forward-content-text d-flex align-items-center">
                                                  <img
                                                    className="forward-img-prev"
                                                    src={iconVideo}
                                                    alt=""
                                                    width="16px"
                                                    height="16px"
                                                  />
                                                  Video
                                                  <video
                                                    className="forward-img"
                                                    alt=""
                                                    src={e.forwardChat}
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                            <img
                                              onClick={() =>
                                                functionOpenImg(e.chat)
                                              }
                                              className="Content-image"
                                              src={e.chat}
                                              alt=""
                                            />
                                          </div>
                                        )}
                                        {e.type === "video" && (
                                          <div
                                            onClick={() =>
                                              functionOpenVideo(e.chat)
                                            }
                                            className="video-forward"
                                          >
                                            <img
                                              className="play-video"
                                              src={play}
                                              alt=""
                                              width="40px"
                                            />
                                            <video
                                              className="Content-video"
                                              src={e.chat}
                                              alt=""
                                            />
                                          </div>
                                        )}
                                        {e.type ===
                                          "forwardText-replyVideo" && (
                                          <div>
                                            <div
                                              onClick={() =>
                                                setParam(e.forwardChatId)
                                              }
                                              className="max-img forwardText-content-text"
                                            >
                                              <div
                                                onClick={() =>
                                                  scroll(e.forwardChatId)
                                                }
                                              >
                                                <div className="forward-content-text">
                                                  <b>
                                                    {localStorage.getItem(
                                                      "chatId"
                                                    ) === e.forwardSenderId
                                                      ? "Anda"
                                                      : roomId.destinationName !==
                                                        ""
                                                      ? roomId.destinationName
                                                      : roomId.destination}
                                                  </b>
                                                </div>
                                                <div className="forward-content-text">
                                                  {e.forwardChat}
                                                </div>
                                              </div>
                                            </div>
                                            <div
                                              onClick={() =>
                                                functionOpenVideo(e.chat)
                                              }
                                              className="video-forward"
                                            >
                                              <img
                                                className="play-video"
                                                src={play}
                                                alt=""
                                                width="40px"
                                              />
                                              <video
                                                className="Content-video"
                                                src={e.chat}
                                                alt=""
                                              />
                                            </div>
                                          </div>
                                        )}
                                        {e.type ===
                                          "forwardEmoji-replyVideo" && (
                                          <div>
                                            <div
                                              onClick={() =>
                                                setParam(e.forwardChatId)
                                              }
                                              className="max-img forwardText-content-text"
                                            >
                                              <div
                                                onClick={() =>
                                                  scroll(e.forwardChatId)
                                                }
                                              >
                                                <div className="forward-content-text">
                                                  <b>
                                                    {localStorage.getItem(
                                                      "chatId"
                                                    ) === e.forwardSenderId
                                                      ? "Anda"
                                                      : roomId.destinationName !==
                                                        ""
                                                      ? roomId.destinationName
                                                      : roomId.destination}
                                                  </b>
                                                </div>
                                                <div className="emoji-text-forward forward-content-text">
                                                  {e.forwardChat}
                                                </div>
                                              </div>
                                            </div>
                                            <div
                                              onClick={() =>
                                                functionOpenVideo(e.chat)
                                              }
                                              className="video-forward"
                                            >
                                              <img
                                                className="play-video"
                                                src={play}
                                                alt=""
                                                width="40px"
                                              />
                                              <video
                                                className="Content-video"
                                                src={e.chat}
                                                alt=""
                                              />
                                            </div>
                                          </div>
                                        )}
                                        {e.type ===
                                          "forwardImage-replyVideo" && (
                                          <div>
                                            <div
                                              onClick={() =>
                                                setParam(e.forwardChatId)
                                              }
                                              className="forwardText-content-image"
                                            >
                                              <div
                                                onClick={() =>
                                                  scroll(e.forwardChatId)
                                                }
                                              >
                                                <div className="forward-content-text">
                                                  <b>
                                                    {localStorage.getItem(
                                                      "chatId"
                                                    ) === e.forwardSenderId
                                                      ? "Anda"
                                                      : roomId.destinationName !==
                                                        ""
                                                      ? roomId.destinationName
                                                      : roomId.destination}
                                                  </b>
                                                </div>
                                                <div className="forward-content-text d-flex align-items-center">
                                                  <img
                                                    className="forward-img-prev"
                                                    src={camera}
                                                    alt=""
                                                    width="16px"
                                                    height="16px"
                                                  />
                                                  Foto
                                                  <img
                                                    className="forward-img"
                                                    alt=""
                                                    src={e.forwardChat}
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                            <div
                                              onClick={() =>
                                                functionOpenVideo(e.chat)
                                              }
                                              className="video-forward"
                                            >
                                              <img
                                                className="play-video"
                                                src={play}
                                                alt=""
                                                width="40px"
                                              />
                                              <video
                                                className="Content-video"
                                                src={e.chat}
                                                alt=""
                                              />
                                            </div>
                                          </div>
                                        )}
                                        {e.type ===
                                          "forwardVideo-replyVideo" && (
                                          <div>
                                            <div
                                              onClick={() =>
                                                setParam(e.forwardChatId)
                                              }
                                              className="forwardText-content-image"
                                            >
                                              <div
                                                onClick={() =>
                                                  scroll(e.forwardChatId)
                                                }
                                              >
                                                <div className="forward-content-text">
                                                  <b>
                                                    {localStorage.getItem(
                                                      "chatId"
                                                    ) === e.forwardSenderId
                                                      ? "Anda"
                                                      : roomId.destinationName !==
                                                        ""
                                                      ? roomId.destinationName
                                                      : roomId.destination}
                                                  </b>
                                                </div>
                                                <div className="forward-content-text d-flex align-items-center">
                                                  <img
                                                    className="forward-img-prev"
                                                    src={iconVideo}
                                                    alt=""
                                                    width="16px"
                                                    height="16px"
                                                  />
                                                  Video
                                                  <video
                                                    className="forward-img"
                                                    alt=""
                                                    src={e.forwardChat}
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                            <div
                                              onClick={() =>
                                                functionOpenVideo(e.chat)
                                              }
                                              className="video-forward"
                                            >
                                              <img
                                                className="play-video"
                                                src={play}
                                                alt=""
                                                width="40px"
                                              />
                                              <video
                                                className="Content-video"
                                                src={e.chat}
                                                alt=""
                                              />
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    <div
                                      onClick={() => setChatOpt(e.id)}
                                      className="setting-content d-flex justify-content-center align-items-center"
                                    >
                                      <img
                                        src={downArrow}
                                        alt="check"
                                        width="15px"
                                        height="15px"
                                      />
                                    </div>
                                    <div className="time-content d-flex justify-content-center align-items-center">
                                      {e.time}
                                    </div>
                                    {chatOpt === e.id && (
                                      <div className="chat-setting shadow">
                                        {e.senderId === roomId.userId && (
                                          <div>
                                            <p
                                              onClick={() =>
                                                openForward({
                                                  name: "Anda",
                                                  chat: e.chat,
                                                  type: e.type,
                                                  forwardSenderId: e.senderId,
                                                  forwardChatId:
                                                    e.chat + e.timeStamp,
                                                })
                                              }
                                            >
                                              Balas
                                            </p>
                                            <p
                                              onClick={() =>
                                                confirmDelChat({
                                                  userId:
                                                    localStorage.getItem(
                                                      "chatId"
                                                    ),
                                                  roomId: e.senderRoomId,
                                                  chatId: e.id,
                                                  chat: chats,
                                                })
                                              }
                                            >
                                              Hapus
                                            </p>
                                          </div>
                                        )}
                                        {e.senderId !== roomId.userId && (
                                          <div>
                                            <p
                                              onClick={() =>
                                                openForward({
                                                  name: roomId.destinationName,
                                                  chat: e.chat,
                                                  type: e.type,
                                                  forwardSenderId: e.senderId,
                                                  forwardChatId:
                                                    e.chat + e.timeStamp,
                                                })
                                              }
                                            >
                                              Balas
                                            </p>
                                            <p
                                              onClick={() =>
                                                confirmDelChat({
                                                  userId:
                                                    localStorage.getItem(
                                                      "chatId"
                                                    ),
                                                  roomId: e.receiverRoomId,
                                                  chatId: e.id,
                                                  chat: chats,
                                                })
                                              }
                                            >
                                              Hapus
                                            </p>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      <div id="toBottom"></div>
                      {contentImageLoading === true && (
                        <div>
                          <div>
                            <div className="chatAndProfil d-flex justify-content-end">
                              <div className="chat-ui2 shadow-sm">
                                <div>
                                  <div className="chat-content">
                                    <div
                                      className="Content-image-blob"
                                      alt=""
                                    ></div>
                                    <div className="loading-ui">
                                      <Circle
                                        animate={true}
                                        progress={progressImage}
                                        bgColor="empty" // String: Color of "empty" portion of circle.
                                        textColor="white"
                                        size={55}
                                      />
                                    </div>
                                    <div
                                      class="loading-ui spinner-border text-light"
                                      role="status"
                                    >
                                      <span class="visually-hidden">
                                        Loading...
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </AutoScroll>
                  </div>

                  {forwardChat === true && (
                    <div
                      className={
                        collapsChat === "chatContent4"
                          ? "forwardInput2 shadow-sm d-flex align-items-center"
                          : "forwardInput shadow-sm d-flex align-items-center"
                      }
                    >
                      {(forwardMessage.type === "text" ||
                        forwardMessage.type === "forwardText-replyText" ||
                        forwardMessage.type === "forwardImage-replyText" ||
                        forwardMessage.type === "forwardEmoji-replyText" ||
                        forwardMessage.type === "forwardVideo-replyText") && (
                        <div className="contentForward">
                          {forwardMessage.name !== "" && (
                            <p className="forwardName">
                              <b>{forwardMessage.name}</b>
                            </p>
                          )}
                          {forwardMessage.name === "" && (
                            <p className="forwardName">
                              <b>{roomId.destination}</b>
                            </p>
                          )}
                          <p className="forwardtext">{forwardMessage.chat}</p>
                        </div>
                      )}
                      {(forwardMessage.type === "emoji" ||
                        forwardMessage.type === "forwardText-replyEmoji" ||
                        forwardMessage.type === "forwardEmoji-replyEmoji" ||
                        forwardMessage.type === "forwardImage-replyEmoji" ||
                        forwardMessage.type === "forwardVideo-replyEmoji") && (
                        <div className="contentForward">
                          {forwardMessage.name !== "" && (
                            <p className="forwardName">
                              <b>{forwardMessage.name}</b>
                            </p>
                          )}
                          {forwardMessage.name === "" && (
                            <p className="forwardName">
                              <b>{roomId.destination}</b>
                            </p>
                          )}
                          <p className="emtForward forwardtext">
                            {forwardMessage.chat}
                          </p>
                        </div>
                      )}
                      {(forwardMessage.type === "image" ||
                        forwardMessage.type === "forwardText-replyImage" ||
                        forwardMessage.type === "forwardEmoji-replyImage" ||
                        forwardMessage.type === "forwardImage-replyImage" ||
                        forwardMessage.type === "forwardVideo-replyImage") && (
                        <div className="contentForward d-flex justify-content-between align-items-center">
                          <div>
                            {forwardMessage.name !== "" && (
                              <p className="forwardName">
                                <b>{forwardMessage.name}</b>
                              </p>
                            )}
                            {forwardMessage.name === "" && (
                              <p className="forwardName">
                                <b>{roomId.destination}</b>
                              </p>
                            )}
                            <img
                              className="cameraImg"
                              src={camera}
                              alt=""
                              width="14px"
                            />
                            <span className="forwardtext">Foto</span>
                          </div>
                          <div>
                            <img
                              className="forwardImg"
                              src={forwardMessage.chat}
                              alt=""
                            />
                          </div>
                        </div>
                      )}
                      {(forwardMessage.type === "video" ||
                        forwardMessage.type === "forwardText-replyVideo" ||
                        forwardMessage.type === "forwardEmoji-replyVideo" ||
                        forwardMessage.type === "forwardImage-replyVideo" ||
                        forwardMessage.type === "forwardVideo-replyVideo") && (
                        <div className="contentForward d-flex justify-content-between align-items-center">
                          <div>
                            {forwardMessage.name !== "" && (
                              <p className="forwardName">
                                <b>{forwardMessage.name}</b>
                              </p>
                            )}
                            {forwardMessage.name === "" && (
                              <p className="forwardName">
                                <b>{roomId.destination}</b>
                              </p>
                            )}
                            <img
                              className="cameraImg"
                              src={iconVideo}
                              alt=""
                              width="14px"
                            />
                            <span className="forwardtext">Video</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <video
                              className="forwardImg"
                              src={forwardMessage.chat}
                              alt=""
                            />
                          </div>
                        </div>
                      )}
                      {openEmoji === false && (
                        <img
                          onClick={() => closeForwardChat1()}
                          className="closeForward"
                          src={close2}
                          width="18px"
                          alt=""
                        />
                      )}
                      {openEmoji === true && (
                        <img
                          onClick={() => closeForwardChat2()}
                          className="closeForward"
                          src={close2}
                          width="18px"
                          alt=""
                        />
                      )}
                    </div>
                  )}
                  {openEmoji === true && (
                    <div className="emojies shadow-sm d-flex justify-content-center align-items-center">
                      {forwardChat === false && (
                        <div className="emojiBox row d-flex justify-content-center">
                          {Emoji.map((e) => {
                            return (
                              <p
                                onClick={() =>
                                  Send({
                                    chat: e.emoji,
                                    userId: roomId.userId,
                                    destinationId: roomId.destinationUserId,
                                    myRoomId: roomId.myRoomId,
                                    type: "emoji",
                                    destinationRoomId: roomId.destinationRoomId,
                                    time: moment().format("HH:mm"),
                                    timeStamp:
                                      moment().format("YYYYMMDDhhmmss"),
                                    forwardChat: "",
                                    forwardName: "",
                                    forwardSenderId: "",
                                    forwardChatId: "",
                                  })
                                }
                                className="col"
                              >
                                {e.emoji}
                              </p>
                            );
                          })}
                        </div>
                      )}
                      {forwardChat === true &&
                        (forwardMessage.type === "image" ||
                          forwardMessage.type === "forwardEmoji-replyImage" ||
                          forwardMessage.type === "forwardText-replyImage" ||
                          forwardMessage.type === "forwardImage-replyImage" ||
                          forwardMessage.type ===
                            "forwardVideo-replyImage") && (
                          <div className="emojiBox row d-flex justify-content-center">
                            {Emoji.map((e) => {
                              return (
                                <p
                                  onClick={() =>
                                    Send({
                                      chat: e.emoji,
                                      userId: roomId.userId,
                                      destinationId: roomId.destinationUserId,
                                      myRoomId: roomId.myRoomId,
                                      type: "forwardImage-replyEmoji",
                                      destinationRoomId:
                                        roomId.destinationRoomId,
                                      time: moment().format("HH:mm"),
                                      timeStamp:
                                        moment().format("YYYYMMDDhhmmss"),
                                      forwardChat: forwardMessage.chat,
                                      forwardName: forwardMessage.name,
                                      forwardSenderId:
                                        forwardMessage.forwardSenderId,
                                      forwardChatId:
                                        forwardMessage.forwardChatId,
                                    })
                                  }
                                  className="col"
                                >
                                  {e.emoji}
                                </p>
                              );
                            })}
                          </div>
                        )}
                      {forwardChat === true &&
                        (forwardMessage.type === "text" ||
                          forwardMessage.type === "forwardText-replyText" ||
                          forwardMessage.type === "forwardEmoji-replyText" ||
                          forwardMessage.type === "forwardImage-replyText" ||
                          forwardMessage.type === "forwardVideo-replyText") && (
                          <div className="emojiBox row d-flex justify-content-center">
                            {Emoji.map((e) => {
                              console.log(forwardMessage.type);
                              return (
                                <p
                                  onClick={() =>
                                    Send({
                                      chat: e.emoji,
                                      userId: roomId.userId,
                                      destinationId: roomId.destinationUserId,
                                      myRoomId: roomId.myRoomId,
                                      type: "forwardText-replyEmoji",
                                      destinationRoomId:
                                        roomId.destinationRoomId,
                                      time: moment().format("HH:mm"),
                                      timeStamp:
                                        moment().format("YYYYMMDDhhmmss"),
                                      forwardChat: forwardMessage.chat,
                                      forwardName: forwardMessage.name,
                                      forwardSenderId:
                                        forwardMessage.forwardSenderId,
                                      forwardChatId:
                                        forwardMessage.forwardChatId,
                                    })
                                  }
                                  className="col"
                                >
                                  {e.emoji}
                                </p>
                              );
                            })}
                          </div>
                        )}
                      {forwardChat === true &&
                        (forwardMessage.type === "emoji" ||
                          forwardMessage.type === "forwardEmoji-replyEmoji" ||
                          forwardMessage.type === "forwardText-replyEmoji" ||
                          forwardMessage.type === "forwardImage-replyEmoji" ||
                          forwardMessage.type ===
                            "forwardVideo-replyEmoji") && (
                          <div className="emojiBox row d-flex justify-content-center">
                            {Emoji.map((e) => {
                              return (
                                <p
                                  onClick={() =>
                                    Send({
                                      chat: e.emoji,
                                      userId: roomId.userId,
                                      destinationId: roomId.destinationUserId,
                                      myRoomId: roomId.myRoomId,
                                      type: "forwardEmoji-replyEmoji",
                                      destinationRoomId:
                                        roomId.destinationRoomId,
                                      time: moment().format("HH:mm"),
                                      timeStamp:
                                        moment().format("YYYYMMDDhhmmss"),
                                      forwardChat: forwardMessage.chat,
                                      forwardName: forwardMessage.name,
                                      forwardSenderId:
                                        forwardMessage.forwardSenderId,
                                      forwardChatId:
                                        forwardMessage.forwardChatId,
                                    })
                                  }
                                  className="col"
                                >
                                  {e.emoji}
                                </p>
                              );
                            })}
                          </div>
                        )}
                      {forwardChat === true &&
                        (forwardMessage.type === "video" ||
                          forwardMessage.type === "forwardEmoji-replyVideo" ||
                          forwardMessage.type === "forwardText-replyVideo" ||
                          forwardMessage.type === "forwardImage-replyVideo" ||
                          forwardMessage.type ===
                            "forwardVideo-replyVideo") && (
                          <div className="emojiBox row d-flex justify-content-center">
                            {Emoji.map((e) => {
                              return (
                                <p
                                  onClick={() =>
                                    Send({
                                      chat: e.emoji,
                                      userId: roomId.userId,
                                      destinationId: roomId.destinationUserId,
                                      myRoomId: roomId.myRoomId,
                                      type: "forwardVideo-replyEmoji",
                                      destinationRoomId:
                                        roomId.destinationRoomId,
                                      time: moment().format("HH:mm"),
                                      timeStamp:
                                        moment().format("YYYYMMDDhhmmss"),
                                      forwardChat: forwardMessage.chat,
                                      forwardName: forwardMessage.name,
                                      forwardSenderId:
                                        forwardMessage.forwardSenderId,
                                      forwardChatId:
                                        forwardMessage.forwardChatId,
                                    })
                                  }
                                  className="col"
                                >
                                  {e.emoji}
                                </p>
                              );
                            })}
                          </div>
                        )}
                    </div>
                  )}
                  <div className="inputChat d-flex align-items-center shadow-sm">
                    {openEmoji === false && forwardChat === false && (
                      <img
                        onClick={() => OpenEmoji1()}
                        className="emoji"
                        src={emoji}
                        width="30px"
                        height="30px"
                        alt="emotIcon"
                      />
                    )}
                    {openEmoji === false && forwardChat === true && (
                      <img
                        onClick={() => OpenEmoji2()}
                        className="emoji"
                        src={emoji}
                        width="30px"
                        height="30px"
                        alt="emotIcon"
                      />
                    )}
                    {openEmoji === true && forwardChat === false && (
                      <img
                        onClick={() => CloseEmoji1()}
                        className="closeEmoji emoji"
                        src={close2}
                        width="30px"
                        height="30px"
                        alt="emotIcon"
                      />
                    )}
                    {openEmoji === true && forwardChat === true && (
                      <img
                        onClick={() => CloseEmoji2()}
                        className="closeEmoji emoji"
                        src={close2}
                        width="30px"
                        height="30px"
                        alt="emotIcon"
                      />
                    )}
                    <label for="addimgChat">
                      <img
                        className="addImgChat"
                        src={addPhoto}
                        width="30px"
                        height="30px"
                        alt="emotIcon"
                      />
                    </label>
                    {forwardChat === false && (
                      <input
                        className="display-none"
                        type="file"
                        id="addimgChat"
                        accept="image/x-png,image/gif,image/jpeg"
                        onChange={(val) =>
                          sendImage({
                            file: val.target.files[0],
                            userId: roomId.userId,
                            destinationId: roomId.destinationUserId,
                            myRoomId: roomId.myRoomId,
                            type: "image",
                            destinationRoomId: roomId.destinationRoomId,
                            time: moment().format("HH:mm"),
                            timeStamp: moment().format("YYYYMMDDhhmmss"),
                            forwardChat: "",
                            forwardName: "",
                            forwardSenderId: "",
                            forwardChatId: "",
                          })
                        }
                      />
                    )}
                    {forwardChat === true &&
                      (forwardMessage.type === "text" ||
                        forwardMessage.type === "forwardText-replyText" ||
                        forwardMessage.type === "forwardEmoji-replyText" ||
                        forwardMessage.type === "forwardImage-replyText" ||
                        forwardMessage.type === "forwardVideo-replyText") && (
                        <input
                          className="display-none"
                          type="file"
                          id="addimgChat"
                          accept="image/x-png,image/gif,image/jpeg"
                          onChange={(val) =>
                            sendImage({
                              file: val.target.files[0],
                              userId: roomId.userId,
                              destinationId: roomId.destinationUserId,
                              myRoomId: roomId.myRoomId,
                              type: "forwardText-replyImage",
                              destinationRoomId: roomId.destinationRoomId,
                              time: moment().format("HH:mm"),
                              timeStamp: moment().format("YYYYMMDDhhmmss"),
                              forwardChat: forwardMessage.chat,
                              forwardName: forwardMessage.name,
                              forwardSenderId: forwardMessage.forwardSenderId,
                              forwardChatId: forwardMessage.forwardChatId,
                            })
                          }
                        />
                      )}
                    {forwardChat === true &&
                      (forwardMessage.type === "emoji" ||
                        forwardMessage.type === "forwardText-replyEmoji" ||
                        forwardMessage.type === "forwardEmoji-replyEmoji" ||
                        forwardMessage.type === "forwardImage-replyEmoji" ||
                        forwardMessage.type === "forwardVideo-replyEmoji") && (
                        <input
                          className="display-none"
                          type="file"
                          id="addimgChat"
                          accept="image/x-png,image/gif,image/jpeg"
                          onChange={(val) =>
                            sendImage({
                              file: val.target.files[0],
                              userId: roomId.userId,
                              destinationId: roomId.destinationUserId,
                              myRoomId: roomId.myRoomId,
                              type: "forwardEmoji-replyImage",
                              destinationRoomId: roomId.destinationRoomId,
                              time: moment().format("HH:mm"),
                              timeStamp: moment().format("YYYYMMDDhhmmss"),
                              forwardChat: forwardMessage.chat,
                              forwardName: forwardMessage.name,
                              forwardSenderId: forwardMessage.forwardSenderId,
                              forwardChatId: forwardMessage.forwardChatId,
                            })
                          }
                        />
                      )}
                    {forwardChat === true &&
                      (forwardMessage.type === "image" ||
                        forwardMessage.type === "forwardText-replyImage" ||
                        forwardMessage.type === "forwardEmoji-replyImage" ||
                        forwardMessage.type === "forwardImage-replyImage" ||
                        forwardMessage.type === "forwardVideo-replyImage") && (
                        <input
                          className="display-none"
                          type="file"
                          id="addimgChat"
                          accept="image/x-png,image/gif,image/jpeg"
                          onChange={(val) =>
                            sendImage({
                              file: val.target.files[0],
                              userId: roomId.userId,
                              destinationId: roomId.destinationUserId,
                              myRoomId: roomId.myRoomId,
                              type: "forwardImage-replyImage",
                              destinationRoomId: roomId.destinationRoomId,
                              time: moment().format("HH:mm"),
                              timeStamp: moment().format("YYYYMMDDhhmmss"),
                              forwardChat: forwardMessage.chat,
                              forwardName: forwardMessage.name,
                              forwardSenderId: forwardMessage.forwardSenderId,
                              forwardChatId: forwardMessage.forwardChatId,
                            })
                          }
                        />
                      )}
                    {forwardChat === true &&
                      (forwardMessage.type === "video" ||
                        forwardMessage.type === "forwardText-replyVideo" ||
                        forwardMessage.type === "forwardEmoji-replyVideo" ||
                        forwardMessage.type === "forwardImage-replyVideo" ||
                        forwardMessage.type === "forwardVideo-replyVideo") && (
                        <input
                          className="display-none"
                          type="file"
                          id="addimgChat"
                          accept="image/x-png,image/gif,image/jpeg"
                          onChange={(val) =>
                            sendImage({
                              file: val.target.files[0],
                              userId: roomId.userId,
                              destinationId: roomId.destinationUserId,
                              myRoomId: roomId.myRoomId,
                              type: "forwardVideo-replyImage",
                              destinationRoomId: roomId.destinationRoomId,
                              time: moment().format("HH:mm"),
                              timeStamp: moment().format("YYYYMMDDhhmmss"),
                              forwardChat: forwardMessage.chat,
                              forwardName: forwardMessage.name,
                              forwardSenderId: forwardMessage.forwardSenderId,
                              forwardChatId: forwardMessage.forwardChatId,
                            })
                          }
                        />
                      )}
                    <label for="addVideo">
                      <img
                        className="addImgChat"
                        src={addVideo}
                        width="30px"
                        height="30px"
                        alt="emotIcon"
                      />
                    </label>
                    {forwardChat === false && (
                      <input
                        className="display-none"
                        type="file"
                        id="addVideo"
                        accept="video/mp4,video/webm,video/ogg"
                        onChange={(val) =>
                          sendVideo({
                            file: val.target.files[0],
                            userId: roomId.userId,
                            destinationId: roomId.destinationUserId,
                            myRoomId: roomId.myRoomId,
                            type: "video",
                            destinationRoomId: roomId.destinationRoomId,
                            time: moment().format("HH:mm"),
                            timeStamp: moment().format("YYYYMMDDhhmmss"),
                            forwardChat: "",
                            forwardName: "",
                            forwardSenderId: "",
                            forwardChatId: "",
                          })
                        }
                      />
                    )}
                    {forwardChat === true &&
                      (forwardMessage.type === "text" ||
                        forwardMessage.type === "forwardText-replyText" ||
                        forwardMessage.type === "forwardEmoji-replyText" ||
                        forwardMessage.type === "forwardImage-replyText" ||
                        forwardMessage.type === "forwardVideo-replyText") && (
                        <input
                          className="display-none"
                          type="file"
                          id="addVideo"
                          accept="video/mp4,video/webm,video/ogg"
                          onChange={(val) =>
                            sendVideo({
                              file: val.target.files[0],
                              userId: roomId.userId,
                              destinationId: roomId.destinationUserId,
                              myRoomId: roomId.myRoomId,
                              type: "forwardText-replyVideo",
                              destinationRoomId: roomId.destinationRoomId,
                              time: moment().format("HH:mm"),
                              timeStamp: moment().format("YYYYMMDDhhmmss"),
                              forwardChat: forwardMessage.chat,
                              forwardName: forwardMessage.name,
                              forwardSenderId: forwardMessage.forwardSenderId,
                              forwardChatId: forwardMessage.forwardChatId,
                            })
                          }
                        />
                      )}
                    {forwardChat === true &&
                      (forwardMessage.type === "emoji" ||
                        forwardMessage.type === "forwardText-replyEmoji" ||
                        forwardMessage.type === "forwardEmoji-replyEmoji" ||
                        forwardMessage.type === "forwardImage-replyEmoji" ||
                        forwardMessage.type === "forwardVideo-replyEmoji") && (
                        <input
                          className="display-none"
                          type="file"
                          id="addVideo"
                          accept="video/mp4,video/webm,video/ogg"
                          onChange={(val) =>
                            sendVideo({
                              file: val.target.files[0],
                              userId: roomId.userId,
                              destinationId: roomId.destinationUserId,
                              myRoomId: roomId.myRoomId,
                              type: "forwardEmoji-replyVideo",
                              destinationRoomId: roomId.destinationRoomId,
                              time: moment().format("HH:mm"),
                              timeStamp: moment().format("YYYYMMDDhhmmss"),
                              forwardChat: forwardMessage.chat,
                              forwardName: forwardMessage.name,
                              forwardSenderId: forwardMessage.forwardSenderId,
                              forwardChatId: forwardMessage.forwardChatId,
                            })
                          }
                        />
                      )}
                    {forwardChat === true &&
                      (forwardMessage.type === "image" ||
                        forwardMessage.type === "forwardText-replyImage" ||
                        forwardMessage.type === "forwardEmoji-replyImage" ||
                        forwardMessage.type === "forwardImage-replyImage" ||
                        forwardMessage.type === "forwardVideo-replyImage") && (
                        <input
                          className="display-none"
                          type="file"
                          id="addVideo"
                          accept="video/mp4,video/webm,video/ogg"
                          onChange={(val) =>
                            sendVideo({
                              file: val.target.files[0],
                              userId: roomId.userId,
                              destinationId: roomId.destinationUserId,
                              myRoomId: roomId.myRoomId,
                              type: "forwardImage-replyVideo",
                              destinationRoomId: roomId.destinationRoomId,
                              time: moment().format("HH:mm"),
                              timeStamp: moment().format("YYYYMMDDhhmmss"),
                              forwardChat: forwardMessage.chat,
                              forwardName: forwardMessage.name,
                              forwardSenderId: forwardMessage.forwardSenderId,
                              forwardChatId: forwardMessage.forwardChatId,
                            })
                          }
                        />
                      )}
                    {forwardChat === true &&
                      (forwardMessage.type === "video" ||
                        forwardMessage.type === "forwardText-replyVideo" ||
                        forwardMessage.type === "forwardEmoji-replyVideo" ||
                        forwardMessage.type === "forwardImage-replyVideo" ||
                        forwardMessage.type === "forwardVideo-replyVideo") && (
                        <input
                          className="display-none"
                          type="file"
                          id="addVideo"
                          accept="video/mp4,video/webm,video/ogg"
                          onChange={(val) =>
                            sendVideo({
                              file: val.target.files[0],
                              userId: roomId.userId,
                              destinationId: roomId.destinationUserId,
                              myRoomId: roomId.myRoomId,
                              type: "forwardVideo-replyVideo",
                              destinationRoomId: roomId.destinationRoomId,
                              time: moment().format("HH:mm"),
                              timeStamp: moment().format("YYYYMMDDhhmmss"),
                              forwardChat: forwardMessage.chat,
                              forwardName: forwardMessage.name,
                              forwardSenderId: forwardMessage.forwardSenderId,
                              forwardChatId: forwardMessage.forwardChatId,
                            })
                          }
                        />
                      )}
                    <textarea
                      value={
                        chatContent.charAt(0).toUpperCase() +
                        chatContent.slice(1)
                      }
                      onChange={(e) => setChatContent(e.target.value)}
                      placeholder="Ketik pesan"
                      autoFocus="autoFocus"
                    />
                    {chatContent !== "" && forwardChat === false && (
                      <img
                        onClick={() =>
                          Send({
                            chat: chatContent,
                            userId: roomId.userId,
                            destinationId: roomId.destinationUserId,
                            myRoomId: roomId.myRoomId,
                            type: "text",
                            destinationRoomId: roomId.destinationRoomId,
                            time: moment().format("HH:mm"),
                            timeStamp: moment().format("YYYYMMDDhhmmss"),
                            forwardChat: "",
                            forwardName: "",
                            forwardSenderId: "",
                            forwardChatId: "",
                          })
                        }
                        className="sendIcon"
                        src={send}
                        width="25px"
                        height="25px"
                        alt="emotIcon"
                      />
                    )}
                    {chatContent !== "" &&
                      forwardChat === true &&
                      (forwardMessage.type === "text" ||
                        forwardMessage.type === "forwardText-replyText" ||
                        forwardMessage.type === "forwardEmoji-replyText" ||
                        forwardMessage.type === "forwardImage-replyText" ||
                        forwardMessage.type === "forwardVideo-replyText") && (
                        <img
                          onClick={() =>
                            Send({
                              chat: chatContent,
                              userId: roomId.userId,
                              destinationId: roomId.destinationUserId,
                              myRoomId: roomId.myRoomId,
                              type: "forwardText-replyText",
                              destinationRoomId: roomId.destinationRoomId,
                              time: moment().format("HH:mm"),
                              timeStamp: moment().format("YYYYMMDDhhmmss"),
                              forwardChat: forwardMessage.chat,
                              forwardName: forwardMessage.name,
                              forwardSenderId: forwardMessage.forwardSenderId,
                              forwardChatId: forwardMessage.forwardChatId,
                            })
                          }
                          className="sendIcon"
                          src={send}
                          width="25px"
                          height="25px"
                          alt="emotIcon"
                        />
                      )}
                    {chatContent !== "" &&
                      forwardChat === true &&
                      (forwardMessage.type === "emoji" ||
                        forwardMessage.type === "forwardText-replyEmoji" ||
                        forwardMessage.type === "forwardEmoji-replyEmoji" ||
                        forwardMessage.type === "forwardImage-replyEmoji" ||
                        forwardMessage.type === "forwardVideo-replyEmoji") && (
                        <img
                          onClick={() =>
                            Send({
                              chat: chatContent,
                              userId: roomId.userId,
                              destinationId: roomId.destinationUserId,
                              myRoomId: roomId.myRoomId,
                              type: "forwardEmoji-replyText",
                              destinationRoomId: roomId.destinationRoomId,
                              time: moment().format("HH:mm"),
                              timeStamp: moment().format("YYYYMMDDhhmmss"),
                              forwardChat: forwardMessage.chat,
                              forwardName: forwardMessage.name,
                              forwardSenderId: forwardMessage.forwardSenderId,
                              forwardChatId: forwardMessage.forwardChatId,
                            })
                          }
                          className="sendIcon"
                          src={send}
                          width="25px"
                          height="25px"
                          alt="emotIcon"
                        />
                      )}
                    {chatContent !== "" &&
                      forwardChat === true &&
                      (forwardMessage.type === "image" ||
                        forwardMessage.type === "forwardText-replyImage" ||
                        forwardMessage.type === "forwardEmoji-replyImage" ||
                        forwardMessage.type === "forwardImage-replyImage" ||
                        forwardMessage.type === "forwardVideo-replyImage") && (
                        <img
                          onClick={() =>
                            Send({
                              chat: chatContent,
                              userId: roomId.userId,
                              destinationId: roomId.destinationUserId,
                              myRoomId: roomId.myRoomId,
                              type: "forwardImage-replyText",
                              destinationRoomId: roomId.destinationRoomId,
                              time: moment().format("HH:mm"),
                              timeStamp: moment().format("YYYYMMDDhhmmss"),
                              forwardChat: forwardMessage.chat,
                              forwardName: forwardMessage.name,
                              forwardSenderId: forwardMessage.forwardSenderId,
                              forwardChatId: forwardMessage.forwardChatId,
                            })
                          }
                          className="sendIcon"
                          src={send}
                          width="25px"
                          height="25px"
                          alt="emotIcon"
                        />
                      )}
                    {chatContent !== "" &&
                      forwardChat === true &&
                      (forwardMessage.type === "video" ||
                        forwardMessage.type === "forwardText-replyVideo" ||
                        forwardMessage.type === "forwardEmoji-replyVideo" ||
                        forwardMessage.type === "forwardImage-replyVideo" ||
                        forwardMessage.type === "forwardVideo-replyVideo") && (
                        <img
                          onClick={() =>
                            Send({
                              chat: chatContent,
                              userId: roomId.userId,
                              destinationId: roomId.destinationUserId,
                              myRoomId: roomId.myRoomId,
                              type: "forwardVideo-replyText",
                              destinationRoomId: roomId.destinationRoomId,
                              time: moment().format("HH:mm"),
                              timeStamp: moment().format("YYYYMMDDhhmmss"),
                              forwardChat: forwardMessage.chat,
                              forwardName: forwardMessage.name,
                              forwardSenderId: forwardMessage.forwardSenderId,
                              forwardChatId: forwardMessage.forwardChatId,
                            })
                          }
                          className="sendIcon"
                          src={send}
                          width="25px"
                          height="25px"
                          alt="emotIcon"
                        />
                      )}
                    {chatContent === "" && (
                      <img
                        className="sendIcon"
                        src={send}
                        width="25px"
                        height="25px"
                        alt="emotIcon"
                      />
                    )}
                    <div
                      className="to-bottom d-flex justify-content-center align-items-center"
                      onClick={() => scroll("toBottom")}
                    >
                      <img src={srollBottom} width="18px" alt="" />
                    </div>
                  </div>
                </div>
              )}

              {roomId.destination === "" && (
                <div
                  className={
                    contactProfil === false
                      ? `chatView justify-content-center align-items-center ${
                          screenOpen === "chat" ? "" : "none"
                        }`
                      : `chatView2 justify-content-center align-items-center ${
                          screenOpen === "chat" ? "" : "none"
                        }`
                  }
                >
                  <div className="emptyId">
                    <img src={chat} alt="" />
                    <p className="apkName">CHATLITE</p>
                    <p className="dev">by Ferdyfianaziizul</p>
                  </div>
                </div>
              )}
              {contactProfil === "contactProfil" && (
                <div
                  onClick={() => setChatSetting(false)}
                  className="openProfil shadow-sm"
                >
                  <ContactProfil />
                </div>
              )}
              {contactProfil === "myProfil" && (
                <div
                  onClick={() => setChatSetting(false)}
                  className="openProfil shadow-sm"
                >
                  <Profil />
                </div>
              )}
            </div>
          )}
        </div>
      }
      {openDelChat === true && (
        <div className="confirmField d-flex justify-content-center align-items-center ">
          <div className="confirm shadow text-start">
            <p>Hapus pesan ini?</p>
            <div className="btnconfirm text-end">
              <button
                onClick={() => setOpenDelChat(false)}
                className="btnconfirm1"
              >
                Tidak
              </button>
              <button onClick={() => closeDelChat()} className="btnconfirm2">
                Hapus pesan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const stateReducer = (state) => {
  return {
    showListContact: state.showListContact,
    showAddContact: state.showAddContact,
    listRoomChat: state.listRoomChat,
    listUser: state.listUser,
    chats: state.chats,
    roomId: state.roomId,
    account: state.account,
    assetLoading: state.assetLoading,
    roomProfil: state.roomProfil,
    contactProfil: state.contactProfil,
    contentImageLoading: state.contentImageLoading,
    progressImage: state.progressImage,
    chatSetting: state.chatSetting,
    searchInput: state.searchInput,
    screenOpen: state.screenOpen,
  };
};

const dispatchReducer = (dispatch) => ({
  showContact: (data) => dispatch({ type: "SHOW_CONTACT_MENU", value: data }),
  getContact: () => dispatch(getContact()),
  getUser: () => dispatch(getUser()),
  showAddContactMenu: (data) =>
    dispatch({
      type: "SHOW_ADD_CONTACT",
      value: data,
    }),
  hideContactMenu: (data) =>
    dispatch({
      type: "SHOW_ADD_CONTACT",
      value: data,
    }),
  showContactProfil: (data) =>
    dispatch({
      type: "SHOW_CONTACT_PROFIL",
      value: data,
    }),
  setChatSetting: (data) =>
    dispatch({
      type: "CHAT_SETTING",
      value: data,
    }),
  setSearchInput: (data) =>
    dispatch({
      type: "searchContact",
      value: data,
    }),
  setScreenOpen: (data) =>
    dispatch({
      type: "screen",
      value: data,
    }),
  getRoom: () => dispatch(getRoom()),
  sendChat: (data) => dispatch(sendChat(data)),
  getChats: (data) => dispatch(getChats(data)),
  getRoomId: (data) => dispatch(getRoomId(data)),
  getAccount: () => dispatch(getAccount()),
  loadProfilRoom: (data) => dispatch(loadProfilRoom(data)),
  getRoomContact: () => dispatch(getRoomContact()),
  SendImage: (data) => dispatch(SendImage(data)),
  SendVideo: (data) => dispatch(SendVideo(data)),
  deleteChat: (data) => dispatch(deleteChat(data)),
});

export default connect(stateReducer, dispatchReducer)(ChatRoom);
