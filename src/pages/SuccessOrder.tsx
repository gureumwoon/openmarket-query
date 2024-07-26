import styled from "styled-components";
import Nav from '../components/Nav'
import Button from '../elements/Button';

function SuccessOrder() {
    const isLogin = localStorage.getItem("token")
    return (
        <div>
            <Nav user_nav children={isLogin ? "마이페이지" : "로그인"} />
            <Main>
                <h1>주문/결제하기</h1>
                <p>주문이 완료되었습니다 :)</p>
                <Button
                    children="메인으로"
                    width="228px"
                    height="68px"
                    font_size="24px"
                    font_weight="700"
                />
            </Main>
        </div>
    )
}

const Main = styled.div`
    display: flex;
`

export default SuccessOrder