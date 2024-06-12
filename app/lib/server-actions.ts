'use server';

export const getTodos = async () => {
  const operationsDoc = `
    query GetTodo {
      todo {
        completed
        category_id
        id
        user_id
        name
        created_at
        updated_at
      }
    }
  `;
  const result = await fetch(
    `${process.env.HASURA_PROJECT_ENDPOINT}`,
    {
      method: "POST",
      headers: {
        'x-hasura-admin-secret': `${process.env.HASURA_GRAPHQL_ADMIN_SECRET}`
      },
      body: JSON.stringify({
        query: operationsDoc,
        operationName: 'GetTodo',
        variables: {},
      }),
      next: { revalidate: 0 }
    }
  );
  if (!result.ok) {
    console.error('fetch causes an error');
  }
  const jsonData = await result.json();
  return jsonData.data.todo;
}

export const createTodoAction = async ( name: string, categoryId: number ) => {
  const operationsDoc = `
    mutation InsertTodo($category_id: Int, $user_id: Int, $name: String) {
      insert_todo(objects: {category_id: $category_id, user_id: $user_id, name: $name}) {
        affected_rows
        returning {
          completed
          category_id
          id
          user_id
          name
          created_at
          updated_at
        }
      }
    }    
  `;
  const result = await fetch(
    `${process.env.HASURA_PROJECT_ENDPOINT}`,
    {
      method: "POST",
      headers: {
        'x-hasura-admin-secret': `${process.env.HASURA_GRAPHQL_ADMIN_SECRET}`
      },
      body: JSON.stringify({
        query: operationsDoc,
        operationName: 'InsertTodo',
        variables: {
          'name': name,
          'category_id': categoryId,
          'user_id': '1',
        },
      })
    }
  );
  if (!result.ok) {
    console.error('fetch causes an error');
  }
  const jsonData = await result.json();
  return jsonData.data.insert_todo.returning[0];
};

export const updateTodoAction = async ( id: number, name: string, completed: boolean, categoryId: number ) => {
  const operationsDoc = `
    mutation UpdateTodo($id: Int, $category_id: Int, $name: String, $completed: Boolean) {
      update_todo(
        where: {id: {_eq: $id}},
        _set: {
          category_id: $category_id,
          name: $name,
          completed: $completed
        }
      ) {
        affected_rows
        returning {
          id
          name
          completed
          category_id
          user_id
          created_at
          updated_at
        }
      }
    }
  `;
  const result = await fetch(
    `${process.env.HASURA_PROJECT_ENDPOINT}`,
    {
      method: "POST",
      headers: {
        'x-hasura-admin-secret': `${process.env.HASURA_GRAPHQL_ADMIN_SECRET}`
      },
      body: JSON.stringify({
        query: operationsDoc,
        operationName: 'UpdateTodo',
        variables: {
          'id': id,
          'name': name,
          'completed': completed,
          'category_id': categoryId,
        },
      })
    }
  );
  if (!result.ok) {
    console.error('fetch causes an error');
  }
  const jsonData = await result.json();
  return jsonData.data.update_todo.returning[0];
};

export const moveToTrashTodoAction = async ( id: number ) => {
  const operationsDoc = `
    mutation moveToTrashTodo ($id: Int!) {
      delete_todo(where: {id: {_eq: $id}}) {
        affected_rows
        returning {
          id
          name
          completed
          category_id
          user_id
          created_at
          updated_at
        }
      }
    }  
  `;
  const result = await fetch(
    `${process.env.HASURA_PROJECT_ENDPOINT}`,
    {
      method: "POST",
      headers: {
        'x-hasura-admin-secret': `${process.env.HASURA_GRAPHQL_ADMIN_SECRET}`
      },
      body: JSON.stringify({
        query: operationsDoc,
        operationName: 'moveToTrashTodo',
        variables: {
          'id': id
        },
      })
    }
  );
  if (!result.ok) {
    console.error('fetch causes an error');
  }
  const jsonData = await result.json();
  return jsonData.data.delete_todo.returning[0];
};