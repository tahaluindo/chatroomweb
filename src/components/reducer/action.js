import firebase, { database, storage } from "../config/firebaseApi";
import moment from "moment";
import imageCompression from "browser-image-compression";

export const setUpReCaptcha = (data) => {
  return (window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log(response);
        onSignInSubmit(data);
      },
    }
  ));
};

export const onSignInSubmit = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_LOADING_LOGIN", value: true });
  setUpReCaptcha();
  const phoneNumber = data.telp;
  const index = data.users.filter((e) => e.number === phoneNumber);
  const appVerifier = window.recaptchaVerifier;
  firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      const code = window.prompt("input OTP");
      confirmationResult
        .confirm(code)
        .then((result) => {
          // User signed in successfully.

          const user = result.user;
          localStorage.setItem("chatId", user.uid);
          localStorage.setItem("chatLogin", "true");
          localStorage.setItem("phoneNumber", phoneNumber);
          dispatch({ type: "CHANGE_LOADING_LOGIN", value: false });

          if (index.length === 0) {
            addUser(phoneNumber);
          } else {
            console.log("data available");
          }
          database
            .ref(`/${localStorage.getItem("chatId")}/my-account`)
            .on("value", (snapshot) => {
              const account = [];
              console.log(snapshot.val());
              if (snapshot.val() !== null) {
                Object.keys(snapshot.val()).map((e) => {
                  account.push({
                    id: e,
                    name: snapshot.val()[e].name,
                    contact: snapshot.val()[e].contact,
                    status: snapshot.val()[e].status,
                    imageProfil: snapshot.val()[e].imageProfil,
                  });
                  return <div></div>;
                });
              } else {
                addAccount();
                console.log("ok");
              }
            });
        })
        .catch((error) => {
          console.log(error);
          localStorage.setItem("chatLogin", "false");
          localStorage.setItem("chatId", null);
          localStorage.setItem("phoneNumber", null);
          dispatch({ type: "CHANGE_LOADING_LOGIN", value: false });
          dispatch({ type: "DISPLAY_ERROR", value: true });
          dispatch({ type: "CAPTCHA_ERROR", value: error.message });

          // User couldn't sign in (bad verification code?)
          // ...
        });
      // ...
    })
    .catch((error) => {
      console.log(error);
      localStorage.setItem("chatLogin", "false");
      localStorage.setItem("chatId", null);
      dispatch({ type: "CHANGE_LOADING_LOGIN", value: false });
      dispatch({ type: "DISPLAY_ERROR", value: true });
      dispatch({ type: "CAPTCHA_ERROR", value: error.message });
      // Error; SMS not sent
      // ...
    });
};

export const addUser = (data) => {
  return database.ref("/users").push(
    {
      number: data,
      id: localStorage.getItem("chatId"),
    },
    (error) => {
      if (error) {
        console.log(error);
        // The write failed...
      } else {
        console.log("ok");
        // Data saved successfully!
      }
    }
  );
};

export const getUser = () => (dispatch) => {
  dispatch({ type: "ASSET_LOADING", value: true });
  dispatch({ type: "CHANGE_LOADING", value: true });
  return database.ref("/users").on("value", (snapshot) => {
    const todos = [];
    if (snapshot.val() !== null) {
      Object.keys(snapshot.val()).map((e) => {
        todos.push(snapshot.val()[e]);
        return <div></div>;
      });
    }
    dispatch({
      type: "GET_USER",
      value: todos,
    });
    dispatch({ type: "ASSET_LOADING", value: false });
  });
};

export const searchContact = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_SEARCH_CONTACT_LOADING", value: false });
  return database.ref("/users").on("value", (snapshot) => {
    const users = [];
    if (snapshot.val() !== null) {
      Object.keys(snapshot.val()).map((e) => {
        users.push(snapshot.val()[e]);
        return <div></div>;
      });
    }
    const availableNumber = users.filter(
      (e) => String(e.number) === String(data)
    );
    if (availableNumber.length === 0) {
      dispatch({ type: "availableNumber", value: 0 });
    }
    if (availableNumber.length !== 0) {
      dispatch({ type: "availableNumber", value: availableNumber[0].number });
    }

    dispatch({ type: "SEARCH", value: false });
    dispatch({ type: "CHANGE_SEARCH_CONTACT_LOADING", value: false });
  });
};

