import { withCookies } from 'react-cookie';


const getToken = (props) => {
  return props.allCookies.token
}

export default withCookies(getToken);