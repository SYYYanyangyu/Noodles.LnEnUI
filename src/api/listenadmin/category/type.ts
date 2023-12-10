type Category = {
  id: string;
  name: {
    chinese: string;
    english: string;
  };
  coverUrl: string;
  path: string;
};

export type CategoryResponse = Category[];