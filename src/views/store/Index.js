import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Table from "../../containers/Table";
import AdminLayout from "../../layouts/adminLayout";
import { api } from "../../config/api";
import Button from "../../containers/Button";
import { deleteStore } from "../../redux/actions/StoreActions";
import { actionType } from "../../redux/constants/action-types";
export const Index = (props) => {
  const [stores, setStores] = useState([]);

  const load = () => {
    api()
      .get("/store", {}, props.auth.user.token)
      .then((res) => {
        console.log(res.data);
        let data = [];
        res.data.map((el) => {
          data.push({
            id: el.id,
            store: el.name,
            name: el.user.name,
            products: el.products,
            created_at: el.created_at,
          });
        });
        setStores(data);
      });
  };
  useEffect(() => {
    load();
  }, []);
  const handleDelete = (store) => {
    props.destroy(store, props.auth.user.token).then((res) => {
      console.log(res);
      props.setLoading();
      load();
    });
  };
  const handleUpdate = (store) => {
    props.history.push(`/store/edit/${store.id}`);
  };
  return (
    <div>
      <AdminLayout header="Store Management">
        <div className="flex justify-end">
          <Button title="Create a new Store" to="/store/create" />
        </div>
        <Table
          headers={["no", "store", "name", "products", "date"]}
          data={stores}
          deleteAction={handleDelete}
        />
      </AdminLayout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  destroy: (data, token) => dispatch(deleteStore(data, token)),
  setLoading: () => dispatch({ type: actionType.SET_LOADING, payload: false }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
