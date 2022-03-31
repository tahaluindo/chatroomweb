const initialstate = {
  dialNumber: null,
  displayErrorLogin: false,
  errorLoginMessage: "",
  loading: false,
  assetLoading: false,
  searchContactLoading: false,
  loadingLogin: false,
  showListContact: false,
  listUser: [],
  showMainAddContactImg: true,
  availableNumber: null,
  listContacts: [],
  showAddContact: false,
  listRoomChat: [],
  listRoomChatContact: [],
  listOtherRoomChat: [],
  myProfil: [],
  roomProfil: [],
  chats: [],
  roomId: {
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
  account: [],
  // account: {
  //   name: null,
  //   status: null,
  //   contact: null,
  //   ImageProfil: null,
  // },
  profilName: "",
  status: "",
  imageUrl: "",
  profilLoading: false,
  contactProfil: false,
  contentImageLoading: false,
  progressImage: 0,
  openChat: false,
  jsonData: [],
  chatSetting: false,
  searchInput: "",
  imgUrlcompressed: "",
  screenOpen: "list-room",
};

const Reducer = (state = initialstate, action) => {
  if (action.type === "compressImg") {
    return {
      ...state,
      imgUrlcompressed: action.value,
    };
  }
  if (action.type === "screen") {
    return {
      ...state,
      screenOpen: action.value,
    };
  }
  if (action.type === "REGISTER") {
    return {
      ...state,
      dialNumber: action.value,
    };
  }
  if (action.type === "JSON") {
    return {
      ...state,
      jsonData: action.value,
    };
  }

  if (action.type === "OPEN_CHAT") {
    return {
      ...state,
      openChat: action.value,
    };
  }

  if (action.type === "CHAT_SETTING") {
    return {
      ...state,
      chatSetting: action.value,
    };
  }

  if (action.type === "CAPTCHA_ERROR") {
    return {
      ...state,
      errorLoginMessage: action.value,
    };
  }

  if (action.type === "DISPLAY_ERROR") {
    return {
      ...state,
      displayErrorLogin: action.value,
    };
  }

  if (action.type === "CHANGE_LOADING") {
    return {
      ...state,
      loading: action.value,
    };
  }

  if (action.type === "CHANGE_SEARCH_CONTACT_LOADING") {
    return {
      ...state,
      searchContactLoading: action.value,
    };
  }

  if (action.type === "CHANGE_LOADING_LOGIN") {
    return {
      ...state,
      loadingLogin: action.value,
    };
  }

  if (action.type === "SHOW_CONTACT_MENU") {
    return {
      ...state,
      showListContact: action.value,
    };
  }

  if (action.type === "SHOW_ADD_CONTACT") {
    return {
      ...state,
      showAddContact: action.value,
    };
  }

  if (action.type === "GET_USER") {
    return {
      ...state,
      listUser: action.value,
    };
  }

  if (action.type === "GET_CONTACT") {
    const filterContact = action.value.filter(
      (e) => String(e.contact) !== String(localStorage.getItem("phoneNumber"))
    );
    return {
      ...state,
      listContacts: filterContact,
    };
  }

  if (action.type === "SEARCH") {
    return {
      ...state,
      showMainAddContactImg: action.value,
    };
  }
  if (action.type === "availableNumber") {
    return {
      ...state,
      availableNumber: action.value,
    };
  }

  if (action.type === "GET_PROFIL") {
    return {
      ...state,
      myProfil: action.value,
    };
  }

  if (action.type === "GET_ROOM") {
    return {
      ...state,
      listRoomChat: action.value,
    };
  }

  if (action.type === "GET_ROOM_CONTACT") {
    return {
      ...state,
      listRoomChatContact: action.value,
    };
  }

  if (action.type === "GET_OTHER_ROOM") {
    return {
      ...state,
      listOtherRoomChat: action.value,
    };
  }

  if (action.type === "GET_CHATS") {
    return {
      ...state,
      chats: action.value,
    };
  }

  if (action.type === "ROOM_ID") {
    return {
      ...state,
      roomId: action.value,
    };
  }

  if (action.type === "GET_ACCOUNT") {
    return {
      ...state,
      account: action.value,
    };
  }
  if (action.type === "GET_PROFIL_NAME") {
    return {
      ...state,
      profilName: action.value,
    };
  }
  if (action.type === "GET_STATUS") {
    return {
      ...state,
      status: action.value,
    };
  }

  if (action.type === "GET_PROFIL_IMG") {
    return {
      ...state,
      imageUrl: action.value,
    };
  }

  if (action.type === "ASSET_LOADING") {
    return {
      ...state,
      assetLoading: action.value,
    };
  }

  if (action.type === "PROFIL_LOADING") {
    return {
      ...state,
      profilLoading: action.value,
    };
  }

  if (action.type === "GET_ROOM_PROFIL") {
    return {
      ...state,
      roomProfil: action.value,
    };
  }

  if (action.type === "SHOW_CONTACT_PROFIL") {
    return {
      ...state,
      contactProfil: action.value,
    };
  }

  if (action.type === "contentImageLoading") {
    return {
      ...state,
      contentImageLoading: action.value,
    };
  }

  if (action.type === "progressImage") {
    return {
      ...state,
      progressImage: action.value,
    };
  }

  if (action.type === "searchContact") {
    return {
      ...state,
      searchInput: action.value,
    };
  }

  return state;
};

export default Reducer;
