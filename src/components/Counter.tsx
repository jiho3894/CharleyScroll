import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../pages/style";
import { AppDispatch, RootState } from "../store/configStore";
import { addNumber, minusNumber } from "../store/slice/counterSlice";

const Counter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { val } = useSelector((state: RootState) => state.counter);
  const Plus = () => {
    dispatch(addNumber(1));
  };
  const Minus = () => {
    dispatch(minusNumber(1));
  };
  return (
    <div style={{ display: "flex" }}>
      <div>{val}</div>
      <Button type="button" onClick={Plus}>
        +
      </Button>
      <Button type="button" onClick={Minus}>
        -
      </Button>
    </div>
  );
};

export default React.memo(Counter);
