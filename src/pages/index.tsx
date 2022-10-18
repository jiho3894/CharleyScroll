import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/configStore";
import { addNumber, minusNumber } from "../store/slice/counterSlice";
import {
  Profile,
  __delProfile,
  __getProfile,
  __postProfile,
} from "../store/slice/profileSlice";
import { Box, BoxContainer, Button, Container, Input } from "./style";

const Home = () => {
  const [text, setText] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const { val } = useSelector((state: RootState) => state.counter);
  const { profile, isLoading } = useSelector(
    (state: RootState) => state.profile
  );
  useEffect(() => {
    dispatch(__getProfile());
  }, [dispatch]);
  const Plus = () => {
    dispatch(addNumber(1));
  };
  const Minus = () => {
    dispatch(minusNumber(1));
  };
  const ChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const postProfile = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: Profile = {
      name: text,
      id: String(profile.length + 1),
      avatar: "hi",
    };
    dispatch(__postProfile(data));
  };
  const deleteProfile = (id: string) => {
    dispatch(__delProfile(id));
  };
  return (
    <Container>
      <form onSubmit={postProfile}>
        <div>{val}</div>
        <Button type="button" onClick={Plus}>
          +
        </Button>
        <Button type="button" onClick={Minus}>
          -
        </Button>
        <Input
          autoFocus
          type="text"
          placeholder="이름 입력"
          onChange={ChangeText}
        />
        {!isLoading ? (
          <div>Loading...</div>
        ) : (
          <BoxContainer>
            {profile.map((data) => {
              return (
                <Box key={data.id} onClick={() => deleteProfile(data.id)}>
                  <span>{data.name}</span>
                  <img src={data.avatar} alt="" />
                </Box>
              );
            })}
          </BoxContainer>
        )}
      </form>
    </Container>
  );
};

export default Home;
