import { NextResponse } from 'next/server';

import { ApiResponse, ERROR_MESSAGES } from '@/shared';

export const handleApiResponse = async <T extends ApiResponse<unknown>>(
  apiFn: () => Promise<T>,
) => {
  try {
    const apiResponse = await apiFn();
    if (apiResponse.ok) {
      return NextResponse.json({
        ok: true,
        status: apiResponse.status,
        message: apiResponse.message,
        data: apiResponse.data,
      });
    } else {
      return NextResponse.json(
        {
          ok: false,
          status: apiResponse.status,
          message: apiResponse.message,
        },
        { status: apiResponse.status },
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        ok: false,
        status: 400,
        message: error.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      },
      { status: 400 },
    );
  }
};