export const addContact = (data) => (dispatch) => {
  const roomAvailable = data.listRoomChat.filter(
    (e) => e.destination === data.contact
  );
  console.log(data);
  console.log(roomAvailable);
  if (roomAvailable.length === 0) {
    addDestinationRoom(data);
    addmyRoom(data);
    console.log("ok");
  } else {
    console.log("room available");
    console.log(roomAvailable);
    editMyRoom({
      id: roomAvailable[0].id,
      value: data.name,
      userId: roomAvailable[0].userId,
      title: "destinationName",
    });
  }
  dispatch({
    type: "ROOM_ID",
    value: {
      destinationRoomId: "",
      destinationUserId: "",
      myRoomId: "",
      userId: "",
      destinationName: "",
      destination: "",
      account: {
        imageProfil: "",
        name: "",
        status: "",
      },
    },
  });
  // return database.ref(`/${localStorage.getItem("chatId")}/contacts`).push(
  //   {
  //     name: data.name,
  //     contact: data.contact,
  //     id: data.id,
  //   },
  //   (error) => {
  //     if (error) {
  //       console.log(error);
  //       // The write failed...
  //     } else {
  //       if (roomAvailable.length === 0) {
  //         addDestinationRoom(data);
  //         addmyRoom(data);
  //         console.log("ok");
  //       } else {
  //         console.log("room available");
  //         console.log(roomAvailable);
  //         editMyRoom({
  //           id: roomAvailable[0].id,
  //           value: data.name,
  //           userId: roomAvailable[0].userId,
  //           title: "destinationName",
  //         });
  //       }
  //       dispatch({
  //         type: "ROOM_ID",
  //         value: {
  //           destinationRoomId: "",
  //           destinationUserId: "",
  //           myRoomId: "",
  //           userId: "",
  //           destinationName: "",
  //           destination: "",
  //           account: {
  //             imageProfil: "",
  //             name: "",
  //             status: "",
  //           },
  //         },
  //       });
  //       dispatch({
  //         type: "SHOW_ADD_CONTACT",
  //         value: false,
  //       });
  //       dispatch({ type: "SEARCH", value: true });
  //       dispatch({
  //         type: "SHOW_CONTACT_PROFIL",
  //         value: false,
  //       });
  //       // Data saved successfully!
  //     }
  //   }
  // );
};
export const getContact = () => (dispatch) => {
  return database
    .ref(`/${localStorage.getItem("chatId")}/contacts`)
    .on("value", (snapshot) => {
      const contacts = [];
      if (snapshot.val() !== null) {
        Object.keys(snapshot.val()).map((e) => {
          contacts.push({
            id: e,
            userId: snapshot.val()[e].id,
            name: snapshot.val()[e].name,
            contact: snapshot.val()[e].contact,
          });
          return <div></div>;
        });
      }
      dispatch({
        type: "GET_CONTACT",
        value: contacts,
      });
    });
};

export const addmyRoom = (data) => {
  return database.ref(`/${localStorage.getItem("chatId")}/roomChat`).push(
    {
      destinationName: data.name,
      destination: data.contact,
      myPhone: localStorage.getItem("phoneNumber"),
      userId: localStorage.getItem("chatId"),
      destinationId: data.id,
    },
    (error) => {
      if (error) {
        console.log(error);
        // The write failed...
      } else {
        console.log("room added");

        // Data saved successfully!
      }
    }
  );
};

export const editMyRoom = (data) => {
  return database.ref(`/${data.userId}/roomChat/${data.id}/${data.title}`).set(
    data.value,

    (error) => {
      if (error) {
        // dispatch({ type: "CHANGE_LOADING", value: false });
        // The write failed...
        console.log(error);
      } else {
        // dispatch({ type: "CHANGE_LOADING", value: false });
        // Data saved successfully!
        console.log("succes");
      }
    }
  );
};

export const addDestinationRoom = (data) => {
  return database.ref(`/${data.id}/roomChat`).push(
    {
      destinationName: "",
      destination: localStorage.getItem("phoneNumber"),
      myPhone: data.contact,
      userId: data.id,
      destinationId: localStorage.getItem("chatId"),
    },
    (error) => {
      if (error) {
        console.log(error);
        // The write failed...
      } else {
        console.log("destination room added");

        // Data saved successfully!
      }
    }
  );
};

// export const addmyRoom = (data) => (dispatch) => {
//   const lengthRoom = data.listRoomChat.filter(
//     (e) => e.destination === data.destinationPhone
//   ).length;

//   if (lengthRoom !== 0) {
//     const myRoom = data.listRoomChat.filter(e=>e.destination === data.destinationPhone)
//     console.log(myRoom[0].id)
//     console.log("room available");
//   } else {
//     return database.ref(`/${localStorage.getItem("chatId")}/roomChat`).push(
//       {
//         destination: data.destinationPhone,
//         myPhone: data.myPhone,
//       },
//       (error) => {
//         if (error) {
//           console.log(error);
//           // The write failed...
//         } else {
//           console.log("room available");
//           console.log("ok");

//           // Data saved successfully!
//         }
//         const myRoom = data.listRoomChat.filter(e=>e.destination === data.destinationPhone)
//         console.log(myRoom[0].id)
//       }
//     );
//   }
// };

