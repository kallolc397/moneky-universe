
export interface Star {
  x: number;
  y: number;
  originX: number;
  originY: number;
  targetX: number;
  targetY: number;
  size: number;
  opacity: number;
  clicked: boolean;
}

export interface StoryChapter {
  id: number;
  title: string;
  content: string;
  image: string;
}

export interface UniverseVariant {
  title: string;
  story: string;
}
