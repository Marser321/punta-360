"use client"

import React, { useState } from 'react'
import { cn } from '@/lib/utils'

// Default fallback images for different contexts
const FALLBACK_IMAGES = {
    property: "https://images.unsplash.com/photo-1600596542815-60c37c663045?q=80&w=600",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    landscape: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800",
    service: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400",
}

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackType?: keyof typeof FALLBACK_IMAGES
    fallbackSrc?: string
}

export function SafeImage({
    src,
    alt,
    className,
    fallbackType = 'property',
    fallbackSrc,
    ...props
}: SafeImageProps) {
    const [imgSrc, setImgSrc] = useState(src || FALLBACK_IMAGES[fallbackType])
    const [hasError, setHasError] = useState(false)

    const handleError = () => {
        if (!hasError) {
            setHasError(true)
            setImgSrc(fallbackSrc || FALLBACK_IMAGES[fallbackType])
        }
    }

    return (
        <img
            src={imgSrc}
            alt={alt || "Image"}
            className={cn(className)}
            onError={handleError}
            {...props}
        />
    )
}

// Avatar variant with gradient fallback
interface SafeAvatarImageProps {
    src?: string
    alt?: string
    className?: string
    fallbackInitials?: string
}

export function SafeAvatarImage({
    src,
    alt,
    className,
    fallbackInitials = "U"
}: SafeAvatarImageProps) {
    const [hasError, setHasError] = useState(false)

    if (hasError || !src) {
        return (
            <div className={cn(
                "flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-bold",
                className
            )}>
                {fallbackInitials}
            </div>
        )
    }

    return (
        <img
            src={src}
            alt={alt || "Avatar"}
            className={cn("object-cover", className)}
            onError={() => setHasError(true)}
        />
    )
}
