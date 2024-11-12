import Image from 'next/image'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

type ImageGalleryProps = {
  images: { src: string; alt: string }[]
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="aspect-w-16 aspect-h-9 relative overflow-hidden rounded-lg">
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          layout="fill"
          objectFit="cover"
          className="transition-opacity duration-500"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/80 text-gray-800"
          onClick={prevImage}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous image</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/80 text-gray-800"
          onClick={nextImage}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next image</span>
        </Button>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <span className="sr-only">Image {index + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