// export const addDestinationRoom = (data) => (dispatch) => {
//   const lengthRoom = data.listRoomChat.filter(
//     (e) => e.destination === data.destinationPhone
//   ).length;
//   console.log(lengthRoom);

//   if (lengthRoom !== 0) {
//     console.log("other room available");
//   } else {
//     return database.ref(`/${data.destinationId}/roomChat`).push(
//       {
//         destination: data.myPhone,
//         myPhone: data.destinationPhone,
//       },
//       (error) => {
//         if (error) {
//           console.log(error);

//           // The write failed...
//         } else {
//           console.log("other room available");
//           console.log("ok");

//           // Data saved successfully!
//         }
//       }
//     );
//   }
// };

export const getRoomContact = () => (dispatch) => {
  return database.ref(`/${localStorage.getItem("chatId")}/roomChat`).on(
    "value",
    (snapshot) => {
      const room = [];
      if (snapshot.val() !== null) {
        Object.keys(snapshot.val()).map((e) => {
          const chat = [];
          if (
            snapshot.val()[e].Chats !== null &&
            snapshot.val()[e].Chats !== undefined
          ) {
            Object.keys(snapshot.val()[e].Chats).map((val) => {
              chat.push({
                id: e,
                senderId: snapshot.val()[e].Chats[val].senderId,
                receiverId: snapshot.val()[e].Chats[val].receiverId,
                time: snapshot.val()[e].Chats[val].time,
                senderRoomId: snapshot.val()[e].Chats[val].senderRoomId,
                receiverRoomId: snapshot.val()[e].Chats[val].receiverRoomId,
                chat: snapshot.val()[e].Chats[val].chat,
                status: snapshot.val()[e].Chats[val].status,
                type: snapshot.val()[e].Chats[val].type,
              });
              return <div></div>;
            });
          }
          room.push({
            id: e,
            destinationId: snapshot.val()[e].destinationId,
            userId: snapshot.val()[e].userId,
            destinationName: snapshot.val()[e].destinationName,
            destination: snapshot.val()[e].destination,
            myPhone: snapshot.val()[e].myPhone,
            accounts: {
              id: "",
              name: "",
              status: "",
              imageProfil: "",
            },
            chat: chat,
          });
          return <div></div>;
        });
      }
      room.map((e) => {
        return database.ref(`${e.destinationId}/my-account`).on(
          "value",
          (snapshot) => {
            const account = [];
            if (snapshot.val() !== null) {
              Object.keys(snapshot.val()).map((e) => {
                account.push({
                  id: e,
                  name: snapshot.val()[e].name,
                  status: snapshot.val()[e].status,
                  imageProfil: snapshot.val()[e].imageProfil,
                });
                return <div></div>;
              });
            }
            e.accounts = account[0];
          },
          (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("ok");
            }
          }
        );
      });
      dispatch({
        type: "GET_ROOM_CONTACT",
        value: room,
      });
    },
    (error) => {
      if (error) {
        console.log(error);
        // The write failed...
      } else {
        console.log("ok");

        // Data saved successfully!
      }
    }
  );
};

export const getRoom = () => (dispatch) => {
  return database.ref(`/${localStorage.getItem("chatId")}/roomChat`).on(
    "value",
    (snapshot) => {
      const room = [];
      if (snapshot.val() !== null) {
        Object.keys(snapshot.val()).map((e) => {
          const chat = [];
          if (
            snapshot.val()[e].Chats !== null &&
            snapshot.val()[e].Chats !== undefined
          ) {
            Object.keys(snapshot.val()[e].Chats).map((val) => {
              chat.push({
                id: e,
                senderId: snapshot.val()[e].Chats[val].senderId,
                receiverId: snapshot.val()[e].Chats[val].receiverId,
                time: snapshot.val()[e].Chats[val].time,
                senderRoomId: snapshot.val()[e].Chats[val].senderRoomId,
                receiverRoomId: snapshot.val()[e].Chats[val].receiverRoomId,
                chat: snapshot.val()[e].Chats[val].chat,
                status: snapshot.val()[e].Chats[val].status,
                type: snapshot.val()[e].Chats[val].type,
              });
              return <div></div>;
            });
          }
          room.push({
            id: e,
            destinationId: snapshot.val()[e].destinationId,
            userId: snapshot.val()[e].userId,
            destinationName: snapshot.val()[e].destinationName,
            destination: snapshot.val()[e].destination,
            myPhone: snapshot.val()[e].myPhone,
            accounts: {
              id: "",
              name: "",
              status: "",
              imageProfil: "",
            },
            chat: chat,
          });
          return <div></div>;
        });
      }
      room.map((e) => {
        return database.ref(`${e.destinationId}/my-account`).on(
          "value",
          (snapshot) => {
            const account = [];
            if (snapshot.val() !== null) {
              Object.keys(snapshot.val()).map((e) => {
                account.push({
                  id: e,
                  name: snapshot.val()[e].name,
                  status: snapshot.val()[e].status,
                  imageProfil: snapshot.val()[e].imageProfil,
                });
                return <div></div>;
              });
            }
            e.accounts = account[0];
          },
          (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("ok");
            }
          }
        );
      });
      dispatch({
        type: "GET_ROOM",
        value: room,
      });
    },
    (error) => {
      if (error) {
        console.log(error);
        // The write failed...
      } else {
        console.log("ok");

        // Data saved successfully!
      }
    }
  );
};

