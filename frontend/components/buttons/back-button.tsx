
import Link from "next/link"

export default function BackButton({to}:{to:string}) {
  return (
    <Link
      href={to}
      className="inline-flex items-center rounded-md bg-background px-3 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      prefetch={false}
    >
      <ArrowLeftIcon className="mr-2 h-4 w-4" />
      Back
    </Link>
  )
}

function ArrowLeftIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}
