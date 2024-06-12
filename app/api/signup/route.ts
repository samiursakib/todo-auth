import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let message: string | undefined;
  let status: number = 200;
  try {
    const body = await req.json();
    console.log(body)
    const operationsDoc = `
      mutation InsertUser($email: String, $name: String, $password: String) {
        insert_user(objects: {email: $email, name: $name, password: $password}) {
          affected_rows
          returning {
            id
            email
            name
            password
          }
        }
      }
    `;
    const InsertUser = async () => {
      const response = await fetch(
        `https://fitting-kodiak-56.hasura.app/v1/graphql`, {
          method: 'POST',
          body: JSON.stringify({
            query: operationsDoc,
            operationName: 'InsertUser',
            variables: { 'email': body.email, 'name': body.name, 'password': body.password }
          })
        }
      );
      return response;
    };
    // const queryResult = await InsertUser();
    // console.log('###########', queryResult);
    // const user = await queryResult.json();
    message = 'Created a new user';
    status = 401;
  } catch(err) {
    message = 'Could not create new user';
    status = 409;
  } finally {
    return NextResponse.json({ message, status});
  }
}



export async function GET(req: NextRequest) {
  return NextResponse.json({ users: [{ name: 'sakib'}, { name: 'rafi' }]})
}