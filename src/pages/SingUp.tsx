import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { apis } from '../shared/api';
import styled from "styled-components";
// elements
import Input from "../elements/Input";
import Button from "../elements/Button";
import Tab from "../elements/Tab";
//assets
import Hodu from "../assets/images/Logo-hodu15.png";
import arrowUp from "../assets/images/icon-up-arrow.svg";
import pwCheckOn from "../assets/images/icon-check-on.svg";
import pwCheckOff from "../assets/images/icon-check-off.svg";
import { SellerSignUp, UserSignUp } from '../components/types/user';
import { useMutation } from '@tanstack/react-query';

function SignUp() {
    const navigate = useNavigate();

    const [tab, setTab] = useState(0)
    const [checkBox, setCheckBox] = useState(false)
    const [dropdown, setDropDown] = useState(false)

    // 구매 회원가입 정보 저장
    const [id, setId] = useState("")
    const [pw, setPw] = useState("")
    const [pw2, setPw2] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [email2, setEmail2] = useState("")
    const emailData = email + "@" + email2
    const [phoneData1, setPhoneData] = useState("")
    const [phoneData2, setPhoneData2] = useState("")
    const [phoneData3, setPhoneData3] = useState("")
    const phoneData = phoneData1 + phoneData2 + phoneData3

    // 판매 회원가입 정보 저장
    const [sellerId, setSellerId] = useState("")
    const [sellerPw, setSellerPw] = useState("")
    const [sellerPw2, setSellerPw2] = useState("")
    const [sellerName, setSellerName] = useState("")
    const [sellerEmail, setSellerEmail] = useState("")
    const [sellerEmail2, setSellerEmail2] = useState("")
    const sellerEmailData = sellerEmail + "@" + sellerEmail2
    const [sellerPhoneData1, setSellerPhoneData] = useState("")
    const [sellerPhoneData2, setSellerPhoneData2] = useState("")
    const [sellerPhoneData3, setSellerPhoneData3] = useState("")
    const sellerPhoneData = sellerPhoneData1 + sellerPhoneData2 + sellerPhoneData3
    const [bin, setBin] = useState("")
    const [storeName, setStoreName] = useState("")

    //중복확인 체크
    const [isCheck, setIsCheck] = useState(false);
    const [isCoNumCheck, setIsCoNumCheck] = useState(false);

    // 구매자 계정 에러 메세지
    const [idMessage, setIdMessage] = useState("")
    const [pwMessage, setPwMessage] = useState("")
    const [pw2Message, setPw2Message] = useState("")
    const [nameMessage, setNameMessage] = useState("")
    const [emailMessage, setEmailMessage] = useState("")
    const [phoneMessage, setPhoneMessage] = useState("")

    // 판매자 계정 에러 메세지
    const [salesIdMessage, setSalesIdMessage] = useState("")
    const [salesPwMessage, setSalesPwMessage] = useState("")
    const [salesPw2Message, setSalesPw2Message] = useState("")
    const [salesNameMessage, setSalesNameMessage] = useState("")
    const [salesEmailMessage, setSalesEmailMessage] = useState("")
    const [salesPhoneMessage, setSalesPhoneMessage] = useState("")
    const [salesBinMessage, setSalesBinMessage] = useState("")
    const [salesStoreNameMessage, setSalesStoreNameMessage] = useState("")

    // 구매자 계정 유효성 검사
    const [isPw, setIsPw] = useState(false)
    const [isPw2, setIsPw2] = useState(false)
    const [isId, setIsId] = useState(false)
    const [_, setIsName] = useState(false)
    const [isEmail, setIsEmail] = useState(false)
    const [isPhone, setIsPhone] = useState(false)

    // 판매자 계정 유효성 검사
    const [salesIsId, setSalesIsId] = useState(false)
    const [salesIsPw, setSalesIsPw] = useState(false)
    const [salesIsPw2, setSalesIsPw2] = useState(false)
    const [salesIsName, setSalesIsName] = useState(false)
    const [salesIsEmail, setSalesIsEmail] = useState(false)
    const [salesIsPhone, setSalesIsPhone] = useState(false)
    const [salesIsBin, setSalesIsBin] = useState(false)
    const [salesIsStoreName, setSalesIsStoreName] = useState(false)

    const signUpUser = useMutation({
        mutationFn: (signUpData: UserSignUp) => apis.signUp(signUpData)
    })
    const sellerSignUpUser = useMutation({
        mutationFn: (signUpData: SellerSignUp) => apis.sellerSignUp(signUpData)
    })

    // 전화번호 입력 dropdown
    const hadnleArrow = () => {
        setDropDown(!dropdown)
    }

    const handleSelect = (e: React.MouseEvent<HTMLElement>) => {
        const selectedOption = e.currentTarget.textContent || "";
        tab === 0 ? setPhoneData(selectedOption) : setSellerPhoneData(selectedOption);
        setDropDown(false)
    }

    // Id 유효성 검사
    const idCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value)
        setSellerId(e.target.value)
        const regId = /^[a-zA-Z][0-9a-zA-Z]{0,19}$/
        if (tab === 0) {
            if (!regId.test(e.target.value)) {
                setIdMessage("20자 이내의 영문 소문자,대문자,숫자만 사용 가능합니다.")
                setIsId(false)
            } else if (e.target.value === "") {
                setIdMessage("필수 정보입니다")
                setIsId(false)
            } else {
                setIdMessage("")
                setIsId(true)
            }
        } else if (tab === 1) {
            if (!regId.test(e.target.value)) {
                setSalesIdMessage("20자 이내의 영문 소문자,대문자,숫자만 사용 가능합니다.")
                setSalesIsId(false)
            } else if (e.target.value === "") {
                setSalesIdMessage("필수 정보입니다")
                setSalesIsId(false)
            } else {
                setSalesIdMessage("")
                setSalesIsId(true)
            }
        }
    }

    //ID중복검사 체크
    const dupCheck = () => {
        const userName = tab === 0 ? id : sellerId

        apis.userNameDupcheck({ username: userName })
            .then((res) => {
                tab === 0 ?
                    setIdMessage(res.data.Success) :
                    setSalesIdMessage(res.data.Success)
            })
            .catch((error) => {
                tab === 0 ?
                    setIdMessage(error.response.data.FAIL_Message) :
                    setSalesIdMessage(error.response.data.FAIL_Message)
                tab === 0 ?
                    setIsId(false) :
                    setSalesIsId(false)
            })
        setIsCheck(true)
    }

    // ID Input focus out 했을시 빈칸일때
    const idBlankCheck = () => {
        if (tab === 0) {
            if (id === "") {
                setIdMessage("필수 정보입니다")
                setIsId(false)
            }
        } else if (tab === 1) {
            if (sellerId === "") {
                setSalesIdMessage("필수 정보입니다")
                setSalesIsId(false)
            }
        }
    }

    // 비밀번호 유효성 검사
    const pwCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPw(e.target.value)
        setSellerPw(e.target.value)
        const regPw = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^])[A-Za-z\d@$!%*#?&^]{8,}$/

        if (tab === 0) {
            if (e.target.value === "") {
                setPwMessage("필수 정보입니다")
                setIsPw(false)
            } else if (!regPw.test(e.target.value)) {
                setPwMessage("8자 이상, 영문 대 소문자,숫자,특수문자를 사용하세요.")
                setIsPw(false)
            } else {
                setPwMessage("")
                setIsPw(true)
            }
        } else if (tab === 1) {
            if (e.target.value === "") {
                setSalesPwMessage("필수 정보입니다")
                setSalesIsPw(false)
            } else if (!regPw.test(sellerPw)) {
                setSalesPwMessage("8자 이상 영문, 숫자 조합으로 입력해주세요")
                setSalesIsPw(false)
            } else {
                setSalesPwMessage("올바른 비밀번호 입니다.")
                setSalesIsPw(true)
            }
        }
    }

    // Pw Input focus out 했을시 빈칸일때
    const pwBlankCheck = () => {
        if (tab === 0) {
            if (pw === "") {
                setPwMessage("필수 정보입니다")
                setIsPw(false)
            }
        } else if (tab === 1) {
            if (sellerPw === "") {
                setSalesPwMessage("필수 정보입니다")
                setSalesIsPw(false)
            }
        }
    }

    // 비밀번호 확인 유효성 검사
    const isSamePw = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPw2(e.target.value)
        setSellerPw2(e.target.value)
        if (tab === 0) {
            if (pw === e.target.value) {
                setPw2Message("비밀번호가 일치합니다.")
                setIsPw2(true)
            } else if (pw === "" && e.target.value === "") {
                setPw2Message("필수 정보입니다")
                setIsPw(false)
            }
            else if (e.target.value === "") {
                setPw2Message("필수 정보입니다")
                setIsPw2(false)
            } else {
                setPw2Message("비밀번호가 일치하지 않습니다")
                setIsPw2(false)
            }
        } else if (tab === 1) {
            if (sellerPw === e.target.value) {
                setSalesPw2Message("비밀번호가 일치합니다.")
                setSalesIsPw2(true)
            } else if (sellerPw === "" && e.target.value === "") {
                setSalesPw2Message("필수 정보입니다")
                setSalesIsPw(false)
            } else if (e.target.value === "") {
                setSalesPw2Message("필수 정보 입니다")
                setSalesIsPw2(false)
            } else {
                setSalesPw2Message("비밀번호가 일치하지 않습니다")
                setSalesIsPw2(false)
            }
        }
    }

    // Pw2 Input focus out 했을시 빈칸일때
    const pw2BlankCheck = () => {
        if (tab === 0) {
            if (pw2 === "") {
                setPw2Message("필수 정보입니다")
                setIsPw2(false)
            }
        } else if (tab === 1) {
            if (sellerPw2 === "") {
                setSalesPw2Message("필수 정보입니다")
                setSalesIsPw2(false)
            }
        }
    }

    const nameCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
        setSellerName(e.target.value)
        if (tab === 0) {
            if (e.target.value === "") {
                setNameMessage("필수 정보입니다")
                setIsName(false)
            }
        } else if (tab === 1) {
            if (e.target.value === "") {
                setSalesNameMessage("필수 정보입니다")
                setSalesIsName(false)
            }
        }
    }

    // Name Input focus out 했을시 빈칸일때
    const nameBlankCheck = () => {
        if (tab === 0) {
            if (name === "") {
                setNameMessage("필수 정보입니다")
                setIsName(false)
            }
        } else if (tab === 1) {
            if (sellerName === "") {
                setSalesNameMessage("필수 정보입니다")
                setSalesIsName(false)
            }
        }
    }

    // 이메일 유효성 검사
    const emailCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        setSellerEmail(e.target.value)
        const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

        if (tab === 0) {
            if (e.target.value === "") {
                setEmailMessage("필수 정보입니다")
                setIsEmail(false)
            } else if (!regEmail.test(emailData)) {
                setEmailMessage("잘못된 이메일 형식입니다.")
                setIsEmail(false)
            } else {
                setEmailMessage("올바른 이메일 형식 입니다")
                setIsEmail(true)
            }
        } else if (tab === 1) {
            if (e.target.value === "") {
                setSalesEmailMessage("필수 정보입니다")
                setSalesIsEmail(false)
            } else if (!regEmail.test(sellerEmailData)) {
                setSalesEmailMessage("잘못된 이메일 형식입니다.")
                setSalesIsEmail(false)
            } else {
                setSalesEmailMessage("올바른 이메일 형식 입니다")
                setSalesIsEmail(true)
            }
        }
    }

    const email2Check = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail2(e.target.value)
        setSellerEmail2(e.target.value)
        const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

        if (tab === 0) {
            if (e.target.value === "") {
                setEmailMessage("필수 정보입니다")
                setIsEmail(false)
            } else if (!regEmail.test(emailData)) {
                setEmailMessage("이메일 형식에 맞게 입력해주세요")
                setIsEmail(false)
            } else {
                setEmailMessage("올바른 이메일 형식 입니다")
                setIsEmail(true)
            }

        } else if (tab === 1) {
            if (e.target.value === "") {
                setSalesEmailMessage("필수 정보입니다")
                setSalesIsEmail(false)
            } else if (!regEmail.test(sellerEmailData)) {
                setSalesEmailMessage("이메일 형식에 맞게 입력해주세요")
                setSalesIsEmail(false)
            } else {
                setSalesEmailMessage("올바른 이메일 형식 입니다")
                setSalesIsEmail(true)
            }
        }
    }

    // Email Input focus out 했을시 빈칸일때
    const emailBlankCheck = () => {
        if (tab === 0) {
            if (email === "") {
                setEmailMessage("필수 정보입니다")
                setIsEmail(false)
            }
        } else if (tab === 1) {
            if (sellerEmail === "") {
                setSalesEmailMessage("필수 정보입니다")
                setSalesIsEmail(false)
            }
        }
    }

    // Phone Number 중복검사
    const phoneCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneData3(e.target.value)
        setSellerPhoneData3(e.target.value)
        const signUpData = {
            phone_number: tab === 0 ?
                phoneData1 + phoneData2 + e.target.value :
                sellerPhoneData1 + sellerPhoneData2 + e.target.value
        } as UserSignUp;
        apis.signUp(signUpData)
            .then(() => {

            })
            .catch((error) => {
                if (error.response.data.phone_number == "해당 사용자 전화번호는 이미 존재합니다.") {
                    tab === 0 ?
                        setPhoneMessage("해당 사용자 전화번호는 이미 존재합니다.") :
                        setSalesPhoneMessage("해당 사용자 전화번호는 이미 존재합니다.")
                    tab === 0 ?
                        setIsPhone(false) :
                        setSalesIsPhone(false)
                } else {
                    tab === 0 ?
                        setPhoneMessage("") :
                        setSalesPhoneMessage("")
                }
            })
    }

    // Phone Input focus out 했을시 빈칸일때
    const phoneBlankCheck = () => {
        if (tab === 0) {
            if (phoneData === "") {
                setPhoneMessage("필수 정보입니다")
                setIsPhone(false)
            }
        } else if (tab === 1) {
            if (sellerPhoneData === "") {
                setSalesPhoneMessage("필수 정보입니다")
                setSalesIsPhone(false)
            }
        }
    }


    // 사업자 등록번호 유효성 체크
    const binCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBin(e.target.value)
        const regBin = /^\d{10}$/
        if (e.target.value === "") {
            setSalesBinMessage("필수 정보입니다")
            setSalesIsBin(false)
        } else if (!regBin.test(e.target.value)) {
            setSalesBinMessage("사업자 등록번호 형식이 잘못되었습니다")
            setSalesIsBin(false)
        } else {
            setSalesBinMessage("올바른 형식 입니다")
            setSalesIsBin(true)
        }
    }

    // 사업자 번호 중복 체크
    const handleComNumCheck = () => {
        const companyNumberData = bin
        apis.companyNumCheck({ company_registration_number: companyNumberData })
            .then((res) => {
                setSalesBinMessage(res.data.Success)
            })
            .catch((error) => {
                setSalesBinMessage(error.response.data.FAIL_Message)
                setSalesIsBin(false)
            })
        setIsCoNumCheck(true)
    }

    // Bin Input focus out 했을시 빈칸일때
    const binBlankCheck = () => {
        if (bin === "") {
            setSalesBinMessage("필수 정보입니다")
            setSalesIsBin(false)
        }
    }

    // Store Name focus out 했을시 빈칸일때
    const storeNameBlankCheck = () => {
        if (storeName === "") {
            setSalesStoreNameMessage("필수 정보입니다")
            setSalesIsStoreName(false)
        }
    }

    // StoreName 중복검사
    const storeNameCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStoreName(e.target.value)
        const storeNameData = {
            store_name: e.target.value
        } as SellerSignUp;
        apis.sellerSignUp(storeNameData)
            .then(() => {

            })
            .catch((error) => {
                console.log(error)
                if (error.response.data.store_name == "해당 스토어이름은 이미 존재합니다.") {
                    setSalesStoreNameMessage("해당 스토어이름은 이미 존재합니다.")
                    setSalesIsStoreName(false)
                } else if (error.response.data.store_name == '이 필드는 blank일 수 없습니다.') {
                    setSalesStoreNameMessage("필수 정보입니다.")
                    setSalesIsStoreName(false)
                } else {
                    setSalesStoreNameMessage("사용 가능한 스토어 이름 입니다.")
                    setSalesIsStoreName(true)
                }

            })
    }

    // 회원가입 버튼 활성화 검사
    const buttoncheck = () => {
        if (tab === 0) {
            if (!isId || !isPw || !isPw2 || !isEmail || name === "" || phoneData === "" || !checkBox) {
                return true;
            } else {
                return false;
            }
        } else {
            if (!salesIsId || !salesIsPw || !salesIsPw2 || !salesIsEmail || !salesIsName || sellerPhoneData === "" || !salesIsBin || !salesIsStoreName || !checkBox) {
                return true;
            } else {
                return false;
            }
        }
    }

    // 동의 checkbox click 여부
    const handleCheck = () => {
        setCheckBox(!checkBox);
    }

    // 회원가입
    const handleSignUp = () => {
        if (tab === 0) {
            if (isCheck === false) {
                window.alert("아이디 중복확인을 해주세요.")
            }
            const signupData = {
                username: isCheck === true ? id : "",
                password: pw,
                password2: pw2,
                phone_number: phoneData,
                name: name,
            };
            signUpUser.mutate(signupData, {
                onSuccess: () => navigate('/login')
            })
        } else {
            if (isCheck === false) {
                window.alert("아이디 중복확인을 해주세요.")
            }
            if (isCoNumCheck === false) {
                window.alert("사업자등록번호를 인증해주세요.")
            }
            if (isCheck === false && isCoNumCheck === false) {
                window.alert("아이디 중복확인/ 사업자등록번호 인증을 완료해주세요.")
            }
            const signupData = {
                username: isCheck === true ? sellerId : "",
                password: sellerPw,
                password2: sellerPw2,
                phone_number: sellerPhoneData,
                name: sellerName,
                company_registration_number: isCoNumCheck === true ? bin : "",
                store_name: storeName,
            }
            sellerSignUpUser.mutate(signupData, {
                onSuccess: () => navigate('/login')
            })
        }
    }


    return (
        <SignUpSection>
            <h1 style={{ margin: "70px 0 50px" }} >
                <img src={Hodu} alt="Hodu Logo" onClick={() => navigate("/")} />
            </h1>
            <Tab tab={tab} setTab={setTab} children="구매회원가입" children2="판매회원가입" />
            <SignUpForm>
                {tab === 0 &&
                    <ul className='normal-form_wrap'>
                        <li className='normal-user'>
                            <div className='id-container'>
                                <Input
                                    width="246px"
                                    height="44px"
                                    label="아이디"
                                    margin="0 12px 0 0"
                                    _onChange={idCheck}
                                    _onBlur={idBlankCheck}
                                    borderColor={
                                        id.length >= 0 ? (
                                            isId ? "#21BF48" : "#EB5757"
                                        ) : ""
                                    }
                                    borderBottomColor={
                                        id.length >= 0 ? (
                                            isId ? "#21BF48" : "#EB5757"
                                        ) : ""
                                    }
                                />
                                <Button
                                    height="44px"
                                    align="end"
                                    width="122px"
                                    _onClick={dupCheck}
                                >중복확인</Button>
                            </div>
                            {id.length >= 0 && (
                                <>
                                    <Message className={`${isId ? "success" : "error"}`}>
                                        {idMessage}
                                    </Message>
                                </>
                            )}
                            <Input
                                type="password"
                                label="비밀번호"
                                height="44px"
                                _onChange={pwCheck}
                                _onBlur={pwBlankCheck}
                                borderColor={
                                    pw.length >= 0 ? (
                                        isPw ? "#21BF48" : "#EB5757"
                                    ) : ""
                                }
                                borderBottomColor={
                                    pw.length >= 0 ? (
                                        isPw ? "#21BF48" : "#EB5757"
                                    ) : ""
                                }
                            />
                            <div className='pw-check'>
                                {
                                    !isPw ?
                                        <img src={pwCheckOff} alt="" />
                                        :
                                        <img src={pwCheckOn} alt="" />
                                }
                            </div>
                            {pw.length >= 0 && (
                                <>
                                    <Message className={`${isPw ? "success" : "error"}`}>
                                        {pwMessage}
                                    </Message>
                                </>
                            )}
                            <Input
                                type="password"
                                label="비밀번호 재확인"
                                height="44px"
                                _onChange={isSamePw}
                                _onBlur={pw2BlankCheck}
                                borderColor={
                                    pw2.length >= 0 ? (
                                        isPw2 ? "#21BF48" : "#EB5757"
                                    ) : ""
                                }
                                borderBottomColor={
                                    pw2.length >= 0 ? (
                                        isPw2 ? "#21BF48" : "#EB5757"
                                    ) : ""
                                }
                            />
                            <div className='pw-check'>
                                {
                                    !isPw2 ?
                                        <img src={pwCheckOff} alt="" />
                                        :
                                        <img src={pwCheckOn} alt="" />
                                }
                            </div>
                            {pw2.length >= 0 && (
                                <>
                                    <Message className={`${isPw2 ? "success" : "error"}`}>
                                        {pw2Message}
                                    </Message>
                                </>
                            )}

                            <Input
                                label="이름"
                                height="44px"
                                _onChange={nameCheck}
                                _onBlur={nameBlankCheck}
                                borderColor={
                                    name.length === 0 ? "#EB5757" : "#21BF48"
                                }
                                borderBottomColor={
                                    name.length === 0 ? "#EB5757" : "#21BF48"
                                }
                            />
                            {name.length === 0 && (
                                <>
                                    <Message className="error">
                                        {nameMessage}
                                    </Message>
                                </>
                            )}
                            <Phone>
                                <div className='dropdown'>
                                    <Input defaultValue={phoneData1} label="휴대전화 번호" height="44px" _onBlur={phoneBlankCheck} />
                                    <img className={`${!dropdown ? "on" : "off"}`} src={arrowUp} alt="" onClick={hadnleArrow} />
                                    {dropdown === true ? <ul className="dropdown-items">
                                        <li className="dropdown-item" onClick={handleSelect} >
                                            <button className="dropdown-option">010</button>
                                        </li>
                                        <li className="dropdown-item" onClick={handleSelect}>
                                            <button className="dropdown-option" >011</button>
                                        </li>
                                        <li className="dropdown-item" onClick={handleSelect}>
                                            <button className="dropdown-option" >016</button>
                                        </li>
                                        <li className="dropdown-item" onClick={handleSelect}>
                                            <button className="dropdown-option" >017</button>
                                        </li>
                                        <li className="dropdown-item" onClick={handleSelect}>
                                            <button className="dropdown-option" >018</button>
                                        </li>
                                        <li className="dropdown-item" onClick={handleSelect}>
                                            <button className="dropdown-option" >019</button>
                                        </li>
                                    </ul> : null}
                                </div>
                                <Input height="44px" _onChange={(e) => setPhoneData2(e.target.value)} _onBlur={phoneBlankCheck} />
                                <Input height="44px" _onBlur={phoneBlankCheck} _onChange={phoneCheck} />
                            </Phone>
                            {phoneData.length >= 0 && (
                                <>
                                    <Message className={`${isPhone ? "success" : "error"}`} >
                                        {phoneMessage}
                                    </Message>
                                </>
                            )}
                            <Email>
                                <Input
                                    label="이메일"
                                    width="120px"
                                    height="44px"
                                    _onChange={emailCheck}
                                    _onBlur={emailBlankCheck}
                                    borderColor={
                                        email.length >= 0 ? (
                                            isEmail ? "#21BF48" : "#EB5757"
                                        ) : ""
                                    }
                                    borderBottomColor={
                                        email.length >= 0 ? (
                                            isEmail ? "#21BF48" : "#EB5757"
                                        ) : ""
                                    }
                                />
                                <p className='at'>@</p>
                                <Input
                                    width="120px"
                                    height="44px"
                                    _onChange={email2Check}
                                    _onBlur={emailBlankCheck}
                                    borderColor={
                                        email.length >= 0 ? (
                                            isEmail ? "#21BF48" : "#EB5757"
                                        ) : ""
                                    }
                                    borderBottomColor={
                                        email.length >= 0 ? (
                                            isEmail ? "#21BF48" : "#EB5757"
                                        ) : ""
                                    }
                                />
                            </Email>
                            {emailData.length >= 0 && (
                                <>
                                    <Message className={`${isEmail ? "success" : "error"}`} style={{ marginBottom: "15px" }}>
                                        {emailMessage}
                                    </Message>
                                </>
                            )}
                        </li>
                    </ul>
                }
                {tab === 1 &&
                    <ul className='form-wrap'>
                        <li className='sales-user'>
                            <div className='id-container'>
                                <Input
                                    width="246px"
                                    height="44px"
                                    label="아이디"
                                    margin="0 12px 0 0"
                                    _onChange={idCheck}
                                    _onBlur={idBlankCheck}
                                    borderColor={
                                        sellerId.length >= 0 ? (
                                            salesIsId ? "#21BF48" : "#EB5757"
                                        ) : ""
                                    }
                                    borderBottomColor={
                                        sellerId.length >= 0 ? (
                                            salesIsId ? "#21BF48" : "#EB5757"
                                        ) : ""
                                    }
                                />
                                <Button
                                    height="44px"
                                    align="end"
                                    width="122px"
                                    _onClick={dupCheck}
                                >중복확인</Button>
                            </div>
                            {sellerId.length >= 0 && (
                                <>
                                    <Message className={`${salesIsId ? "success" : "error"}`}>
                                        {salesIdMessage}
                                    </Message>
                                </>
                            )}
                            <Input
                                label="비밀번호"
                                type="password"
                                height="44px"
                                _onChange={pwCheck}
                                _onBlur={pwBlankCheck}
                                borderColor={
                                    sellerPw.length >= 0 ? (
                                        salesIsPw ? "#21BF48" : "#EB5757"
                                    ) : ""
                                }
                                borderBottomColor={
                                    sellerPw.length >= 0 ? (
                                        salesIsPw ? "#21BF48" : "#EB5757"
                                    ) : ""
                                }
                            />
                            <div className='pw-check'>
                                {
                                    !salesIsPw ?
                                        <img src={pwCheckOff} alt="" />
                                        :
                                        <img src={pwCheckOn} alt="" />
                                }
                            </div>
                            {sellerPw.length >= 0 && (
                                <>
                                    <Message className={`${salesIsPw ? "success" : "error"}`}>
                                        {salesPwMessage}
                                    </Message>
                                </>
                            )}
                            <Input
                                label="비밀번호 재확인"
                                type="password"
                                height="44px"
                                _onChange={isSamePw}
                                _onBlur={pw2BlankCheck}
                                borderColor={
                                    sellerPw2.length >= 0 ? (
                                        salesIsPw2 ? "#21BF48" : "#EB5757"
                                    ) : ""
                                }
                                borderBottomColor={
                                    sellerPw2.length >= 0 ? (
                                        salesIsPw2 ? "#21BF48" : "#EB5757"
                                    ) : ""
                                }
                            />
                            <div className='pw-check'>
                                {
                                    !salesIsPw2 ?
                                        <img src={pwCheckOff} alt="" />
                                        :
                                        <img src={pwCheckOn} alt="" />
                                }
                            </div>
                            {sellerPw2.length >= 0 && (
                                <>
                                    <Message className={`${salesIsPw2 ? "success" : "error"}`}>
                                        {salesPw2Message}
                                    </Message>
                                </>
                            )}
                            <Input
                                label="이름"
                                height="44px"
                                _onChange={(e) => setSellerName(e.target.value)}
                                _onBlur={nameBlankCheck}
                                borderColor={
                                    sellerName.length === 0 ? "#EB5757" : "#21BF48"
                                }
                                borderBottomColor={
                                    sellerName.length === 0 ? "#EB5757" : "#21BF48"
                                }
                            />
                            {sellerName.length === 0 && (
                                <>
                                    <Message className="error">
                                        {salesNameMessage}
                                    </Message>
                                </>
                            )}
                            <Phone>
                                <div className='dropdown'>
                                    <Input defaultValue={sellerPhoneData1} label="휴대전화 번호" height="44px" _onBlur={phoneBlankCheck} />
                                    <img className={`${!dropdown ? "on" : "off"}`} src={arrowUp} alt="" onClick={hadnleArrow} />
                                    {dropdown === true ? <ul className="dropdown-items">
                                        <li className="dropdown-item" onClick={handleSelect}>
                                            <button className="dropdown-option" >010</button>
                                        </li>
                                        <li className="dropdown-item" onClick={handleSelect}>
                                            <button className="dropdown-option" >011</button>
                                        </li>
                                        <li className="dropdown-item" onClick={handleSelect}>
                                            <button className="dropdown-option" >016</button>
                                        </li>
                                        <li className="dropdown-item" onClick={handleSelect}>
                                            <button className="dropdown-option" >017</button>
                                        </li>
                                        <li className="dropdown-item" onClick={handleSelect}>
                                            <button className="dropdown-option" >018</button>
                                        </li>
                                        <li className="dropdown-item" onClick={handleSelect}>
                                            <button className="dropdown-option" >019</button>
                                        </li>
                                    </ul> : null}
                                </div>
                                <Input height="44px" _onChange={(e) => setSellerPhoneData2(e.target.value)} _onBlur={phoneBlankCheck} />
                                <Input height="44px" _onBlur={phoneBlankCheck} _onChange={phoneCheck} />
                            </Phone>
                            {sellerPhoneData.length >= 0 && (
                                <>
                                    <Message className={`${salesIsPhone ? "success" : "error"}`} >
                                        {salesPhoneMessage}
                                    </Message>
                                </>
                            )}
                            <Email>
                                <Input
                                    label="이메일"
                                    height="44px"
                                    _onChange={emailCheck}
                                    _onBlur={emailBlankCheck}
                                    borderColor={
                                        sellerEmail.length >= 0 ? (
                                            salesIsEmail ? "#21BF48" : "#EB5757"
                                        ) : ""
                                    }
                                    borderBottomColor={
                                        sellerEmail.length >= 0 ? (
                                            salesIsEmail ? "#21BF48" : "#EB5757"
                                        ) : ""
                                    }
                                />
                                <p className='at'>@</p>
                                <Input
                                    height="44px"
                                    _onChange={email2Check}
                                    _onBlur={emailBlankCheck}
                                    borderColor={
                                        sellerEmail.length >= 0 ? (
                                            salesIsEmail ? "#21BF48" : "#EB5757"
                                        ) : ""
                                    }
                                    borderBottomColor={
                                        sellerEmail.length >= 0 ? (
                                            salesIsEmail ? "#21BF48" : "#EB5757"
                                        ) : ""
                                    }
                                />
                            </Email>
                            {sellerEmailData.length >= 0 && (
                                <>
                                    <Message className={`${salesIsEmail ? "success" : "error"}`} >
                                        {salesEmailMessage}
                                    </Message>
                                </>
                            )}
                            <div className='id-container'>
                                <Input
                                    width="246px"
                                    height="44px"
                                    label="사업자 등록번호"
                                    margin="0 12px 0 0"
                                    _onChange={binCheck}
                                    _onBlur={binBlankCheck}
                                    borderColor={
                                        bin.length >= 0 ? (
                                            salesIsBin ? "#21BF48" : "#EB5757"
                                        ) : ""
                                    }
                                    borderBottomColor={
                                        bin.length >= 0 ? (
                                            salesIsBin ? "#21BF48" : "#EB5757"
                                        ) : ""
                                    }
                                />
                                <Button
                                    height="44px"
                                    align="end"
                                    width="122px"
                                    _onClick={handleComNumCheck}
                                >인증</Button>
                            </div>
                            {bin.length >= 0 && (
                                <>
                                    <Message className={`${salesIsBin ? "success" : "error"}`}>
                                        {salesBinMessage}
                                    </Message>
                                </>
                            )}
                            <Input
                                label="스토어 이름"
                                height="44px"
                                _onChange={storeNameCheck}
                                _onBlur={storeNameBlankCheck}
                                borderColor={
                                    storeName.length >= 0 ? (
                                        salesIsStoreName ? "#21BF48" : "#EB5757"
                                    ) : ""
                                }
                                borderBottomColor={
                                    storeName.length >= 0 ? (
                                        salesIsStoreName ? "#21BF48" : "#EB5757"
                                    ) : ""
                                }
                            />
                            {storeName.length >= 0 && (
                                <>
                                    <Message className={`${salesIsStoreName ? "success" : "error"}`} >
                                        {salesStoreNameMessage}
                                    </Message>
                                </>
                            )}
                        </li>
                    </ul>
                }
            </SignUpForm>
            <label className='checkbox-label'>
                <input type="checkbox" onClick={handleCheck} />
                <p>호두샵의 이용약관 및 개인정보처리방침에 대한 내용을 확인하였고 동의합니다.</p>
            </label>
            {tab === 0 ?
                <Button width="380px" height="50px" margin="0px 0px 100px" font_size="17px" disabled={buttoncheck()} _onClick={handleSignUp}>가입하기</Button>
                :
                <Button width="380px" height="50px" margin="0px 0px 100px" font_size="17px" disabled={buttoncheck()} _onClick={handleSignUp}>가입하기</Button>
            }
        </SignUpSection>
    )
}

const SignUpSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1 {
        cursor: pointer;
    }
    .checkbox-label {
        display: flex;
        width: 380px;
        margin: 34px 0;
        input {
            align-self: baseline;
            margin-right: 10px;
        }
    }
`

const SignUpForm = styled.div`
  width: 440px;
  box-sizing: border-box;
  border: 1px solid #C4C4C4;
  border-top: none;
  .normal-form_wrap{
        padding: 40px 35px 36px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        li {
            .id-container {
              display: flex;
          }
          .pw-check {
            width: 28px;
            position: relative;
            img {
                position: absolute;
                bottom: 8px;
                left: 338px;
            }
          }
        }
    }
    .form-wrap{
        padding: 40px 35px 36px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        li {
            .id-container {
              display: flex;
          }
          .pw-check {
            width: 28px;
            position: relative;
            img {
                position: absolute;
                bottom: 8px;
                left: 338px;
            }
          }
        }
    }
    img.off{
            transform:rotate(180deg)
        }
`

const Phone = styled.div`
            display: flex;
            align-items: end;
            justify-content: center;
            label:first-child {
                margin-right: 12px;
                position: relative;
            }
            img {
                position: absolute;
                top: 58px;
                left: 88px;
                cursor: pointer;
            }
            label:last-child {
                margin-left: 12px;
            }
            .dropdown {
                display: flex;
                flex-direction: column;
                position: relative;
                .dropdown-items {
                    position: absolute;
                    z-index: 2;
                    background-color: white;
                    border: 1px solid #C4C4C4;
                    top: 100px;
                    width: 114.84px;
                    border-radius: 5px;
                    height: 100px;
                    overflow-y: scroll;
                    box-shadow: 0 2px 5px 1px rgba(64 60 67 / 16%);
                    transition: border-color 200ms ease-in, padding 200ms ease-in,max-height 200ms ease-in,box-shadow 200ms ease-in;
                    padding-top: 6px;
                    box-sizing: border-box;
            .dropdown-item {
                width: 100%;
                height: 28px;
                line-height: 25px;
                text-align: center;
                cursor:pointer;
                &:hover {
                    background-color:#E0E0E0;
                    transition: all 0.5s;
                }
            }
         }
            }
`

const Email = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    input {
        width: 100%;
    }
    .at {
        width: 18px;
        margin: 0 11px 13px 11px;
    }
`

const Message = styled.p`
  font-size: 13px;
  align-self: flex-start;
  margin-top: 10px;
  color: ${(props) => (props.className === "success" ? "#21BF48" : "#EB5757;")}
`

export default SignUp