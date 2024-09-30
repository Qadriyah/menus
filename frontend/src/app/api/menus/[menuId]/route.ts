import { NextResponse } from "next/server";
import { get, patch, remove } from "@/http/fetch";
import {
  Context,
  CreateMenuResponseDto,
  GetMenuResponseDto,
} from "@/types/responses";

const baseUrl = process.env.SERVER_URL;

export async function GET(request: Request, context: Context) {
  const { params } = context;
  const url = baseUrl + `/menus/${params.menuId}`;
  const res = await get<GetMenuResponseDto>(url);

  return NextResponse.json(res);
}

export async function PATCH(request: Request, context: Context) {
  const { params } = context;
  const data = await request.json();
  const url = baseUrl + `/menus/${params.menuId}`;
  const res = await patch<CreateMenuResponseDto>(url, data);

  return NextResponse.json(res);
}

export async function DELETE(request: Request, context: Context) {
  const { params } = context;
  const url = baseUrl + `/menus/${params.menuId}`;
  const res = await remove<CreateMenuResponseDto>(url);

  return NextResponse.json(res);
}
