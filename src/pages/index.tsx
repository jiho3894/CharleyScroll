import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Counter from "../components/Counter";
import ProfileList from "../components/ProfileList";
import { AppDispatch, RootState } from "../store/configStore";
import {
  Profile,
  __getProfile,
  __postProfile,
} from "../store/slice/profileSlice";
import { Container, Input } from "./style";

const Home = () => {
  const [text, setText] = useState<string>("");
  const [num, setNum] = useState<number>(20);
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useSelector((state: RootState) => state.profile);
  const postProfile = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: Profile = {
      name: text,
      id: String(profile.length + 1),
      avatar: "hi",
    };
    dispatch(__postProfile(data));
  };
  const ChangeText = useCallback(() => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
    };
  }, []);
  useEffect(() => {
    dispatch(__getProfile(num));
  }, [dispatch, num]);
  return (
    <Container>
      <Counter />
      <form onSubmit={postProfile}>
        <Input
          autoFocus
          type="text"
          placeholder="이름 입력"
          onChange={ChangeText}
        />
        <ProfileList profile={profile} setNum={setNum} />
      </form>
    </Container>
  );
};

export default Home;
