export default function CheckEmailPage() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl overflow-hidden border border-purple-900/10 bg-white shadow">
        <header className="bg-gradient-to-r from-purple-900 to-purple-700 text-amber-100 px-6 py-5">
          <h1 className="text-xl font-semibold">Confirm your email</h1>
          <p className="text-amber-200/80 text-sm mt-1">
            We’ve sent a verification link to your inbox.
          </p>
        </header>

        <div className="p-6 space-y-4 text-purple-900">
          <p className="text-sm">
            Please open the email and click the link to activate your account.
            If you don’t see it, check your spam folder.
          </p>
          <ul className="text-sm list-disc pl-5 space-y-1 text-purple-900/80">
            <li>Keep this tab open — once verified, you can sign in.</li>
            <li>You used the address you entered on signup.</li>
          </ul>

          <a
            href="/login"
            className="inline-flex justify-center w-full mt-4 rounded-xl px-4 py-2.5 text-sm font-medium
                       text-white bg-gradient-to-r from-purple-900 to-purple-700 hover:opacity-95"
          >
            Back to login
          </a>
        </div>
      </div>
    </main>
  )
}
