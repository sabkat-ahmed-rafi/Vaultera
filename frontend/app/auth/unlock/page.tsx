import Unlock from "./Unlock";

export const dynamic = "force-dynamic"; 


export default function Page({ searchParams }: any) {
 
  const redirect = searchParams.redirect ? decodeURIComponent(searchParams.redirect) : "/";

  return <Unlock redirect={redirect} />;
}
