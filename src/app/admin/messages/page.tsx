import { deleteMessageAction, updateMessageStatusAction } from "@/app/admin/messages/actions";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminMessages, messageStatusClasses, messageStatusLabel } from "@/lib/admin-messages";

export const dynamic = "force-dynamic";

type AdminMessagesPageProps = {
  searchParams: Promise<{
    status?: string;
    saved?: string;
    error?: string;
  }>;
};

const filters = [
  { href: "/admin/messages", label: "All" },
  { href: "/admin/messages?status=new", label: "New" },
  { href: "/admin/messages?status=read", label: "Read" },
  { href: "/admin/messages?status=archived", label: "Archived" },
];

function formatDate(value?: string) {
  if (!value) {
    return "";
  }

  return new Date(value).toLocaleString("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function AdminMessagesPage({ searchParams }: AdminMessagesPageProps) {
  const params = await searchParams;
  const messages = await getAdminMessages(params.status);

  return (
    <AdminShell>
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold-dark">Messages</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-navy-deep">Contact form inbox</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Submissions from the public Contact page arrive here. Visitors never see an email
          address on the site — this inbox is the only place messages are delivered.
        </p>
      </div>

      <AdminNotice saved={params.saved} error={params.error} />

      <div className="mb-5 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <a
            key={filter.href}
            href={filter.href}
            className="rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-navy-deep transition hover:bg-gold-pale focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
          >
            {filter.label}
          </a>
        ))}
      </div>

      <div className="grid gap-4">
        {messages.map((item) => (
          <article key={item.id} className="rounded-2xl border border-line bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-bold text-navy-deep">{item.name}</p>
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${messageStatusClasses(item.status)}`}
                  >
                    {messageStatusLabel(item.status)}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted">
                  {formatDate(item.createdAt)}
                  {item.reason ? ` · ${item.reason}` : ""}
                </p>
              </div>
              <div className="text-right text-sm">
                {item.email ? <p className="font-bold text-navy-deep">{item.email}</p> : null}
                {item.phone ? <p className="text-muted">{item.phone}</p> : null}
              </div>
            </div>
            <p className="mt-4 whitespace-pre-wrap leading-7 text-muted">{item.message}</p>
            <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
              {item.status !== "read" ? (
                <form action={updateMessageStatusAction}>
                  <input type="hidden" name="id" value={item.id} />
                  <input type="hidden" name="status" value="read" />
                  <button className="rounded-lg border border-line px-3 py-2 text-xs font-bold text-navy-deep">
                    Mark as read
                  </button>
                </form>
              ) : null}
              {item.status !== "archived" ? (
                <form action={updateMessageStatusAction}>
                  <input type="hidden" name="id" value={item.id} />
                  <input type="hidden" name="status" value="archived" />
                  <button className="rounded-lg border border-line px-3 py-2 text-xs font-bold text-navy-deep">
                    Archive
                  </button>
                </form>
              ) : null}
              <form action={deleteMessageAction}>
                <input type="hidden" name="id" value={item.id} />
                <button className="rounded-lg border border-line px-3 py-2 text-xs font-bold text-red-700">
                  Delete
                </button>
              </form>
            </div>
          </article>
        ))}
        {messages.length === 0 ? (
          <p className="rounded-2xl border border-line bg-white p-8 text-center text-muted">
            No messages yet.
          </p>
        ) : null}
      </div>
    </AdminShell>
  );
}
