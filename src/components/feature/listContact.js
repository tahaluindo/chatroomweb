import { connect } from "react-redux";
import avatar2 from "../img/user.png";
import trash from "../img/trash.png";
import {
  getRoom,
  getOtherRoom,
  getRoomId,
  deleteContact,
  editRoomName,
} from "../reducer/action";
import { useState } from "react";
const ListContact = ({
  listContacts,
  setScreenOpen,
  getRoomChat,
  listOtherRoomChat,
  listRoomChat,
  showContact,
  getOtherRoom,
  editRoomName,
  listRoomChatContact,
  getRoomId,
  deleteContact,
  searchInput,
}) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [id, setId] = useState({});
  const open = (data) => {
    setId(data);
    setOpenConfirm(true);
  };
  const delContact = (data) => {
    editRoomName(data);
    setOpenConfirm(false);
  };
  const getId = (data) => {
    getRoomId(data);
    setScreenOpen("chat");
    showContact(false);
  };
  const contactRoom = listRoomChat.filter((x) => x.destinationName !== "");
  return (
    <div className="listChat2 justify-content-center">
      {contactRoom
        .filter((val) => {
          if (searchInput === "") {
            return val;
          } else {
            return (
              val.destination
                .toLowerCase()
                .includes(searchInput.toLowerCase()) ||
              val.destinationName
                .toLowerCase()
                .includes(searchInput.toLowerCase())
            );
          }
        })
        .map((e) => {
          return (
            <div>
              {
                <div className="listmap border-bottom border-2">
                  <div className="listView d-flex">
                    {e.accounts.imageProfil !== "" && (
                      <img
                        src={e.accounts.imageProfil}
                        width="50px"
                        height="50px"
                        alt=""
                      />
                    )}
                    {e.accounts.imageProfil === "" && (
                      <img src={avatar2} width="50px" height="50px" alt="" />
                    )}
                    <div className="name mt-3 d-flex justify-content-between align-items-center">
                      <div
                        onClick={() =>
                          getId({
                            userId: e.userId,
                            destinationId: e.destinationId,
                            roomId: e.id,
                            destinationName: e.destinationName,
                            destination: e.destination,
                            account: e.accounts,
                          })
                        }
                        className="nameContact"
                      >
                        {e.destinationName !== "" && (
                          <p className="edtmrgnTop name1">
                            {e.destinationName}
                          </p>
                        )}
                        {e.destinationName === "" && (
                          <p className="name1">{e.destination}</p>
                        )}
                        <p className="textPreview">{e.destination}</p>
                      </div>
                      <div
                        onClick={() =>
                          open({
                            roomId: e.id,
                            userId: localStorage.getItem("chatId"),
                            phone: e.destination,
                            Contact: listContacts.filter(
                              (val) => val.contact === e.destination
                            )[0],
                          })
                        }
                        className="deleteContact"
                      >
                        <img
                          className="imgDeleteContact"
                          src={trash}
                          alt=""
                          width="15px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              }
              {listRoomChatContact.length === 0 && (
                <div>
                  <p>hallo</p>
                </div>
              )}
            </div>
          );
        })}
      {openConfirm === true && (
        <div className="confirmField d-flex justify-content-center align-items-center ">
          <div className="confirm shadow text-start">
            <p>Hapus kontak ini?</p>
            <div className="btnconfirm text-end">
              <button
                onClick={() => setOpenConfirm(false)}
                className="btnconfirm1"
              >
                Tidak
              </button>
              <button onClick={() => delContact(id)} className="btnconfirm2">
                Hapus kontak
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
    listContacts: state.listContacts,
    listOtherRoomChat: state.listOtherRoomChat,
    listRoomChat: state.listRoomChat,
    listRoomChatContact: state.listRoomChatContact,
    searchInput: state.searchInput,
  };
};

const dispatchReducer = (dispatch) => ({
  // addmyRoom: (data) => dispatch(addmyRoom(data)),

  // addDestinationRoom: (data) => dispatch(addDestinationRoom(data)),
  showContact: (data) => dispatch({ type: "SHOW_CONTACT_MENU", value: data }),
  setScreenOpen: (data) =>
    dispatch({
      type: "screen",
      value: data,
    }),
  getRoom: () => dispatch(getRoom()),
  getOtherRoom: (data) => dispatch(getOtherRoom(data)),
  getRoomId: (data) => dispatch(getRoomId(data)),
  deleteContact: (data) => dispatch(deleteContact(data)),
  editRoomName: (data) => dispatch(editRoomName(data)),
});

export default connect(stateReducer, dispatchReducer)(ListContact);
