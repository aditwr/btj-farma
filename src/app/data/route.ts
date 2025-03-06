import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        success: true,
        data_btj: [
            {
                id: 1,
                name: 'BTJ 1',
                address: 'Jl. Raya Gondanglegi, Gondanglegi, Kec. Gondanglegi, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55153',
            }
        ]
    })
}