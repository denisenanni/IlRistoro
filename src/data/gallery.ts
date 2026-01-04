export interface GalleryImage {
  id: string;
  src: string;
  caption?: string;
}

export const galleryImages: GalleryImage[] = [
  { id: '1', src: '/gallery/fredda.jpg' },
  { id: '2', src: '/gallery/funghi.jpg' },
  { id: '3', src: '/gallery/margheritaPomodorini.jpg' },
];
