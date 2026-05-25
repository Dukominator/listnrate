import { NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
  request: Request
) {
  const { searchParams } =
    new URL(request.url);

  const code =
    searchParams.get("code");

  if (code) {
    const {
      data: { user },
    } = await supabase.auth.exchangeCodeForSession(
      code
    );

    if (user) {
      await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          username:
            user.email?.split("@")[0],
        });
    }
  }

  return NextResponse.redirect(
    new URL(
      "/dashboard",
      request.url
    )
  );
}