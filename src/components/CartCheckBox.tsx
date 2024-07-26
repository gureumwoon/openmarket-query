import styled from "styled-components";

interface CartCheckProps {
    width: string;
    margin: string;
    name: string;
    checked: boolean;
    onClick?: React.MouseEventHandler<HTMLElement>;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function CartCheckBox(props: CartCheckProps) {
    const { width, margin, name, checked, onClick, onChange } = props
    const styles = { width, margin }
    return (
        <Check {...styles}>
            <input type="checkbox" name={name} checked={checked} onClick={onClick} onChange={onChange} />
        </Check>
    )
}

const Check = styled.div<Partial<CartCheckProps>>`
    width: ${(props) => props.width};
    margin: ${(props) => props.margin};
    input[type='checkbox'] {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border:2px solid #21BF48 ;
    position: relative;
    &:checked::after {
        display: inline-block;
        content: "";
        width: 12px;
        height: 12px;
        background-color: #21BF48;
        border-radius: 50%;
        position: absolute;
        top: 2px;
        right: 2px;
    }
}
`


export default CartCheckBox