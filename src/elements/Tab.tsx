import styled from "styled-components";

interface TabProps {
    children?: string;
    children2?: string;
    setTab: (value: number) => void;
    tab: number;
}

function Tab(props: TabProps) {
    const { children, children2 } = props
    return (
        <div>
            <TabContainer>
                <li onClick={() => props.setTab(0)} >
                    <p className={props.tab === 0 ? "tab-on1" : "tab1"}>
                        {children}
                    </p>
                </li>
                <li onClick={() => props.setTab(1)}>
                    <p className={props.tab === 1 ? "tab-on2" : "tab2"}>
                        {children2}
                    </p>
                </li>
            </TabContainer>
        </div>
    )
}

const TabContainer = styled.ul`
    width: 440px;
    display: table;
    table-layout: fixed;
    box-sizing: border-box;
    border-collapse: collapse;
    li {
        display: table-cell;
        text-align: center;
        box-sizing: border-box;
        background-color: #f8f9fa;
        vertical-align: bottom;
        cursor: pointer;
        p {
            font-weight: bold;
        }
        .tab-on1 {
        background-color: #fff;
        height: 60px;
        padding-top: 17px;
        border: 1px solid #c4c4c4;
        border-bottom: 1px solid transparent;
        border-radius: 10px 10px 0 0;
    }
    .tab-on2 {
        background-color: #fff;
        height: 60px;
        padding-top: 17px;
        box-sizing: border-box;
        border: 1px solid #c4c4c4;
        border-bottom: 1px solid transparent;
        border-radius: 10px 10px 0 0;
    }
    .tab1 {
       height: 60px;
       padding-top: 17px;
       border: 1px solid #c4c4c4;
       border-radius: 10px 10px 0 0;
    }
    .tab2 {
        height: 60px;
        padding-top: 17px;
        box-sizing: border-box;
        border: 1px solid #c4c4c4;
        border-radius: 10px 10px 0 0;
    }
    }
`

export default Tab