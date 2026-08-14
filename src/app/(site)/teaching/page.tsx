import { redirect } from "next/navigation";

// The teaching pyramid is now the site's front door. Old /teaching links
// (shared in email, slides, and Bok guidance) still land in the right place.
export default function TeachingRedirect() {
  redirect("/");
}
