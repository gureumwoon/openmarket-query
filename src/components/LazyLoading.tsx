import styled from "styled-components";
import useInfiniteScroll from "../hooks/use-infinitescroll"
import { forwardRef, useEffect, useState } from "react";

const LazyLoadingImage = forwardRef((props: any, ref) => {
    const { src, alt, onError, onClick, placeholderImg } = props;
    const [isLoading, setIsLoading] = useState(true);

    function handleIntersection(entries: IntersectionObserverEntry[]) {
        if (entries && entries.length > 0) { // entries가 정의되고 비어 있지 않은지 확인
            const [entry] = entries;
            if (entry.isIntersecting) {
                setIsLoading(false);
            }
        }
    }

    const target = useInfiniteScroll({
        onIntersection: handleIntersection
    });

    useEffect(() => {
        const image = new Image();
        if (!isLoading) return
        image.src = src;
        image.onload = () => {
            setIsLoading(false);
        };
        image.onerror = () => {
            setIsLoading(true);
        };

        return () => {
            image.onload = null;
            image.onerror = null;
        };
    }, [src, isLoading]);

    return (
        <ImageContainer ref={target}>
            <LazyImage
                className={isLoading ? 'loading' : 'loaded'}
                src={isLoading ? placeholderImg : src}
                loading="lazy"
                alt={isLoading ? "" : alt}
                onError={onError || null}
                onClick={onClick}
                data-testid='lazy-image'
            />
        </ImageContainer>
    )
})

const ImageContainer = styled.div`
    width: 100%;
    height: 100%;
`

const LazyImage = styled.img`
    display: block;
    width: 100%;
    height: 100%;
    transition: all 0.5s;

  &.loading {
    filter: blur(10px);
    clip-path: inset(0);
  }
  &.loaded {
    filter: blur(0px);
  }
`
export default LazyLoadingImage;