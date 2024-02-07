import MoviesUtils from "../../../hooks/movie_utils";
import { NextRequest, NextResponse } from 'next/server';
import { movieTypes } from '@/types/movie';

export async function GET(request: NextRequest) {
  const searchParams: URLSearchParams = request.nextUrl.searchParams;
  const numberMovies: string = searchParams.get('numberMovies') || "4";
  const response: movieTypes[] = await MoviesUtils({ numberAllMovies: parseInt(numberMovies) });
  return NextResponse.json(response);
}