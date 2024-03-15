import { KeyboardEvent, useState } from 'react'
import { useAppDispatch } from '../hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import { signInUser } from '../redux/modules/userSlice';
// components
import styled from "styled-components";
// elements
import Input from "../elements/Input";
import Button from "../elements/Button";
import Tab from "../elements/Tab";
// assets
import Hodu from "../assets/images/Logo-hodu15.png";

interface LoginData {
    username: string;
    password: string;
    login_type: string;
}

function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [tab, setTab] = useState<number>(0)
    const [id, setId] = useState("")
    const [pw, setPw] = useState("")

    const [idMessage, setIdMessage] = useState("")
    const [pwMessage, setPwMessage] = useState("")
    const [salesIdMessage, setSalesIdMessage] = useState("")
    const [salesPwMessage, setSalesPwMessage] = useState("")

    const handleLogin = () => {
        const loginData: LoginData = {
            username: id,
            password: pw,
            login_type: tab === 0 ? "BUYER" : "SELLER"
        }
        if (tab === 0) {
            if (id === "") {
                setIdMessage("아이디를 입력해주세요")
            }
            if (pw === "") {
                setPwMessage("비밀번호를 입력해주세요")
            }
            dispatch(signInUser(loginData))
        } else if (tab === 1) {
            if (id === "") {
                setSalesIdMessage("아이디를 입력해주세요")
            }
            if (pw === "") {
                setSalesPwMessage("비밀번호를 입력해주세요")
            }
            dispatch(signInUser(loginData))
        }
    }

    const handleLoginEnter = (e: KeyboardEvent<HTMLElement>) => {
        if (e.key === "Enter") {
            handleLogin()
            console.log(e)
        }
    }
    return (
        <LoginSection>
            <h1 style={{ marginBottom: "70px" }}>
                <img src={Hodu} alt="Hodu Logo" onClick={() => navigate("/")} />
            </h1>
            <Tab tab={tab} setTab={setTab} children="구매로그인" children2="판매로그인" />
            <LoginForm>
                {tab === 0 &&
                    <ul className='login-wrap'>
                        <Input placeholder="아이디" height="44px" padding="none" border="none" radius="none" borderBottom="1px solid #c4c4c4" borderColor="transparent" _onChange={(e) => setId(e.target.value)} />
                        {id.length >= 0 && (
                            <>
                                <Message>
                                    {idMessage}
                                </Message>
                            </>
                        )}
                        <Input type="password" placeholder="비밀번호" height="44px" padding="none" border="none" radius="none" borderBottom="1px solid #c4c4c4" borderColor="transparent" _onChange={(e) => setPw(e.target.value)} _onKeyUp={(e) => handleLoginEnter(e)} />
                        {pw.length >= 0 && (
                            <>
                                <Message >
                                    {pwMessage}
                                </Message>
                            </>
                        )}
                        <Button height="50px" margin="52px 0 0" font_size="16px" font_weight="bold" _onClick={handleLogin}>로그인</Button>
                    </ul>
                }
                {tab === 1 &&
                    <ul className='sales-login_wrap'>
                        <Input placeholder="아이디" height="44px" padding="none" border="none" radius="none" borderBottom="1px solid #c4c4c4" borderColor="transparent" _onChange={(e) => setId(e.target.value)} />
                        {id.length >= 0 && (
                            <>
                                <Message>
                                    {salesIdMessage}
                                </Message>
                            </>
                        )}
                        <Input type="password" placeholder="비밀번호" height="44px" padding="none" border="none" radius="none" borderBottom="1px solid #c4c4c4" borderColor="transparent" _onChange={(e) => setPw(e.target.value)} _onKeyUp={(e) => handleLoginEnter(e)} />
                        {pw.length >= 0 && (
                            <>
                                <Message>
                                    {salesPwMessage}
                                </Message>
                            </>
                        )}
                        {
                            tab === 1 ?
                                <Button height="50px" margin="52px 0 0" font_size="16px" font_weight="bold" _onClick={handleLogin}>로그인</Button> :
                                <Button height="50px" margin="52px 0 0" font_size="16px" font_weight="bold" _onClick={handleLogin}>로그인</Button>
                        }
                    </ul>
                }
            </LoginForm>
            <div className='move-to_signup'>
                <span onClick={() => navigate("/signup")}>회원가입</span>
                <span>비밀번호찾기</span>
            </div>
        </LoginSection>
    )
}

const LoginSection = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  h1 {
    cursor: pointer;
  }
   .move-to_signup {
    margin-top: 30px;
    span {
        font-size: 16px;
        :first-child {
            cursor: pointer;
            ::after {
                display: inline-block;
                content: "";
                width: 1.8px;
                height: 16px;
                background-color: #333333;
                vertical-align: bottom;
                margin: 0 10px;
            }
        }
    }
  }
`

const LoginForm = styled.div`
  width: 440px;
  box-sizing: border-box;
  border: 1px solid #C4C4C4;
  border-top: none;
  .login-wrap {
    padding: 34px 35px 36px;
  }
  .sales-login_wrap {
    padding: 34px 35px 36px;
  }
`

const Message = styled.p`
  font-size: 13px;
  align-self: flex-start;
  margin-top: 10px;
  color: ${(props) => (props.className === "success" ? "#21BF48" : "#EB5757;")}
`

export default Login