import { useState } from "react";
import { connect } from "react-redux";
import "../feature/style.css";
// import telephone from "../img/telephone.png";
// import close from "../img/cancel.png";
import { addContact, searchContact } from "../reducer/action";

const AddContact = ({
  searchContact,
  searchContactLoading,
  setSearchContact,
  showMainAddContactImg,
  availableNumber,
  addContact,
  hideContactMenu,
  listUser,
  listContacts,
  listRoomChat,
}) => {
  const [newNumber, setNewNumber] = useState("");
  const namecontact = listRoomChat.filter((e) => e.destination === newNumber);
  const [name, setName] = useState("");

  const hideContact = () => {
    hideContactMenu(false);
    setSearchContact(null);
    setNewNumber("");
  };
  const add = (data) => {
    addContact(data);
    setName("");
    hideContactMenu(false);
  };
  const setNumber = (data) => {
    setNewNumber(data);
  };
  const search = (data) => {
    searchContact(data);
    setName(namecontact.length !== 0 ? namecontact[0].destinationName : "");
  };
  console.log(namecontact.length !== 0 ? namecontact[0].destinationName : "");
  const idContact = listUser.filter((e) => e.number === newNumber);
  console.log(name);
  return (
    <div className="confirmField-chatSetting d-flex justify-content-center align-items-center">
      <div className="add-contact shadow text-start">
        {availableNumber === null && <h2>Tambah kontak baru</h2>}
        {availableNumber === localStorage.getItem("phoneNumber") && (
          <h2>Ini adalah no telepone anda</h2>
        )}
        {availableNumber === 0 && <h2>Nomor tidak ditemukan</h2>}
        {availableNumber !== 0 &&
          availableNumber !== null &&
          availableNumber !== localStorage.getItem("phoneNumber") && (
            <h2>Nomor ditemukan</h2>
          )}
        <div className="input-contact">
          {(availableNumber !== newNumber ||
            availableNumber === localStorage.getItem("phoneNumber")) && (
            <div>
              <span>Nomor</span>
              <input
                value={newNumber}
                onChange={(e) => setNumber(e.target.value)}
                type="text"
                autoFocus={true}
              />
              <br />
            </div>
          )}
          {availableNumber === newNumber &&
            availableNumber !== localStorage.getItem("phoneNumber") && (
              <div>
                <span>Nama</span>
                <input
                  className="addContactInput"
                  value={name.charAt(0).toUpperCase() + name.slice(1)}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus={true}
                  type="text"
                  maxLength="12"
                />
                <br />
              </div>
            )}
          {availableNumber === newNumber &&
            availableNumber !== localStorage.getItem("phoneNumber") && (
              <div className="res-add">
                <span>Nomor</span>
                <span>
                  <b>{availableNumber}</b>
                </span>
              </div>
            )}
          <div className="add-contact-btn">
            <button onClick={() => hideContact()} className="batal">
              Batal
            </button>
            {(availableNumber !== newNumber ||
              availableNumber === localStorage.getItem("phoneNumber")) && (
              <button onClick={() => search(newNumber)} className="cari">
                Cari
              </button>
            )}
            {availableNumber === newNumber &&
              availableNumber !== localStorage.getItem("phoneNumber") && (
                <button
                  onClick={() =>
                    add({
                      name: name,
                      contact: availableNumber,
                      id: idContact[0].id,
                      listRoomChat: listRoomChat,
                    })
                  }
                  className="cari"
                >
                  Simpan
                </button>
              )}
          </div>
        </div>
      </div>
      {/* <div>
        <img
          onClick={() => hideContactMenu(false)}
          className="backAddContact"
          src={close}
          width="25px"
          alt=""
        />
      </div>

      <input
        value={newNumber}
        onChange={(e) => setNewNumber(e.target.value)}
        placeholder="Masukkan nomor telepon"
        type="text"
      />
      <div className="mainAddContact">
        {showMainAddContactImg === true && (
          <img src={telephone} width="70px" alt="" />
        )}
        {showMainAddContactImg === false && (
          <div className="addContact d-flex justify-content-center">
            {availableNumber !== "Nomor tidak ditemukan!!" &&
              availableNumber !== localStorage.getItem("phoneNumber") && (
                <div>
                  {listRoomChat.filter(
                    (e) => String(e.destination) === String(availableNumber)
                  ).length === 0 && (
                    <input
                      className="addContactInput"
                      placeholder="Nama kontak .."
                      value={name.charAt(0).toUpperCase() + name.slice(1)}
                      onChange={(e) => setName(e.target.value)}
                    />
                  )}
                  <p>{availableNumber}</p>
                </div>
              )}
            {availableNumber === localStorage.getItem("phoneNumber") && (
              <p>Ini adalah nomor telepon anda</p>
            )}
            {availableNumber === "Nomor tidak ditemukan!!" && (
              <p>Nomor tidak ditemukan</p>
            )}
            {availableNumber !== "Nomor tidak ditemukan!!" &&
              availableNumber !== localStorage.getItem("phoneNumber") &&
              name !== "" &&
              listRoomChat.filter(
                (e) => String(e.destination) === String(availableNumber)
              ).destinationName === "" && (
                <button
                  onClick={() =>
                    addContact(
                      {
                        name: name,
                        contact: availableNumber,
                        id: idContact[0].id,
                        listRoomChat: listRoomChat,
                      },
                      setName("")
                    )
                  }
                  className="addContactBtn"
                >
                  Tambah
                </button>
              )}
            {availableNumber !== "Nomor tidak ditemukan!!" &&
              listRoomChat.filter(
                (e) => String(e.destination) === String(availableNumber)
              ).destinationName !== "" && (
                <button className="greyBtn addContactBtn">Dimiliki</button>
              )}
          </div>
        )}
      </div>
      {searchContactLoading === false && (
        <button
          className="searchContact"
          onClick={() => searchContact(newNumber)}
        >
          Cari
        </button>
      )}
      {searchContactLoading === true && (
        <button className="progressBtn">
          <div class="spinner-border text-light" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </button>
      )} */}
    </div>
  );
};
const stateReducer = (state) => {
  return {
    listUser: state.listUser,
    searchContactLoading: state.searchContactLoading,
    showMainAddContactImg: state.showMainAddContactImg,
    availableNumber: state.availableNumber,
    listContacts: state.listContacts,
    listRoomChat: state.listRoomChat,
  };
};

const dispatchReducer = (dispatch) => ({
  searchContact: (data) => dispatch(searchContact(data)),
  addContact: (data) => dispatch(addContact(data)),
  hideContactMenu: (data) =>
    dispatch({
      type: "SHOW_ADD_CONTACT",
      value: data,
    }),
  setSearchContact: (data) =>
    dispatch({
      type: "availableNumber",
      value: data,
    }),
});

export default connect(stateReducer, dispatchReducer)(AddContact);
