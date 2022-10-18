import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { Box, BoxContainer } from "../pages/style";
import { AppDispatch } from "../store/configStore";
import { Profile, __delProfile } from "../store/slice/profileSlice";

interface Props {
  profile: Profile[];
  setNum: React.Dispatch<React.SetStateAction<number>>;
}

const ProfileList = ({ profile, setNum }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const deleteProfile = (id: string) => {
    dispatch(__delProfile(id));
  };
  const target = useRef<HTMLDivElement>(null);
  const { count } = useInfiniteScroll({
    target: target,
    targetArray: profile,
    threshold: 0.2,
    pageSize: 11,
    endPoint: 3,
  });
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    setNum(profile.length + 20);
  }, [count]);
  return (
    <BoxContainer ref={target}>
      {profile.map((data) => {
        return (
          <Box key={data.id} onClick={() => deleteProfile(data.id)}>
            <span>{data.name}</span>
            <img src={data.avatar} alt="" />
          </Box>
        );
      })}
      {isLoading && <div>Loading....</div>}
    </BoxContainer>
  );
};

export default React.memo(ProfileList);
