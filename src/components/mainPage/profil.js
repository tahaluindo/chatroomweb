import { connect } from "react-redux";
import close from "../img/left-turn-arrow.png";
import avatar2 from "../img/user.png";
import editImg from "../img/pencil.png";
import saveEdit from "../img/check(black).png";
import closeProfil from "../img/left-arrow.png";
// import cameraimg from "../img/camera-512.png";
import { useState } from "react";
import { updateProfil, changeImage, deletePhoto } from "../reducer/action";
import { Link } from "react-router-dom";

const Profil = ({
  account,
  profilName,
  status,
  updateProfil,
  imageUrl,
  changeImage,
  profilLoading,
  deletePhoto,
  hideContactProfil,
}) => {
  const [profilEdit, setProfilEdit] = useState(false);
  const [statusEdit, setStatusEdit] = useState(false);
  const [openImg, setOpenImg] = useState(false);
  const [name, setName] = useState(profilName);
  const [info, setInfo] = useState(status);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const Logout = () => {
    localStorage.setItem("chatLogin", "false");
    localStorage.setItem("chatId", "");
    localStorage.setItem("phoneNumber", "");
  };

  return (
    account &&
    account.map((e) => {
      return (
        <div className="myProf profil align-items-center">
          <img
            onClick={() => hideContactProfil()}
            className="closeProfil"
            src={closeProfil}
            alt=""
            width="30px"
          />
          <div className="borderImg">
            <div>
              {e.imageProfil !== "" && (
                <img
                  className="profilImg shadow-sm"
                  src={e.imageProfil}
                  alt=""
                />
              )}
              {e.imageProfil === "" && (
                <img className="profilImg shadow-sm" src={avatar2} alt="" />
              )}
              <div className="profilImg-hover d-flex flex-column align-items-center">
                <div className="content-edit">
                  <label for="addFoto">
                    {e.imageProfil !== "" && <p>UBAH FOTO</p>}
                    {e.imageProfil === "" && <p>UNGGAH FOTO</p>}
                  </label>
                  <input
                    className="d-none"
                    id="addFoto"
                    type="file"
                    accept="image/x-png,image/gif,image/jpeg"
                    onChange={(val) =>
                      changeImage({
                        file: val.target.files[0],
                        id: e.id,
                      })
                    }
                  />
                  {e.imageProfil !== "" && (
                    <p onClick={() => setOpenImg(true)}>LIHAT FOTO</p>
                  )}
                  {e.imageProfil !== "" && (
                    <p
                      onClick={() =>
                        deletePhoto({
                          id: e.id,
                          value: "",
                          title: "imageProfil",
                        })
                      }
                    >
                      HAPUS FOTO
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* {imageedit === true && profilLoading === false && (
              <div className="editImage profilImg shadow-sm align-items-center">
                <div
                  onMouseOut={() => setImageEdit(false)}
                  className="xyz d-flex flex-column align-items-center"
                >
                  <label for="addFoto">
                    {e.imageProfil !== "" && <p>UBAH FOTO</p>}
                    {e.imageProfil === "" && <p>UNGGAH FOTO</p>}
                  </label>
                  <input
                    id="addFoto"
                    type="file"
                    accept="image/x-png,image/gif,image/jpeg"
                    onChange={(val) =>
                      changeImage({
                        file: val.target.files[0],
                        id: e.id,
                      })
                    }
                  />
                  {e.imageProfil !== "" && (
                    <p onClick={() => setOpenImg(true)}>LIHAT FOTO</p>
                  )}
                  {e.imageProfil !== "" && (
                    <p
                      onClick={() =>
                        deletePhoto({
                          id: e.id,
                          value: "",
                          title: "imageProfil",
                        })
                      }
                    >
                      HAPUS FOTO
                    </p>
                  )}
                </div>
              </div>
            )} */}

            {profilLoading === true && (
              <div className="profilImg-hover d-flex flex-column align-items-center">
                <div className="content-edit">
                  <div class="spinner-border text-light" role="status"></div>
                </div>
              </div>
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
                  <img className="profilImgShow" src={e.imageProfil} alt="" />
                </div>
              </div>
            )}
          </div>
          <div className="info">
            <div className="profilInfo shadow-sm">
              <p className="label">Nama anda</p>

              <div className="mrgn d-flex  flex-row-reverse justify-content-between">
                <label for="editName">
                  {profilEdit === false && (
                    <img
                      onClick={() => setProfilEdit(true)}
                      className="editImg conten"
                      src={editImg}
                      alt=""
                    />
                  )}
                  {profilEdit === true && name !== "" && (
                    <img
                      onClick={() =>
                        updateProfil(
                          {
                            id: e.id,
                            title: "name",
                            value: name,
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
                {profilEdit === false && <p className="conten">{e.name}</p>}
                {profilEdit === true && (
                  <input
                    id="editName"
                    maxLength="13"
                    className="editConten conten"
                    value={name}
                    onChange={(val) => setName(val.target.value)}
                  />
                )}
              </div>
              {profilEdit === true && <hr className="borderEdit" />}
            </div>
            <div className="profilInfo shadow-sm">
              <p className="label">Status</p>
              <div className="mrgn d-flex  flex-row-reverse justify-content-between">
                <label for="editStatus">
                  {statusEdit === false && (
                    <img
                      onClick={() => setStatusEdit(true)}
                      className="editImg conten"
                      src={editImg}
                      alt=""
                    />
                  )}
                  {statusEdit === true && info !== "" && (
                    <img
                      onClick={() =>
                        updateProfil(
                          {
                            id: e.id,
                            title: "status",
                            value: info,
                          },
                          setStatusEdit(false)
                        )
                      }
                      className="editImg conten"
                      src={saveEdit}
                      alt=""
                    />
                  )}
                </label>
                {statusEdit === false && <p className="conten">{e.status}</p>}
                {statusEdit === true && (
                  <input
                    id="editStatus"
                    maxLength="13"
                    className="editConten conten"
                    value={info}
                    onChange={(x) => setInfo(x.target.value)}
                  />
                )}
              </div>
              {statusEdit === true && <hr className="borderEdit" />}
            </div>
            <div className="profilInfo shadow-sm">
              <p className="label">Nomor</p>
              <div className="d-flex justify-content-between">
                <p className="conten">{e.contact}</p>
              </div>
            </div>
          </div>
          <div onClick={() => setConfirmLogout(true)} className="logout">
            Keluar
          </div>
          {confirmLogout === true && (
            <div className="confirmField d-flex justify-content-center align-items-center ">
              <div className="confirm shadow text-start">
                <p>Keluar dari akun ini?</p>
                <div className="btnconfirm text-end">
                  <button
                    onClick={() => setConfirmLogout(false)}
                    className="btnconfirm1"
                  >
                    Tidak
                  </button>
                  <Link>
                    <button onClick={() => Logout()} className="btnconfirm2">
                      Keluar
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    })
  );
};

const stateReducer = (state) => {
  return {
    account: state.account,
    profilName: state.profilName,
    status: state.status,
    imageUrl: state.imageUrl,
    profilLoading: state.profilLoading,
  };
};

const dispatchReducer = (dispatch) => ({
  updateProfil: (data) => dispatch(updateProfil(data)),
  changeImage: (data) => dispatch(changeImage(data)),
  deletePhoto: (data) => dispatch(deletePhoto(data)),
  hideContactProfil: () =>
    dispatch({
      type: "SHOW_CONTACT_PROFIL",
      value: false,
    }),
});

export default connect(stateReducer, dispatchReducer)(Profil);
