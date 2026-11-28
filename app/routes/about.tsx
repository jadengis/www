import { redirect } from 'react-router'

/** /about was folded into the home page; keep old links and search results working. */
export function loader() {
  return redirect('/', 301)
}