export const getOtherRoom = (data) => {
  return database
    .ref(`/${data.destinationId}/roomChat`)
    .on("value", (snapshot) => {
      const room = [];
      if (snapshot.val() !== null) {
        Object.keys(snapshot.val()).map((e) => {
          room.push({
            id: e,
            destination: snapshot.val()[e].destination,
            destinationId: snapshot.val()[e].userId,
            destinationName: snapshot.val()[e].destinationName,
            userId: snapshot.val()[e].destinationId,
            myPhone: snapshot.val()[e].myPhone,
          });
          return <div></div>;
        });
      }
    });
};

export const getChats = (data) => (dispatch) => {
  console.log("tunggu");
  return database
    .ref(`/${data.userId}/roomChat/${data.myRoomId}/Chats`)
    .on("value", (snapshot) => {
      const chats = [];

      if (snapshot.val() !== null) {
        Object.keys(snapshot.val()).map((e) => {
          chats.push({
            id: e,
            senderId: snapshot.val()[e].senderId,
            receiverId: snapshot.val()[e].receiverId,
            time: snapshot.val()[e].time,
            timeStamp: snapshot.val()[e].timeStamp,
            senderRoomId: snapshot.val()[e].senderRoomId,
            receiverRoomId: snapshot.val()[e].receiverRoomId,
            chat: snapshot.val()[e].chat,
            status: snapshot.val()[e].status,
            type: snapshot.val()[e].type,
            forwardChat: snapshot.val()[e].forwardChat,
            forwardName: snapshot.val()[e].forwardName,
            forwardChatId: snapshot.val()[e].forwardChatId,
            forwardSenderId: snapshot.val()[e].forwardSenderId,
          });
          return <div></div>;
        });
      }
      console.log("selesai");
      dispatch({
        type: "GET_CHATS",
        value: chats,
      });
    });
};

export const addAccount = () => {
  return database.ref(`/${localStorage.getItem("chatId")}/my-account`).push(
    {
      name: localStorage.getItem("phoneNumber"),
      status: "ada",
      contact: localStorage.getItem("phoneNumber"),
      imageProfil: "",
    },
    (error) => {
      if (error) {
        console.log(error);
        // The write failed...
      } else {
        console.log("account added");

        // Data saved successfully!
      }
    }
  );
};

export const getRoomId = (data) => (dispatch) => {
  return database
    .ref(`/${data.destinationId}/roomChat`)
    .on("value", (snapshot) => {
      const room = [];
      if (snapshot.val() !== null) {
        Object.keys(snapshot.val()).map((e) => {
          room.push({
            roomId: e,
            destinationId: snapshot.val()[e].destinationId,
            userId: snapshot.val()[e].userId,
          });
          return <div></div>;
        });
      }
      const roomFilter = room.filter(
        (val) => val.destinationId === data.userId
      );
      const id = {
        account: data.account,
        myRoomId: data.roomId,
        userId: data.userId,
        destinationName: data.destinationName,
        destination: data.destination,
        destinationRoomId: roomFilter[0].roomId,
        destinationUserId: roomFilter[0].userId,
      };
      dispatch({
        type: "ROOM_ID",
        value: id,
      });
      dispatch({
        type: "SHOW_CONTACT_PROFIL",
        value: false,
      });
      dispatch({
        type: "OPEN_CHAT",
        value: true,
      });
      getRoom();
    });
};

export const getAccount = () => (dispatch) => {
  return database
    .ref(`/${localStorage.getItem("chatId")}/my-account`)
    .on("value", (snapshot) => {
      const account = [];
      if (snapshot.val() !== null) {
        Object.keys(snapshot.val()).map((e) => {
          account.push({
            id: e,
            name: snapshot.val()[e].name,
            contact: snapshot.val()[e].contact,
            status: snapshot.val()[e].status,
            imageProfil: snapshot.val()[e].imageProfil,
          });
          return <div></div>;
        });
      } else {
        localStorage.setItem("chatLogin", "false");
      }

      // if (account.length === 0) {
      //   addAccount();
      // } else {
      //   console.log("account available");
      // }
      dispatch({
        type: "GET_ACCOUNT",
        value: account,
      });
      if (account.length !== 0) {
        dispatch({ type: "GET_STATUS", value: account[0].status });
        dispatch({ type: "GET_PROFIL_NAME", value: account[0].name });
        dispatch({ type: "GET_PROFIL_IMG", value: account[0].imageProfil });
      }
      dispatch({ type: "ASSET_LOADING", value: false });
    });
};

