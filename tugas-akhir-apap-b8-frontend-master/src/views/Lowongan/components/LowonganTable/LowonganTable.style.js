import styled from "styled-components";
import { Colors } from "../../../../styles";

export const Modal = styled.div`
  width: 600px;
  height: 550px;
  /* padding: 20px; */
  flex-direction: column;
  justify-content: space-between;
  display: flex;
  border-radius: 20px;
`

export const SpinnerCard = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  height: 200px;
  width: auto;
`

export const ColumnContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  color: ${Colors.Navy};
  width: ${props => props.full ? 100 : 50}%;
`

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-start;
  padding: 20px;

`