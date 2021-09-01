
interface Window {
  setUser: (defaultUser: {
    phone: string;
    password: string;
    categoryId: number;
    provideUserId?: number;
    provideCategoryId?: number;
  }) => void;
  getUser: () => {
    phone: string;
    password: string;
    categoryId: number;
    provideUserId?: number;
    provideCategoryId?: number;
  };
  removeUser: () => void;
}
