interface Name {
  chinese: string;
  english: string;
}

type Album = {
  id: string;
  name: Name;
  categoryId: string;
}

export type AlbumResponse = Album;
