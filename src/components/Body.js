import { Form, Select, Spin } from "antd";
import React, { Fragment, useCallback, useEffect, useReducer, useState } from "react";
import axios from "axios";
let { Option } = Select;
function Body() {
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

  const getCategory = async () => {
    setLoader((prevState) => prevState + 1);
    let result = await axios("https://fakestoreapi.com/products/categories");
    setState({ categoryList: result.data });
    setLoader((prevState) => prevState - 1);
  };
  const getProductList = async (e) => {
    setLoader((prevState) => prevState + 1);
    try {
      let result = await axios("https://fakestoreapi.com/products/");
      let updatedList = result.data;

      setState({ productList: updatedList });
      setLoader((prevState) => prevState - 1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <Spin spinning={loader === 0 ? false : true}>
        <div className="mt-2">
          <div className="row">
            <div className="col-md-3">
              <Form>
                <Form.Item>
                  <label>Select Category</label>
                  <Select onChange={filterCategory} placeholder="Select Category">
                    {state.categoryList.map((items) => (
                      <Option value={items} key={items}>
                        {items.toUpperCase()}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Form>
            </div>
            <div className="col-md-9"></div>
          </div>
        </div>
      </Spin>
    </Fragment>
  );
}
export default React.memo(Body);