export const sendChat = (data) => (dispatch) => {
  addMyChats(data);
  return database
    .ref(`/${data.destinationId}/roomChat/${data.destinationRoomId}/Chats`)
    .push(
      {
        chat: data.chat,
        senderId: data.userId,
        receiverId: data.destinationId,
        senderRoomId: data.myRoomId,
        receiverRoomId: data.destinationRoomId,
        time: data.time,
        timeStamp: data.timeStamp,
        status: "send",
        type: data.type,
        forwardChat: data.forwardChat,
        forwardName: data.forwardName,
        forwardSenderId: data.forwardSenderId,
        forwardChatId: data.forwardChatId,
      },
      (error) => {
        if (error) {
          console.log(error);
          // The write failed...
        } else {
          // Data saved successfully!
        }
      }
    );
};

export const addMyChats = (data) => {
  return database
    .ref(`/${localStorage.getItem("chatId")}/roomChat/${data.myRoomId}/Chats`)
    .push(
      {
        chat: data.chat,
        senderId: data.userId,
        receiverId: data.destinationId,
        senderRoomId: data.myRoomId,
        receiverRoomId: data.destinationRoomId,
        time: data.time,
        timeStamp: data.timeStamp,
        status: "send",
        type: data.type,
        forwardChat: data.forwardChat,
        forwardName: data.forwardName,
        forwardSenderId: data.forwardSenderId,
        forwardChatId: data.forwardChatId,
      },
      (error) => {
        if (error) {
          console.log(error);
          // The write failed...
        } else {
          console.log("ok");
          getRoomId(data.roomId);

          // Data saved successfully!
        }
      }
    );
};

export const addDestinationChats = (data) => {
  return database
    .ref(`/${data.destinationId}/roomChat/${data.destinationRoomId}/Chats`)
    .push(
      {
        chat: data.chat,
        senderId: data.userId,
        receiverId: data.destinationId,
        senderRoomId: data.myRoomId,
        receiverRoomId: data.destinationRoomId,
        time: data.time,
        timeStamp: data.timeStamp,
        status: "send",
        type: data.type,
        forwardChat: data.forwardChat,
        forwardName: data.forwardName,
        forwardSenderId: data.forwardSenderId,
        forwardChatId: data.forwardChatId,
      },
      (error) => {
        if (error) {
          console.log(error);
          // The write failed...
        } else {
          console.log("ok");

          // Data saved successfully!
        }
      }
    );
};

export const updateProfil = (data) => (dispatch) => {
  return database
    .ref(
      `/${localStorage.getItem("chatId")}/my-account/${data.id}/${data.title}`
    )
    .set(
      data.value,

      (error) => {
        if (error) {
          // dispatch({ type: "CHANGE_LOADING", value: false });
          // The write failed...
          console.log(error);
        } else {
          // dispatch({ type: "CHANGE_LOADING", value: false });
          // Data saved successfully!
          console.log("succes");
        }
      }
    );
};

export const updateContactProfil = (data) => (dispatch) => {
  console.log(data);
  return database
    .ref(
      `/${localStorage.getItem("chatId")}/roomChat/${data.myRoomId}/${
        data.title
      }`
    )
    .set(
      data.value,

      (error) => {
        if (error) {
          // dispatch({ type: "CHANGE_LOADING", value: false });
          // The write failed...

          console.log(error);
        } else {
          // dispatch({ type: "CHANGE_LOADING", value: false });
          // Data saved successfully!
          const newroomId = {
            account: data.roomId.account,
            myRoomId: data.roomId.myRoomId,
            userId: data.roomId.userId,
            destinationName: data.value,
            destination: data.roomId.destination,
            destinationRoomId: data.roomId.destinationRoomId,
            destinationUserId: data.roomId.destinationUserId,
          };
          dispatch({
            type: "ROOM_ID",
            value: newroomId,
          });
          console.log("succesUpdate");
        }
      }
    );
};

