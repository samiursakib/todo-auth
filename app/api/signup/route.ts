import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let message: string | undefined;
  let statusCode: number = 200;
  try {
    const body = await req.json();
    console.log(body)
    // retrive user from database
    const user = {
      name: 'sakib',
      email: 'rafisamiur@gmail.com',
      password: '12345678'
    };
    if(user) {
      message = 'Already registered with this email';
      statusCode = 409;
    } else {
      // push to database
      message = 'New user created';
    }
  } catch(err) {
    message = 'Could not create new user';
  } finally {
    return NextResponse.json({ message, status: statusCode});
  }
}