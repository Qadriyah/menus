import { get, post } from "@/http/fetch";
import { NextResponse } from "next/server";
import { CreateMenuResponseDto, GetMenusResponseDto } from "@/types/responses";

const baseUrl = process.env.SERVER_URL;

export async function GET() {
  const url = baseUrl + "/menus";
  const menus = await get<GetMenusResponseDto>(url);
  return NextResponse.json(menus);
}

export async function POST(req: Request) {
  const data = await req.json();
  const url = baseUrl + "/menus";
  const new_menu = await post<CreateMenuResponseDto>(url, data);
  return NextResponse.json(new_menu);
}
