export interface BlogItem {
  id: number;
  title: string;
  blurb: string;
  image: string;
  content?: string;
  author: string;
  authorImage: string;
  date: string;
  category?: string;
  tags?: string[];
}
