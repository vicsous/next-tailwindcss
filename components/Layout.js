import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';

export default function Layout ({children}){
    return(
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <main className="bg-gray-100">
                { children }
            </main>
            <Footer />
        </div>
    )
}