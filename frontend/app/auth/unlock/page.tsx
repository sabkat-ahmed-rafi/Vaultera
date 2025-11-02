import Unlock from "./Unlock";

export const dynamic = "force-dynamic"; // ensures dynamic rendering

interface PageProps {
  searchParams: { redirect?: string };
}

export default function Page({ searchParams }: PageProps) {
  // decode redirect server-side
  const redirect = searchParams.redirect ? decodeURIComponent(searchParams.redirect) : "/";

  return <Unlock redirect={redirect} />;
}
