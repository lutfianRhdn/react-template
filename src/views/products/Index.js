import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import { api } from "../../config/api";
import Table from "../../containers/Table";
import AdminLayout from "../../layouts/adminLayout";
import { deleteProduct } from "../../redux/actions/ProductActions";
import { actionType } from "../../redux/constants/action-types";

export const Index = (props) => {
  const [products, setProducts] = useState([]);
  const loadProducts = () => {
    api()
      .get("/product", {}, props.auth.user.token)
      .then((products) => {
        let data = [];
        products.data.map((el) => {
          data.push({
            id: el.id,
            name: el.name,
            store: el.store.name,
            price: numeral(el.price).format("0,0a"),
            category: el.category.name,
          });
        });
        setProducts(data);
      });
  };
  useEffect(() => {
    loadProducts();
  }, []);
  const handleDelete = (product) => {
    props.deleteProduct(product, props.auth.token).then(() => {
      props.setLoading();
      loadProducts();
    });
  };
  return (
    <div>
      <AdminLayout header="Products Management">
        <Table
          headers={["no", "name", "store", "price", "category"]}
          data={products}
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
  deleteProduct: (data, token) => dispatch(deleteProduct(data, token)),
  setLoading: () => dispatch({ type: actionType.SET_LOADING, payload: false }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
