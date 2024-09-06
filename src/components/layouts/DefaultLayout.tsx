import Footer from './Footer'
import Header from './Header'

type Props = {
   children: React.ReactNode
}

const DefaultLayout = ({ children }: Props) => {
   return (
      <main className="flex size-full flex-col">
         <Header />
         <div className="size-full min-h-screen flex-1">
            <div className="w-full">{children}</div>
         </div>
         <Footer />
      </main>
   )
}

export default DefaultLayout
