import axios from "axios";
import { connect } from "react-redux";
import { useEffect } from "react";

const NewApp = ({ jsonData, getAllData }) => {
  useEffect(() => {
    getAllData();
  }, [getAllData]);
  console.log(jsonData);
  return (
    <div>
      <button>getdata</button>
    </div>
  );
};

const stateReducer = (state) => {
  return {
    jsonData: state.jsonData,
  };
};

const dispatchReducer = (dispatch) => ({
  getAllData: () =>
    axios.get("https://jsonplaceholder.typicode.com/posts").then((response) =>
      dispatch({
        type: "JSON",
        value: response.data,
      })
    ),
});

export default connect(stateReducer, dispatchReducer)(NewApp);
