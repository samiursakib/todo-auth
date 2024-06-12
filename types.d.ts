export type UserType = {
    id: number;
    name: string;
    email: string;
    password: string;
}

export type TodoType = {
    category_id: any;
    id: number;
    name: string;
    completed: boolean;
    userId: number;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
}

export type CategoryType = {
    id: number;
    name: string;
}

export type ColorType = 'indigo' | 'cyan' | 'orange' | 'crimson';

export type TodoProps = {
    id: number;
    name: string;
    completed: boolean;
    categoryId: number;
    color: ColorType;
    categoryName: string;
    setRefresh: Dispatch<SetStateAction<boolean>>;
  }