import { getIssueData } from "@/lib/issue";
import { getBookInfo } from "@/lib/book";
import IssueStatic from "./IssueStatic";

const DisplayIssueHistory = async ({ issues }: { issues: any[] }) => {
  if (!issues || issues.length == 0) {
    return <h2 className="mt-40 flex justify-center items-center">There is nothing to show!</h2>;
  }
  const enrichedIssues = await Promise.all(
    issues.map(async (issueId) => {
      const issueData = await getIssueData(issueId);
      if (!issueData) return null;

      const bookDetails = await getBookInfo(issueData.bookId);
      return {
        ...issueData,
        title: bookDetails?.title,
        author: bookDetails?.author,
        imageUrl: bookDetails?.imageUrl,
      };
    })
  );

  const validIssues = enrichedIssues.filter(Boolean);

  return (
    <section className="container mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {validIssues.map((data, index) => (
          <IssueStatic
            key={index}
            bookId={data?.bookId}
            imageUrl={data?.imageUrl}
            title={data?.title}
            author={data?.author}
            returnDate={new Date(data?.returnDate).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
            issueDate={new Date(data?.issueDate).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
            issueTime={new Date(data?.issueTime).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
            dueDate={new Date(data?.dueDate).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          />
        ))}
      </div>
    </section>
  );
};

export default DisplayIssueHistory;