export const deletePhoto = (data) => (dispatch) => {
  dispatch({ type: "PROFIL_LOADING", value: true });
  return database
    .ref(
      `/${localStorage.getItem("chatId")}/my-account/${data.id}/${data.title}`
    )
    .set(
      data.value,

      (error) => {
        if (error) {
          // dispatch({ type: "CHANGE_LOADING", value: false });
          // The write failed...
          console.log(error);
        } else {
          // dispatch({ type: "CHANGE_LOADING", value: false });
          // Data saved successfully!
          console.log("succes");
          dispatch({ type: "PROFIL_LOADING", value: false });
        }
      }
    );
};

export const SendVideo = (data) => (dispatch) => {
  if (data.file === null || data.file === undefined) {
    console.log("image not send");
  } else {
    const storageRef = storage.ref();
    const uploadTask = storageRef
      .child(
        `${localStorage.getItem("chatId")}/chatVideos/${
          "video" + moment().format("YYYYMMDDHHmmss")
        }`
      )
      .put(data.file);
    uploadTask.on(
      "stateChanged",
      (snapshot) => {
        dispatch({ type: "contentImageLoading", value: true });
        const progress = parseInt(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log("Upload is " + progress + "% done");
        dispatch({ type: "progressImage", value: progress });
      },
      function (error) {
        // Handle unsuccessful uploads
        console.log(error);
      },
      function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        dispatch({ type: "progressImage", value: 100 });
        dispatch({ type: "contentImageLoading", value: true });
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          addMyChats({
            chat: downloadURL,
            userId: data.userId,
            destinationId: data.destinationId,
            myRoomId: data.myRoomId,
            destinationRoomId: data.destinationRoomId,
            time: data.time,
            timeStamp: data.timeStamp,
            status: "send",
            type: data.type,
            forwardChat: data.forwardChat,
            forwardName: data.forwardName,
            forwardSenderId: data.forwardSenderId,
            forwardChatId: data.forwardChatId,
          });
          addDestinationChats({
            chat: downloadURL,
            userId: data.userId,
            destinationId: data.destinationId,
            myRoomId: data.myRoomId,
            destinationRoomId: data.destinationRoomId,
            time: data.time,
            timeStamp: data.timeStamp,
            status: "send",
            type: data.type,
            forwardChat: data.forwardChat,
            forwardName: data.forwardName,
            forwardSenderId: data.forwardSenderId,
            forwardChatId: data.forwardChatId,
          });
        });
        dispatch({ type: "contentImageLoading", value: false });
      }
    );
  }
};

