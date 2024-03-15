import { fireEvent, render, screen } from "@testing-library/react"
import 'jest-styled-components'
import Button from "../../elements/Button"


describe('Button Element', () => {
    test('버튼이 렌더링 돼야 함', () => {
        render(<Button>button</ Button>);
        const buttonElement = screen.getByText('button');
        expect(buttonElement).toBeInTheDocument();
    });

    test('버튼 클릭 이벤트가 실행돼야 함', () => {
        const handleClick = jest.fn();
        render(<Button _onClick={handleClick}>click</Button>);
        fireEvent.click(screen.getByText('click'));
        expect(handleClick).toBeCalledTimes(1);
    });

    test('수량버튼 동작 확인', () => {
        const handleMinus = jest.fn();
        const handlePlus = jest.fn();
        render(<Button quantity_button _onClickMinus={handleMinus} _onClickPlus={handlePlus}>Quantity Button</Button>);

        const minusBtn = screen.getByAltText('minus-btn');
        const plusBtn = screen.getByAltText('plus-btn');
        const quantityBtnElement = screen.getByText('Quantity Button');

        expect(quantityBtnElement).toBeInTheDocument();

        fireEvent.click(minusBtn);
        expect(handleMinus).toHaveBeenCalledTimes(1);

        fireEvent.click(plusBtn);
        expect(handlePlus).toHaveBeenCalledTimes(1);

    });

    test('tab_active_button active가 false일 때 텍스트 색상 #767676 div bar 컬러는 #E0E0E0', () => {
        render(<Button tab_active_button active={false}>false tab active button</Button>);
        const activeBtn = screen.getByRole('button', { name: 'false tab active button' });
        const bottomBar = screen.getByTestId('bottom-bar')

        expect(activeBtn).toHaveStyle('color:#767676');
        expect(bottomBar).toHaveStyle('background-color:#E0E0E0');

    });

    test('tab_active_button active가 true일 때 텍스트,div bar 색상 #21BF48', () => {
        render(<Button tab_active_button active={true}>false tab active button</Button>);

        const activeBtn = screen.getByRole('button', { name: 'false tab active button' });
        const bottomBar = screen.getByTestId('bottom-bar')

        expect(activeBtn).toHaveStyle('color:#21BF48');
        expect(bottomBar).toHaveStyle('background-color:#21BF48');
    });

    test('disabled시 seller_tab_Button 컬러 #FFFF, hover시 컬러 #EFFFF3', () => {
        render(<Button seller_tab_button disabled>disabled seller_tab_button</Button>);

        const sellerTabBtn = screen.getByRole('button', { name: 'disabled seller_tab_button' });

        expect(sellerTabBtn).toBeDisabled();
        expect(sellerTabBtn).toHaveStyleRule('background-color: #FFFF');

        fireEvent.mouseEnter(sellerTabBtn);
        expect(sellerTabBtn).toHaveStyle('background-color: #EFFFF3');

    });

    test('seller_tab_Button 활성화시 컬러 #21BF48, hover시 컬러 #EFFFF3', () => {
        render(<Button seller_tab_button>seller_tab_button</Button>);

        const sellerTabBtn = screen.getByRole('button', { name: 'seller_tab_button' });

        expect(sellerTabBtn).toBeEnabled();
        expect(sellerTabBtn).toHaveStyleRule("background-color: #21BF48");

        fireEvent.mouseEnter(sellerTabBtn);
        expect(sellerTabBtn).toHaveStyle('background-color: #EFFFF3');

    });

    test('seller_nav_button 동작 확인', () => {
        const onClick = jest.fn();
        render(<Button seller_nav_button _onClick={onClick}>click button</Button>);
        const sellerBtn = screen.getByRole('button', { name: /click button/ });

        fireEvent.click(sellerBtn);
        expect(onClick).toHaveBeenCalledTimes(1);
    });

});