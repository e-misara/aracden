import { redirect } from "next/navigation";

// /en-iyiler artık /enler'e yönlendirilir
export default function EnIyilerRedirect() {
  redirect("/enler");
}