export const SendImage = (data) => (dispatch) => {
  if (data.file === null || data.file === undefined) {
    console.log("image not send");
  } else {
    console.log("originalFile instanceof Blob", data.file.type); // true
    console.log(`originalFile size ${data.file.size / 1024 / 1024} MB`);
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    imageCompression(data.file, options)
      .then((compressedFile) => {
        console.log("compressedFile instanceof Blob"); // true
        console.log(
          `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
        );
        const storageRef = storage.ref();
        const uploadTask = storageRef
          .child(
            `${localStorage.getItem("chatId")}/chatImages/${
              "image" + moment().format("YYYYMMDDHHmmss")
            }`
          )
          .put(compressedFile);
        uploadTask.on(
          "stateChanged",
          (snapshot) => {
            dispatch({ type: "contentImageLoading", value: true });
            const progress = parseInt(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            console.log("Upload is " + progress + "% done");
            dispatch({ type: "progressImage", value: progress });
          },
          function (error) {
            // Handle unsuccessful uploads
            console.log(error);
          },
          function () {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            dispatch({ type: "progressImage", value: 100 });
            dispatch({ type: "contentImageLoading", value: true });
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function (downloadURL) {
                addMyChats({
                  chat: downloadURL,
                  userId: data.userId,
                  destinationId: data.destinationId,
                  myRoomId: data.myRoomId,
                  destinationRoomId: data.destinationRoomId,
                  time: data.time,
                  timeStamp: data.timeStamp,
                  status: "send",
                  type: data.type,
                  forwardChat: data.forwardChat,
                  forwardName: data.forwardName,
                  forwardSenderId: data.forwardSenderId,
                  forwardChatId: data.forwardChatId,
                });
                addDestinationChats({
                  chat: downloadURL,
                  userId: data.userId,
                  destinationId: data.destinationId,
                  myRoomId: data.myRoomId,
                  destinationRoomId: data.destinationRoomId,
                  time: data.time,
                  timeStamp: data.timeStamp,
                  status: "send",
                  type: data.type,
                  forwardChat: data.forwardChat,
                  forwardName: data.forwardName,
                  forwardSenderId: data.forwardSenderId,
                  forwardChatId: data.forwardChatId,
                });
              });
            dispatch({ type: "contentImageLoading", value: false });
          }
        );
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
};

export const changeImage = (data) => (dispatch) => {
  if (data.file === null || data.file === undefined) {
    console.log("image not send");
  } else {
    console.log("originalFile instanceof Blob", data.file.type); // true
    console.log(`originalFile size ${data.file.size / 1024 / 1024} MB`);
    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 375,
      useWebWorker: true,
    };
    imageCompression(data.file, options)
      .then((compressedFile) => {
        console.log("compressedFile instanceof Blob"); // true
        console.log(
          `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
        );
        console.log(data);
        dispatch({ type: "PROFIL_LOADING", value: true });
        const storageRef = storage.ref();
        const uploadTask = storageRef
          .child(`${localStorage.getItem("chatId")}/profilImg`)
          .put(compressedFile);
        uploadTask.on(
          "stateChanged",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          function (error) {
            // Handle unsuccessful uploads
            console.log(error);
          },
          function () {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function (downloadURL) {
                return database
                  .ref(
                    `/${localStorage.getItem("chatId")}/my-account/${
                      data.id
                    }/imageProfil`
                  )
                  .set(
                    downloadURL,

                    (error) => {
                      if (error) {
                        // dispatch({ type: "CHANGE_LOADING", value: false });
                        // The write failed...
                        console.log(error);
                      } else {
                        // dispatch({ type: "CHANGE_LOADING", value: false });
                        // Data saved successfully!
                        console.log("succes");
                        dispatch({ type: "PROFIL_LOADING", value: false });
                      }
                    }
                  );
              });
          }
        );
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
};

export const loadProfilRoom = (data) => (dispatch) => {
  const profilAccounts = [];
  data.map((e) => {
    return database
      .ref(`${e.destinationId}/my-account`)
      .on("value", (snapshot) => {
        const profil = [];
        if (snapshot.val() !== null) {
          Object.keys(snapshot.val()).map((e) => {
            profil.push({
              name: snapshot.val()[e].name,
              imageProfil: snapshot.val()[e].imageProfil,
              status: snapshot.val()[e].status,
              contact: snapshot.val()[e].contact,
            });
            return <div></div>;
          });
        }

        profilAccounts.push({
          userId: e.destinationId,
          profil: profil[0],
        });
        dispatch({ type: "GET_ROOM_PROFIL", value: profilAccounts });
      });
  });
};

export const deleteChat = (data) => (dispatch) => {
  console.log(data.chat.length);
  if (data.chat.length <= 1) {
    return database
      .ref(`/${data.userId}/roomChat/${data.roomId}/Chats/${data.chatId}`)
      .set(
        {
          chat: "",
          userId: "",
          destinationId: "",
          myRoomId: "",
          destinationRoomId: "",
          time: "",
          timeStamp: "",
          status: "send",
          type: "",
          forwardChat: "",
          forwardName: "",
          forwardSenderId: "",
          forwardChatId: "",
        },

        (error) => {
          if (error) {
            // dispatch({ type: "CHANGE_LOADING", value: false });
            // The write failed...

            console.log(error);
          } else {
            // dispatch({ type: "CHANGE_LOADING", value: false });
            // Data saved successfully!
            console.log("tidak terhapus");
          }
        }
      );
  } else {
    return database
      .ref(`/${data.userId}/roomChat/${data.roomId}/Chats/${data.chatId}`)
      .remove((error) => {
        if (error) {
          // The write failed...
          console.log(error);
        } else {
          // Data saved successfully!
          console.log("succes");
        }
      });
  }
};

export const deleteContact = (data) => (dispatch) => {
  return database
    .ref(`/${data.userId}/contacts/${data.Contact.id}`)
    .remove((error) => {
      if (error) {
        // The write failed...
        console.log(error);
      } else {
        // Data saved successfully!
        console.log("succes");
      }
    });
};

export const editRoomName = (data) => (dispatch) => {
  return database
    .ref(`/${data.userId}/roomChat/${data.roomId}/destinationName`)
    .set(
      "",

      (error) => {
        if (error) {
          // dispatch({ type: "CHANGE_LOADING", value: false });
          // The write failed...

          console.log(error);
        } else {
          // dispatch({ type: "CHANGE_LOADING", value: false });
          // Data saved successfully!
          console.log("ok");
          dispatch({
            type: "ROOM_ID",
            value: {
              destinationRoomId: "",
              destinationUserId: "",
              myRoomId: "",
              userId: "",
              destinationName: "",
              destination: "",
              account: {
                imageProfil: "",
                name: "",
                status: "",
              },
            },
          });
        }
      }
    );
};

export const deleteRoomChat = (data) => (dispatch) => {
  return database
    .ref(`/${data.userId}/roomChat/${data.roomId}/Chats`)
    .remove((error) => {
      if (error) {
        // The write failed...
        console.log(error);
      } else {
        // Data saved successfully!
        console.log("succes");
        dispatch({
          type: "ROOM_ID",
          value: {
            destinationRoomId: "",
            destinationUserId: "",
            myRoomId: "",
            userId: "",
            destinationName: "",
            destination: "",
            account: {
              imageProfil: "",
              name: "",
              status: "",
            },
          },
        });
        // console.log(data.userId);
        // console.log(data.roomId);
      }
    });
};

export const cleanChat = (data) => (dispatch) => {
  data.chats
    .filter((val, index) => index > 0)
    .map((e) => {
      return database
        .ref(`/${data.userId}/roomChat/${data.roomId}/Chats/${e.id}`)
        .remove((error) => {
          if (error) {
            // The write failed...
            console.log(error);
          } else {
            // Data saved successfully!
            console.log("succes");
          }
        });
    });
  data.chats
    .filter((val, index) => index === 0)
    .map((e) => {
      console.log(e);
      return database
        .ref(`/${data.userId}/roomChat/${data.roomId}/Chats/${e.id}`)
        .set(
          {
            chat: "",
            userId: "",
            destinationId: "",
            myRoomId: "",
            destinationRoomId: "",
            time: "",
            timeStamp: "",
            status: "send",
            type: "",
            forwardChat: "",
            forwardName: "",
            forwardSenderId: "",
            forwardChatId: "",
          },

          (error) => {
            if (error) {
              // dispatch({ type: "CHANGE_LOADING", value: false });
              // The write failed...

              console.log(error);
            } else {
              // dispatch({ type: "CHANGE_LOADING", value: false });
              // Data saved successfully!
              console.log("tidak terhapus");
            }
          }
        );
    });
};

export const sendImg = (file) => (dispatch) => {
  console.log("originalFile instanceof Blob", file); // true
  console.log(`originalFile size ${file.size / 1024 / 1024} MB`);
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  imageCompression(file, options)
    .then((compressedFile) => {
      console.log("compressedFile instanceof Blob"); // true
      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      ); // smaller than maxSizeMB
      // write your own logic
      // if (file === null || file === undefined) {
      //   console.log("image not send");
      // } else {
      //   const storageRef = storage.ref();
      //   const uploadTask = storageRef
      //     .child(`resizeimages/${"image" + moment().format("YYYYMMDDHHmmss")}`)
      //     .put(compressedFile);
      //   uploadTask.on(
      //     "stateChanged",
      //     (snapshot) => {
      //       dispatch({ type: "contentImageLoading", value: true });
      //       const progress = parseInt(
      //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      //       );
      //       console.log("Upload is " + progress + "% done");
      //       dispatch({ type: "progressImage", value: progress });
      //     },
      //     function (error) {
      //       // Handle unsuccessful uploads
      //       console.log(error);
      //     },
      //     function () {
      //       // Handle successful uploads on complete
      //       // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      //       dispatch({ type: "progressImage", value: 100 });
      //       dispatch({ type: "contentImageLoading", value: true });
      //       uploadTask.snapshot.ref
      //         .getDownloadURL()
      //         .then(function (downloadURL) {
      //           console.log(downloadURL);
      //           dispatch({ type: "compressImg", value: downloadURL });
      //         });
      //       dispatch({ type: "contentImageLoading", value: false });
      //     }
      //   );
      // }
    })
    .catch((error) => {
      console.log(error.message);
    });

  // new Compressor(data, {
  //   quality: 0.2, // 0.6 can also be used, but its not recommended to go below.
  //   success: (compressedResult) => {
  //     // compressedResult has the compressed file.
  //     // Use the compressed file to upload the images to your server.
  //     console.log(compressedResult);
  //     console.log(data);
  //     if (data === null || data === undefined) {
  //       console.log("image not send");
  //     } else {
  //       const storageRef = storage.ref();
  //       const uploadTask = storageRef
  //         .child(`resizeimages/${"image" + moment().format("YYYYMMDDHHmmss")}`)
  //         .put(compressedResult);
  //       uploadTask.on(
  //         "stateChanged",
  //         (snapshot) => {
  //           dispatch({ type: "contentImageLoading", value: true });
  //           const progress = parseInt(
  //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //           );
  //           console.log("Upload is " + progress + "% done");
  //           dispatch({ type: "progressImage", value: progress });
  //         },
  //         function (error) {
  //           // Handle unsuccessful uploads
  //           console.log(error);
  //         },
  //         function () {
  //           // Handle successful uploads on complete
  //           // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  //           dispatch({ type: "progressImage", value: 100 });
  //           dispatch({ type: "contentImageLoading", value: true });
  //           uploadTask.snapshot.ref
  //             .getDownloadURL()
  //             .then(function (downloadURL) {
  //               console.log(downloadURL);
  //             });
  //           dispatch({ type: "contentImageLoading", value: false });
  //         }
  //       );
  //     }
  //   },
  // });
};
