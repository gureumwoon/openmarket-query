import styled from "styled-components";
import useInfiniteScroll from "../hooks/use-infinitescroll"
import { useEffect, useState } from "react";

export default function LazyLoadingImage({ src, alt, onError, onClick, placeholderImg }) {
    const [isLoading, setIsLoading] = useState(true);

    const target = useInfiniteScroll(handleIntersection);

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

    function handleIntersection(entries) {
        const entry = entries[0];
        if (entry.isIntersecting) {
            setIsLoading(false);
        }
    }

    return (
        <LazyImage
            className={isLoading ? 'loading' : 'loaded'}
            src={isLoading ? placeholderImg : src}
            loading="lazy"
            alt={isLoading ? "" : alt}
            onError={onError || null}
            onClick={onClick}
            ref={target}
            data-testid='lazy-image'
        />

    )
}



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