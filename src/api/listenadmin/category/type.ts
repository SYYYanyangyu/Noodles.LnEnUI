type Category = {
  id: string;
  name: {
    chinese: string;
    english: string;
  };
  coverUrl: string;
};

export type CategoryResponse = Category[];