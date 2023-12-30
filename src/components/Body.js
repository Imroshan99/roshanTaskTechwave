import { Form, Select, Spin, Table, notification } from "antd";
import React, { Fragment, useCallback, useEffect, useReducer, useState } from "react";
import axios from "axios";
const { Option } = Select;
function Body() {
  const [form] = Form.useForm();
  const [state, setState] = useReducer((state, newState) => ({ ...state, ...newState }), {
    isSorted: false,
    sortBy: "",
    productList: [],
    categoryList: [],
  });
  const [loader, setLoader] = useState(0);
  useEffect(() => {
    getProductList();
    getCategory();
  }, []);
  useEffect(() => {
    if (state.sortBy) {
      if (state.sortBy === "ztoa") {
        setState({ productList: state.productList.sort((a, b) => b.price - a.price) });
      } else if (state.sortBy === "atoz") {
        setState({ productList: state.productList.sort((a, b) => a.price - b.price) });
      }
    }
  }, [state.sortBy]);

  const getCategory = async () => {
    try {
      setLoader((prevState) => prevState + 1);
      let result = await axios("https://fakestoreapi.com/products/categories/");
      // console.log(result, "RRRR result");
      if (!result?.data) {
        throw new Error("Network response not found");
      } else {
        setState({ categoryList: result.data.reverse() });
      }
    } catch (error) {
      // console.error(error);
      notification.error({ message: error.message });
    } finally {
      setLoader((prevState) => prevState - 1);
    }
  };

  const getProductList = async (e) => {
    try {
      setLoader((prevState) => prevState + 1);
      let result = await axios("https://fakestoreapi.com/products/");
      if (!result?.data) {
        throw new Error("Network response was not ok");
      } else {
        setState({ productList: result.data });
      }
    } catch (err) {
      // console.log(err, "RRRR prlist");
      notification.error({ message: err.message });
    } finally {
      setLoader((prevState) => prevState - 1);
    }
  };
  const filterCategory = useCallback(async (e) => {
    try {
      form.setFieldsValue({ sort: "" });
      setLoader((prevState) => prevState + 1);
      let result = await axios(`https://fakestoreapi.com/products/category/${e}`);
      if (result.data.length === 0) {
        throw new Error("Network response was not ok");
      } else {
        setState({ productList: result.data, sortBy: "" });
      }
    } catch (error) {
      // console.log(error);
      notification.error({ message: error.message });
    } finally {
      setLoader((prevState) => prevState - 1);
    }
  }, []);

  let columns = [
    {
      title: "Image",
      dataIndex: "",
      render: (text, record, abc) => {
        return <img key={abc} src={text.image} alt="titleImage" width={60} height={45} />;
      },
    },
    { title: "Title", dataIndex: "title" },
    {
      title: "Price",
      dataIndex: "",
      render: (text) => {
        return <span>&#8377; &nbsp;{text.price} </span>;
      },
    },
    {
      title: "Rating",
      dateIndex: "",
      render: (text, rec, abc) => {
        // console.log("RRRR text ", text);
        return (
          <span className="d-flex">
            {text.rating.rate}
            <span className="ms-1 bi bi-star-fill text-success"></span>
          </span>
        );
      },
    },
  ];
  return (
    <Fragment>
      <Spin spinning={loader === 0 ? false : true}>
        <div className="mt-2">
          <div className="row">
            <div className="col-md-3">
              <Form form={form}>
                <label>Select Category</label>
                <Form.Item name="category">
                  <Select onChange={filterCategory} placeholder="Select Category">
                    {state.categoryList.map((items) => (
                      <Option value={items} key={items}>
                        {items.toUpperCase()}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <label>Sort By Price</label>
                <Form.Item name="sort">
                  <Select
                    placeholder="Sort By Price"
                    onChange={(e) => setState({ isSorted: true, sortBy: e })}
                  >
                    <Option value={"atoz"}>Lowest Sort</Option>
                    <Option value={"ztoa"}>Highest Sort</Option>
                  </Select>
                </Form.Item>
              </Form>
            </div>
            <div className="col-md-9">
              <Table
                dataSource={[...state.productList]}
                rowKey={state.productList}
                columns={columns}
                pagination={{ pageSize: 6 }}
              />
            </div>
          </div>
        </div>
      </Spin>
    </Fragment>
  );
}
export default React.memo(Body);
