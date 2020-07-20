import styled from "styled-components";
import { Colors } from "../../styles";

export const Modal = styled.div`
  width: 600px;
  height: 650px;
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

export const DeleteModal = styled.div`
  width: 400px;
  height: 250px;
  flex-direction: column;
  justify-content: space-between;
  display: flex;
  border-radius: 20px;
`

export const Subtitle = styled.label`
  font-family: 'Roboto';
  font-size: 14px;
  padding: 15px;
  color: ${Colors.Navy};
  width: auto;
`

export const ColumnContainer = styled.div`
  display: flex;
  padding-top: 15px;
  padding-left: 25px;
  padding-right: 25px;
  padding-bottom: 15px;
  color: ${Colors.Navy};
  flex-direction: column;
  width: ${props => props.full ? 100 : 50}%;
`

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-start;
  padding: 20px;

`