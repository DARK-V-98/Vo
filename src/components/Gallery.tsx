'use client';
import { useState } from "react";
import { Heart, Image as ImageIcon, Plus, X } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface GalleryImage {
  id: number;
  src: string;
  caption: string;
}

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([
    { id: 1, src: "", caption: "Our first photo together" },
    { id: 2, src: "", caption: "A beautiful memory" },
    { id: 3, src: "", caption: "Love in every moment" },
    { id: 4, src: "", caption: "Forever and always" },
    { id: 5, src: "", caption: "My favorite smile" },
    { id: 6, src: "", caption: "Together is my favorite place" },
  ]);

  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const handleImageUpload = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages(images.map(img => 
          img.id === id ? { ...img, src: e.target?.result as string } : img
        ));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="py-16 md:py-24 px-4" id="gallery">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-semibold text-foreground mb-4">
            Our <span className="text-gradient italic">Memories</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every picture tells a story of our love. Click on a frame to add your favorite moments together.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="group relative aspect-square rounded-2xl overflow-hidden card-romantic animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {image.src ? (
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
              ) : (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer bg-rose-soft hover:bg-rose-medium/20 transition-colors duration-300">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(image.id, e)}
                  />
                  <div className="flex flex-col items-center gap-3 text-muted-foreground group-hover:text-primary transition-colors">
                    <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center">
                      <Plus className="w-8 h-8" />
                    </div>
                    <span className="text-sm font-medium">Add Photo</span>
                  </div>
                </label>
              )}
              
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
