'use client';
import { useState } from "react";
import { Heart, Image as ImageIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";

interface GalleryImage {
  id: number;
  src: string;
  caption: string;
}

const initialImages: GalleryImage[] = [
  { id: 1, src: "/1.jpeg", caption: "Our first photo together" },
  { id: 2, src: "/2.jpeg", caption: "A beautiful memory" },
  { id: 3, src: "/3.jpeg", caption: "Love in every moment" },
  { id: 4, src: "/4.jpeg", caption: "Forever and always" },
  { id: 5, src: "/5.jpeg", caption: "My favorite smile" },
  { id: 6, src: "/6.jpeg", caption: "Together is my favorite place" },
  { id: 7, src: "/7.jpeg", caption: "Unforgettable times" },
  { id: 8, src: "/8.jpeg", caption: "My favorite person" },
  { id: 9, src: "/9.jpeg", caption: "Pure happiness" },
  { id: 10, src: "/10.jpeg", caption: "Love and laughter" },
];

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>(initialImages);

  return (
    <section className="py-16 md:py-24 px-4" id="gallery">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-semibold text-foreground mb-4">
            Our <span className="text-gradient italic">Memories</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every picture tells a story of our love.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="group relative aspect-square rounded-2xl overflow-hidden card-romantic animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <button className="w-full h-full">
                    <img
                      src={image.src}
                      alt={image.caption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-primary-foreground text-sm font-medium">{image.caption}</p>
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl p-0 overflow-hidden bg-card border-border">
                  <DialogHeader className="sr-only">
                    <DialogTitle>Image: {image.caption}</DialogTitle>
                    <DialogDescription>A larger view of the image from the gallery.</DialogDescription>
                  </DialogHeader>
                  <img
                    src={image.src}
                    alt={image.caption}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                  <div className="p-4 text-center">
                    <p className="text-foreground font-medium">{image.caption}</p>
                  </div>
                </DialogContent>
              </Dialog>
              
              {/* Decorative corner hearts */}
              <Heart className="absolute top-2 right-2 w-4 h-4 text-primary/40 fill-primary/40" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
