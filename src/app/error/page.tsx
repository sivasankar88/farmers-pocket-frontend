interface ErrorPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function ErrorPage({ searchParams }: ErrorPageProps) {
  let code = searchParams.code as string | 500;
  let title = "Something went wrong";
  let description = "An unexpected error occurred. Please try again later.";

  if (code === "ECONNABORTED") {
    title = "Request Timed Out";
    description = "The server is taking too long to respond. Please try again.";
    code = "408";
  } else if (code === "429") {
    title = "Too Many Requests";
    description = "You’ve hit the rate limit. Please wait and try again.";
    code = "429";
  } else if (code === "500") {
    code = "500";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">{code}</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-8">{description}</p>
      </div>
    </div>
  );
}
