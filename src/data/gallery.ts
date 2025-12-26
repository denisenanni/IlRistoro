export interface GalleryImage {
  id: string;
  src: string;
  caption?: string;
}

export const galleryImages: GalleryImage[] = [
  { id: '1', src: '/gallery/1.jpg', caption: 'La nostra pinsa Margherita' },
  { id: '2', src: '/gallery/2.jpg', caption: 'Pinsa con prosciutto e rucola' },
  // Add more images here...
];
