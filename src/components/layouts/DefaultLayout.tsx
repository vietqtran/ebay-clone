import Footer from './Footer'
import Header from './Header'

type Props = {
   children: React.ReactNode
}

const DefaultLayout = ({ children }: Props) => {
   return (
      <main className="size-full">
         <Header />
         <div className="size-full min-h-screen">{children}</div>
         <Footer />
      </main>
   )
}

export default DefaultLayout
