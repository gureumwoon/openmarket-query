import styled from "styled-components";
import plusBtn from "../assets/images/plus-icon_2.svg"
import minusBtn from "../assets/images/minus-icon_2.svg"

interface ButtonProps {
    children?: React.ReactNode;
    src?: string;
    display?: string;
    width?: string;
    height?: string;
    bg?: string;
    margin?: string;
    padding?: string;
    font_size?: string;
    font_weight?: string;
    disabled?: boolean;
    active?: boolean;
    _onClick?: React.MouseEventHandler<HTMLElement>;
    _onClickMinus?: React.MouseEventHandler<HTMLElement>;
    _onClickPlus?: React.MouseEventHandler<HTMLElement>;
    align?: string;
    seller_nav_button?: boolean;
    seller_tab_button?: boolean;
    flex_grow?: string;
    color?: string;
    border?: string;
    hover_color?: string;
    hover_border?: string;
    tab_active_button?: boolean;
    quantity_button?: boolean;
}

const Button = (props: ButtonProps) => {
    const {
        children = null,
        src,
        display,
        width = "100%",
        height,
        bg,
        margin = "0",
        padding = "0",
        font_size,
        font_weight,
        disabled = false,
        active,
        _onClick = () => { },
        _onClickMinus = () => { },
        _onClickPlus = () => { },
        align,
        seller_nav_button,
        seller_tab_button,
        flex_grow,
        color,
        border,
        hover_color,
        hover_border,
        tab_active_button,
        quantity_button,
    } = props;
    const styles = { display, width, height, margin, padding, font_size, font_weight, bg, align, flex_grow, color, border, hover_color, hover_border };
    if (seller_nav_button) {
        return (
            <SellerBtn {...styles} onClick={_onClick} >
                <img src={src} alt="shopping-bag_icon" />
                {children}
            </SellerBtn>
        )
    }
    if (seller_tab_button) {
        return (
            <SellerTabBtn {...props} {...styles} disabled={disabled}>
                {children}
                {
                    active && <p>2</p>
                }
            </SellerTabBtn>
        )
    }
    if (tab_active_button) {
        return (
            <TabBtn {...styles} {...props}>
                {children}
                <div data-testid="bottom-bar"></div>
            </TabBtn>
        )
    }
    if (quantity_button) {
        return (
            <QuantityBtn {...styles} {...props}>
                <button onClick={_onClickMinus}>
                    <img className="minus-btn" src={minusBtn} alt="minus-btn" />
                </button>
                <div>{children}</div>
                <button onClick={_onClickPlus}>
                    <img className="plus-btn" src={plusBtn} alt="plus-btn" />
                </button>
            </QuantityBtn>
        )
    }
    return (
        <Btn {...styles} {...props} onClick={_onClick}>{children}</Btn>
    )
}

const Btn = styled.button<Partial<ButtonProps>>`
    cursor: pointer;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    background-color: ${(props) => props.bg ? props.bg : props.disabled ? "#c4c4c4" : "#21BF48"};
    color:${(props) => props.color || "white"};
    border-radius: 5px;
    border: ${(props) => props.border || "none"};
    font-size: ${(props) => props.font_size};
    font-weight: ${(props) => props.font_weight};
    ${(props) => props.margin ? `margin:${props.margin};` : ""}
    ${(props) => props.padding ? `padding:${props.margin};` : ""}
    align-self: ${(props) => props.align};
    flex-grow: ${(props) => props.flex_grow};
    &:hover {
        border: ${(props) => props.hover_border};
        color: ${(props) => props.hover_color};
    }
`

const TabBtn = styled.button<Partial<ButtonProps>>`
    width: 320px;
    height: 60px;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
    color: ${(props) => props.active ? "#21BF48" : "#767676"};
    div {
        width: 100%;
        height: 6px;
        margin-top: 12px;
        background-color: ${(props) => props.active ? "#21BF48" : "#E0E0E0"};
    }
`

const SellerBtn = styled.button`
    width: 168px;
    height: 54px;
    border-radius: 5px;
    background-color: #21BF48;
    color: #ffff;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`

const SellerTabBtn = styled.button`
    width: 250px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    padding: 15px 15px 15px 20px;
    border-radius: 5px;
    margin-bottom: 10px;
    color: black;
    background-color: ${(props) => props.disabled ? "#FFFF" : "#21BF48"};
    &:hover {
        background-color: #EFFFF3;
    }
    p{
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background-color: #EB5757;
        color: #FFFF;
        line-height: 21px;
    }
`

const QuantityBtn = styled.div<Partial<ButtonProps>>`
                width: 150px;
                height: 50px;
                border: 1px solid #c4c4c4;
                display: ${(props) => props.display || "flex"};
                border-radius: 5px;
                align-items: center;
                div {
                    width: 50px;
                    height: 50px;
                    border-left: 1px solid #c4c4c4;
                    border-right:1px solid #c4c4c4;
                    text-align: center;
                    line-height: 50px;
                }
                button {
                    width: 50px;
                    .minus-btn,
                    .plus-btn {
                        width: 100%;
                    }
                }
`

export default Button;