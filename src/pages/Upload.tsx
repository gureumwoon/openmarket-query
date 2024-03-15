import { useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import { modifyProduct, uploadProduct } from '../redux/modules/productSlice';
//components
import Nav from '../components/Nav'
import Button from '../elements/Button';
import Input from '../elements/Input';
import Footer from '../components/Footer'
//assets
import UploadIcon from "../assets/images/icon-img.svg";
import UploadBg from "../assets/images/product-basic-img.png";
//elements
import { comma, unComma } from '../elements/Comma';
import { S3Client, S3ClientConfig, PutObjectCommand } from "@aws-sdk/client-s3";

function Upload() {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const fileInput = useRef<HTMLInputElement | null>(null);
    const image = useRef(null);
    const isId = id ? true : false;
    const sellerItem = useAppSelector((state) => state.product.sellerProducts)
    const modifyItem = sellerItem.filter((s) => s.product_id === Number(id))
    const token = localStorage.getItem("token")

    const [productName, setProductName] = useState(isId ? modifyItem[0]?.product_name : "");
    const [productPrice, setProductPrice] = useState(isId ? modifyItem[0]?.price : "");
    const [attachment, setAttachment] = useState(isId ? modifyItem[0]?.image : "");
    // const [encodImage, setEncodImage] = useState("");
    const [shippingCheck, setShippingCheck] = useState(isId ? modifyItem[0]?.shipping_method === "DELIVERY" ? false : true : false);
    const [shippingFee, setShippingFee] = useState(isId ? modifyItem[0]?.shipping_fee : "");
    const [productStock, setProductStock] = useState(isId ? modifyItem[0]?.stock : "")

    const handleProductName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductName(e.target.value)
    }

    const isNumValid = (num: string) => {
        const reg = /[0-9]/g;
        const isValid = reg.test(num)
        return isValid
    }

    const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const price = e.target.value;
        if (e.target.value === "") {
            e.target.value = ""
        } else if (!isNumValid(price)) {
            e.target.value = ""
        }
        else {
            e.target.value = comma(price);
        }
        setProductPrice(unComma(price))
    }

    const selectImg = () => {
        const reader = new FileReader();
        const theFile = fileInput.current?.files?.[0];
        console.log("file이름:", theFile)
        if (theFile) {
            reader.readAsDataURL(theFile);
            reader.onloadend = (finishedEvent) => {
                const result = (finishedEvent.currentTarget as FileReader)?.result as string;
                setAttachment(result);
            };
        }
    }

    const deliveryCheck = () => {
        setShippingCheck(false)
    }

    const parcelCheck = () => {
        setShippingCheck(true)
    }

    const handleShippingFee = (e: React.ChangeEvent<HTMLInputElement>) => {
        const shippingPrice = e.target.value;
        if (e.target.value === "") {
            e.target.value = ""
        } else if (!isNumValid(shippingPrice)) {
            e.target.value = ""
        }
        else {
            e.target.value = comma(shippingPrice);
        }
        setShippingFee(unComma(shippingPrice))
    }

    const handleStock = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductStock(e.target.value)
        if (!isNumValid(e.target.value)) {
            e.target.value = ""
        }
    }

    const awsRegion = process.env.REACT_APP_REGION;
    const awsAccessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID as string;
    const awsSecretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY as string;
    const s3Bucket = process.env.REACT_APP_BUCKET_NAME;

    const s3ClientConfig: S3ClientConfig = {
        region: awsRegion,
        credentials: {
            accessKeyId: awsAccessKeyId,
            secretAccessKey: awsSecretAccessKey,
        },
    };

    const s3Client = new S3Client(s3ClientConfig);

    const handleUpload = async () => {

        try {
            const file = fileInput?.current?.files?.[0];
            const fileName = file?.name
            const formData = new FormData();
            const params = {
                Bucket: s3Bucket,
                Key: `dev/${fileName}`, // 'dev' 폴더에 업로드
                Body: file,
                ACL: 'public-read', // 이미지를 공개로 설정
                ContentType: 'image/jpeg',
            };

            await s3Client.send(new PutObjectCommand(params));

            formData.append("product_name", productName || "")
            formData.append("image", file || "");
            formData.append("price", String(productPrice))
            formData.append("shipping_method", shippingCheck ? "PARCEL" : "DELIVERY")
            formData.append("shipping_fee", String(shippingFee))
            formData.append("stock", String(productStock))
            formData.append("product_info", `${productName} 입니다.`)
            formData.append("token", token || "")
            console.log(formData)
            dispatch(uploadProduct(formData))
        } catch (error) {
            console.log('Error uploading image to S3 or uploading product information:', error);
            throw error;
        }
    }

    // const urlToFile = async (url) => {
    //     const response = await fetch(url);
    //     const data = response.blob();
    //     // const ext = url.split(".").pop()
    //     const filename = url.split("/").pop()
    //     const filename2 = filename.split("_").shift()
    //     const filename3 = filename.split(".").pop()
    //     const metadata = { type: "image/jpeg" };
    //     return new File([data], filename2 + "." + filename3, metadata);
    // }

    const handleModify = () => {

        const file = fileInput?.current?.files?.[0];
        // const file = urlToFile(attachment)
        const formData = new FormData();

        formData.append("product_name", productName || "")
        formData.append("image", file || "");
        formData.append("price", String(productPrice))
        formData.append("shipping_method", shippingCheck ? "PARCEL" : "DELIVERY")
        formData.append("shipping_fee", String(shippingFee))
        formData.append("stock", String(productStock))
        formData.append("product_info", `${productName} 입니다.`)

        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        dispatch(modifyProduct({ id: modifyItem[0]?.product_id || 0, data: formData }))
    }

    return (
        <div>
            <Nav seller_nav />
            <MainSection>
                <h1>상품등록</h1>
                <div className='section-container'>
                    <SectionOne>
                        <p className='caution-sentence'>*상품 등록 주의사항</p>
                        <div className='caution-contents'>
                            <p>- 너무 귀여운 사진은 심장이 아파올 수 있습니다.</p>
                            <p>- 유소년에게서 천자만홍이 피고 이상이 온갖 들
                                어 약동하다. 이상의 가지에 사랑의 있는가? 주며,
                                끓는 힘차게 얼음이 얼음 가치를 황금시대의 있음
                                으로써 사라지지 것이다. 이 뜨거운지라, 이상의
                                속에서 이것은 피가 보배를 황금시대의 싹이 사막
                                이다.
                            </p>
                            <p>- 자신과 우는 옷을 지혜는 아니다. 더운지라 설레
                                는 기쁘며, 위하여서, 평화스러운 광야에서 그리하
                                였는가? 소담스러운 위하여 인도하겠다는 어디 무
                                엇을 이상을 같지 따뜻한 청춘 칼이다.
                            </p>
                            <p>
                                - 가치를 그들을 예수는 찬미를 가슴이 과실이 이
                                것이다. 희망의 것이다. 보라, 풍부하게 이것은 황
                                금시대를 얼마나 인간에 돋고, 이것이다.
                            </p>
                        </div>
                    </SectionOne>
                    <SectionTwo>
                        <div className='top-container'>
                            <div style={{ position: "relative", marginRight: "40px" }}>
                                <p style={{ color: "#767676", marginBottom: "10px", lineHeight: "20.03px" }}>상품 이미지</p>
                                <img className='upload-img' src={attachment ? attachment : UploadBg} alt="업로드 할 이미지" ref={image} />
                                <label htmlFor="file-input" style={{ cursor: "pointer" }}>
                                    <input id="file-input" type="file" style={{ display: "none" }} ref={fileInput} onChange={selectImg} />
                                    <img src={UploadIcon} alt="" style={{ position: "absolute", top: "202px", left: "202px" }} />
                                </label>
                            </div>
                            <div className='container-input'>
                                <Input height="54px" label="상품명" defaultValue={productName} _maxLength="20" borderColor="#C4C4C4" borderBottomColor="#C4C4C4" _onChange={handleProductName} />
                                <p className='product-name_length'>{isId ? `${modifyItem[0]?.product_name.length}/20` : `${productName?.length}/20`}</p>
                                <Input upload_input label="판매가" defaultValue={productPrice?.toLocaleString()} children="원" _onChange={handlePrice} />
                                <p style={{ margin: "16px 0 10px 0", color: "#767676" }}>배송방법</p>
                                <Button width="220px" height="54px" bg={shippingCheck ? "#FFFF" : ""} color={shippingCheck ? "#767676" : ""} border={shippingCheck ? "1px solid #c4c4c4" : ""} hover_color={shippingCheck ? "black" : ""} hover_border={shippingCheck ? "1px solid #767676" : ""} margin="0 10px 0 0" _onClick={deliveryCheck}>택배,소포,등기</Button>
                                <Button width="220px" height="54px" bg={shippingCheck ? "" : "#FFFF"} color={shippingCheck ? "" : "#767676"} border={shippingCheck ? "" : "1px solid #c4c4c4"} hover_color={shippingCheck ? "" : "black"} hover_border={shippingCheck ? "" : "1px solid #767676"} _onClick={parcelCheck}>직접배송(화물배달)</Button>
                                <Input upload_input label="기본 배송비" defaultValue={shippingFee?.toLocaleString()} children="원" _onChange={handleShippingFee} />
                                <Input upload_input label="재고" defaultValue={productStock} children="개" _onChange={handleStock} />
                            </div>
                        </div>
                        <div className='bottom-container'>
                            <p className='product-detail'>상품 상세정보</p>
                            <div className="editor-section" >
                                <p>에디터영역</p>
                            </div>
                        </div>
                    </SectionTwo>
                </div>
                <ButtonContainer>
                    <Button width="200px" font_size="18px" height="60px" bg="#FFFF" color="#767676" border="1px solid #c4c4c4" hover_color="black" hover_border="1px solid #767676">취소</Button>
                    {
                        isId ?
                            <Button width="200px" font_size="18px" height="60px" margin="0 0 0 14px" _onClick={handleModify}>수정하기</Button> :
                            <Button width="200px" font_size="18px" height="60px" margin="0 0 0 14px" _onClick={handleUpload}>저장하기</Button>
                    }
                </ButtonContainer>
            </MainSection >
            <Footer />
        </div >
    )
}

