import bgImage from '../assets/bg.svg'

export default function PageWrapper ({children}) {
    return(
        <div  style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh', }} className="min-h-screen px-4 py-8  text-white flex flex-col items-center justify-center font-pdr placeholder:font-medium focus: outline-none">
            {children}
        </div>
    )
}