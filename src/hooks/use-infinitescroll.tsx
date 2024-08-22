import { InfiniteQueryObserverResult } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';

type IntersectionObserverProps = {
    hasNextPage?: boolean | false;
    fetchNextPage?: () => Promise<InfiniteQueryObserverResult>;
    onIntersection?: (entry: IntersectionObserverEntry[], observer: IntersectionObserver) => void;
}

function useInfiniteScroll({ hasNextPage, fetchNextPage, onIntersection }: IntersectionObserverProps) {
    const ref = useRef<HTMLDivElement>(null);

    const handleIntersect: IntersectionObserverCallback = useCallback(([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        if (onIntersection) {
            onIntersection(entry[0], observer);
        }
        if (entry?.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [fetchNextPage, hasNextPage, onIntersection]);

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
