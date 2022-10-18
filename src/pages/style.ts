import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: skyblue;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Button = styled.button`
  width: 40px;
  height: 40px;
  font-size: 20px;
`;

export const Input = styled.input`
  width: 260px;
  height: 2rem;
  border: 0;
  outline: none;
`;

export const BoxContainer = styled.div`
  width: 340px;
  max-height: 80vh;
  overflow-y: scroll;
`;

export const Box = styled.div`
  width: 300px;
  height: 4rem;
  background-color: white;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 100%;
  }
  span {
    font-weight: 600;
  }
  &:hover {
    background-color: transparent;
  }
`;
