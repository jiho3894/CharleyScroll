import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/configStore";
import { addNumber, minusNumber } from "../store/slice/counterSlice";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: skyblue;
  button {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
`;

const Home = () => {
  const dispatch = useDispatch();
  const { val } = useSelector((state: RootState) => state.counter);
  console.log(val);
  const Plus = () => {
    dispatch(addNumber(1));
  };
  const Minus = () => {
    dispatch(minusNumber(1));
  };
  return (
    <Container>
      <div>{val}</div>
      <button onClick={Plus}>+</button>
      <button onClick={Minus}>-</button>
    </Container>
  );
};

export default Home;
