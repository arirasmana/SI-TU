import styled from "styled-components";
import { Colors } from "../../styles";

export const Modal = styled.div`
  width: 600px;
  height: 550px;
  /* padding: 20px; */
  flex-direction: column;
  justify-content: space-between;
  display: flex;
  border-radius: 20px;
`

export const DeleteModal = styled.div`
  width: 400px;
  height: 250px;
  flex-direction: column;
  justify-content: space-between;
  display: flex;
  border-radius: 20px;
`

export const Title = styled.div`
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 24px;
  padding: 15px;
  color: ${Colors.Navy};
  border-bottom: 1px solid ${Colors.Grey};
  margin-bottom: 20px;
  width: auto;
`

export const Subtitle = styled.label`
  font-family: 'Roboto';
  font-size: 14px;
  padding: 15px;
  color: ${Colors.Navy};
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

export const SpinnerCard = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  height: 200px;
  width: auto;
`