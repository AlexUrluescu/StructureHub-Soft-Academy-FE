import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { WelcomeHero } from "@/components/WelcomeHero";
import { validateToken } from "@/lib/auth";

export default async function LandingPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (token) {
    const isValid = await validateToken(token);

    if (isValid) {
      redirect("/dashboard");
    }
  }

  return <WelcomeHero />;
}
