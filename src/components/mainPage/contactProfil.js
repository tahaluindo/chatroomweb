import { connect } from "react-redux";
import close from "../img/left-turn-arrow.png";
import closeProfil from "../img/left-arrow.png";
import avatar2 from "../img/user.png";
import editImg from "../img/pencil.png";
import saveEdit from "../img/check(black).png";
// import cameraimg from "../img/camera-512.png";
import { useState } from "react";
import {
  updateContactProfil,
  changeImage,
  deletePhoto,
} from "../reducer/action";

const ContactProfil = ({
  account,
  profilName,
  status,
  updateContactProfil,
  imageUrl,
  changeImage,
  profilLoading,
  deletePhoto,
  hideContactProfil,
  roomId,
}) => {
  const [openImg, setOpenImg] = useState(false);
  const [name, setName] = useState(roomId.destinationName);
  const [profilEdit, setProfilEdit] = useState(false);
  console.log(roomId);
  return (
    <div className="profil align-items-center">
      <img
        onClick={() => hideContactProfil()}
        className="closeProfil"
        src={closeProfil}
        alt=""
        width="30px"
      />
      <p>Info kontak</p>
      <div className="borderImg">
        {roomId.account.imageProfil !== "" && (
          <img
            onClick={() => setOpenImg(true)}
            className="profilImg shadow-sm"
            src={roomId.account.imageProfil}
            alt=""
          />
        )}
        {roomId.account.imageProfil === "" && (
          <img className="profilImg shadow-sm" src={avatar2} alt="" />
        )}

        {openImg === true && (
          <div className="openImg position-fixed">
            <div
              className="d-flex justify-content-end"
              onClick={() => setOpenImg(false)}
            >
              <img className="closeImg" src={close} alt="" />
            </div>
            <div className="openImage2">
              <img
                className="profilImgShow"
                src={roomId.account.imageProfil}
                alt=""
              />
            </div>
          </div>
        )}
      </div>
      <div className="info">
        {roomId.destinationName === "" &&
          roomId.account.name !== roomId.destination && (
            <p className="contactProfilName">~{roomId.account.name}</p>
          )}
        {roomId.destinationName !== "" && (
          <div className="profilInfo shadow-sm">
            <p className="label">Nama contact</p>

            <div className="mrgn d-flex flex-row-reverse justify-content-between">
              <label for="editName">
                {profilEdit === false && (
                  <img
                    onClick={() => setProfilEdit(true)}
                    className="editImg conten"
                    src={editImg}
                    alt=""
                  />
                )}
                {profilEdit === true && (
                  <img
                    onClick={() =>
                      updateContactProfil(
                        {
                          id: roomId.userId,
                          title: "destinationName",
                          myRoomId: roomId.myRoomId,
                          value: name,
                          roomId: roomId,
                        },
                        setProfilEdit(false)
                      )
                    }
                    className="editImg conten"
                    src={saveEdit}
                    alt=""
                  />
                )}
              </label>
              {profilEdit === false && (
                <p className="conten">{roomId.destinationName}</p>
              )}
              {profilEdit === true && (
                <input
                  id="editName"
                  maxLength="15"
                  className="editConten conten"
                  value={name}
                  onChange={(val) => setName(val.target.value)}
                />
              )}
            </div>
            {profilEdit === true && <hr className="borderEdit" />}
          </div>
        )}
        <div className="profilInfo shadow-sm">
          <p className="label">Status</p>
          <div className="mrgn d-flex justify-content-start">
            <p className="conten">{roomId.account.status}</p>
          </div>
        </div>
        <div className="profilInfo shadow-sm">
          <p className="label">Nomor</p>
          <div className="d-flex justify-content-between">
            <p className="conten">{roomId.destination}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const stateReducer = (state) => {
  return {
    roomId: state.roomId,
    account: state.account,
    profilName: state.profilName,
    status: state.status,
    imageUrl: state.imageUrl,
    profilLoading: state.profilLoading,
  };
};

const dispatchReducer = (dispatch) => ({
  updateContactProfil: (data) => dispatch(updateContactProfil(data)),
  changeImage: (data) => dispatch(changeImage(data)),
  deletePhoto: (data) => dispatch(deletePhoto(data)),
  hideContactProfil: () =>
    dispatch({
      type: "SHOW_CONTACT_PROFIL",
      value: false,
    }),
});

export default connect(stateReducer, dispatchReducer)(ContactProfil);
