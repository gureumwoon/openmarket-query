import { useCallback, useEffect, useRef } from 'react';

function useInfiniteScroll(onIntersect: IntersectionObserverCallback) {
    const ref = useRef<HTMLDivElement>(null);

    const handleIntersect = useCallback(([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        if (entry?.isIntersecting) {
            observer.unobserve(entry.target);
            onIntersect([entry], observer);
            // observer.observe(entry.target)
        }
    }, [onIntersect]);

    useEffect(() => {
        let observer: IntersectionObserver;
        if (ref.current) {
            observer = new IntersectionObserver(handleIntersect, { threshold: 0.6, });
            observer.observe(ref.current);
        }
        return () => observer && observer.disconnect();
    }, [ref, handleIntersect]);

    return ref;
}

export default useInfiniteScroll
