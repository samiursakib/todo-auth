'use client';

import { useForm } from "react-hook-form";
import { createTodoAction, updateTodoAction } from "../lib/server-actions";
import { IconButton } from "@radix-ui/themes";
import { FiPlus } from "react-icons/fi";
import { Dispatch, SetStateAction } from 'react';
import { IoMdDoneAll } from "react-icons/io";
import { cn } from "../lib/utils";

const options = [
  { value: 1, label: 'Groceries' },
  { value: 2, label: 'Work' },
  { value: 3, label: 'Personal' },
  { value: 4, label: 'Finance' }
];

type FormDataType = {
  id?: number;
  name: string;
  categoryId: number;
  completed?: boolean;
}

type MutateTodoProps = {
  id?: number;
  name?: string;
  completed?: boolean;
  categoryId?: number;
  action: 'create' | 'update';
  setRefresh: Dispatch<SetStateAction<boolean>>;
  setIsInEditMode?: Dispatch<SetStateAction<boolean>>;
}

const MutateTodo = ({ id, name = '', categoryId = options[0].value, completed, action, setRefresh, setIsInEditMode }: MutateTodoProps) => {
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit
  } = useForm({
    defaultValues: {
      name,
      categoryId
    }
  });

  const {onChange, ...rest} = register('categoryId', {required: 'select one'})

  const handleSelectChange = (e: any) => {
    onChange(e);
    setValue('categoryId', e.target.value);
  }

  const onSubmit = async (formData: FormDataType) => {
    let result;
    if (action === 'update' && setIsInEditMode !== undefined) {
      result = await updateTodoAction(id!, formData.name, completed!, formData.categoryId);
      setIsInEditMode(false);
    } else {
      result = await createTodoAction(formData.name, formData.categoryId);
    }
    setRefresh(prev => !prev);
    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn(
      'w-[500px] flex justify-between',
      { 'px-2': action === 'create' }
    )}>
      <select
        {...rest}
        onChange={handleSelectChange}
      >
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      <input className='border' {...register("name", { required: true })} />
      {errors.name && <p>This field is Required</p>}
      <IconButton size='1'>{action === 'create' ? <FiPlus /> : <IoMdDoneAll />}</IconButton>
    </form>
  );
}

export default MutateTodo;