const MainSection = styled.div`
    padding: 38px 100px 96px;
    h1 {
        font-size:36px;
    }
    .section-container {
        display: flex;
    }
`
const SectionOne = styled.div`
    margin-right: 80px;
    .caution-sentence {
        color:#EB5757;
        margin-bottom: 10px;
    }
    .caution-contents {
        width: 320px;
        padding: 20px 20px 5px 20px;
        background-color: #FFEFE8;
        display:flex;
        flex-direction: column;
        p {
            font-size: 14px;
            line-height: 18px;
            margin-bottom: 15px;
        }
    }
`

const SectionTwo = styled.div`
    .top-container {
        display: flex;
        .upload-img {
            width: 454px;
            height: 454px;
        }
        .container-input {
            position: relative;
            width: 826px;
            margin-top: -20px;
            input {
                font-size: 16px;
            }
            .product-name_length {
                position: absolute;
                top: 63px;
                right: 17px;
                font-size: 14px;
                color: #C4C4C4;
            }
            }
        }
    .bottom-container {
        .product-detail {
            margin:40px 0 10px 0;
            color: #767676;
        }
        .editor-section {
            width: 100%;
            height: 700px;
            background-color: #F2F2F2;;
            border: 1px solid #C4C4C4;
            p {
                font-size: 48px;
                color: #c4c4c4;
                text-align: center;
                margin-top: 350px;
            }
        }
    }
`
const ButtonContainer = styled.div`
    margin-top: 50px;
    display: flex;
    justify-content: flex-end;
`

export default Upload