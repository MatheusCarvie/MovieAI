import { NextApiRequest, NextApiResponse } from 'next';
import MoviesUtils from "../../../hooks/movie_utils";
import { NextRequest, NextResponse } from 'next/server';
import { movieTypes } from '@/types/movie';

type MovieHandlerQuery = {
  numberMovies?: string;
}

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'GET') {
//     // Método não permitido
//     return res.status(405).end();
//   }

//   const { numberMovies = '1' } = req.query as MovieHandlerQuery;

//   try {
//     const detailedMovies = await MoviesUtils({ numberAllMovies: parseInt(numberMovies) });

//     res.status(200).json(detailedMovies);
//   } catch (error) {
//     console.error("Erro ao obter dados:", error);
//     res.status(500).json({ error: "Erro ao obter dados" });
//   }
// }

export async function GET(request: NextRequest) {
  const searchParams: URLSearchParams = request.nextUrl.searchParams;
  const numberMovies: string = searchParams.get('numberMovies') || "4";
  const response: movieTypes[] = await MoviesUtils({ numberAllMovies: parseInt(numberMovies) });
  return NextResponse.json(response);
}

// export async function GET() {
//   const res = await fetch('https://data.mongodb-api.com/...')
//   const data = await res.json()

//   return Response.json({ data })
// }