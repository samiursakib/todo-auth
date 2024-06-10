import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  // retrieve user from database
  const user = {
    name: 'sakib',
    email: 'rafisamiur@gmail.com',
    password: '12345678'
  };
  const isValidated = user && body.email === user.email && body.password === user.password;
  if(isValidated) {
    return NextResponse.json(user);
  }
  return NextResponse.json(null);
}