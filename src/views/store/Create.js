import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { api } from "../../config/api";
import AdminLayout from "../../layouts/adminLayout";
import { createStore } from "../../redux/actions/StoreActions";
import AsyncSelect from "react-select/async";
import InputLabel from "../../containers/InputLabel";
export const Create = (props) => {
  const store = useRef();
  const [user, setUser] = useState();
  const img = useRef();
  const description = useRef();
  useEffect(() => {}, []);
  const loadOptions = (users) => {
    return api()
      .get("/user", {}, props.auth.user.token)
      .then((res) => res.data);
  };
  return (
    <div>
      <AdminLayout header="Create a New Store">
        <div className="w-full flex  justify-center">
          <div className=" w-3/4 shadow-md">
            <form className="w-full">
              <InputLabel label="Store Name" labelSize="xl" ref={store} classNamemy="2.5" />
              <InputLabel labelSize="xl" ref={description} label="Description" />
              <div className="mx-10 my-5">
                <AsyncSelect
                  className="w-full border-gray-900"
                  cacheOptions
                  defaultOptions
                  loadOptions={loadOptions}
                  value={user}
                  getOptionLabel={(e) => `${e.name} - ${e.email}`}
                  getOptionValue={(e) => e.id}
                  onChange={(val) => setUser(val)}
                />
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  store: (data, token) => dispatch(createStore(data, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);
