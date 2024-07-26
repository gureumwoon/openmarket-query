import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface ScrollToTopProps {
    children: ReactNode;
}

export default function ScrollToTop(props: ScrollToTopProps) {
    const { pathname } = useLocation();

    useEffect(() => {
        console.log("Scrolling to top");
        window.scrollTo(0, 0);
    }, [pathname]);

    return <>{props.children}</>;
}