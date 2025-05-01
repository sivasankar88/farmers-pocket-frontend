import Navbar from "../components/Navbar"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen flex flex-col">
        <nav className="fixed top-0 left-0 right-0"><Navbar /></nav>
        <main className="flex-1 overflow-auto my-16">{children}</main>
        
    </div>
  )
}
