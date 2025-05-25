export default function PageWrapper ({children}) {
    return(
        <div className="min-h-screen px-4 py-8 bg-[#493971] text-white flex flex-col items-center justify-center font-pdr font-bold">
            {children}
        </div>
    )
}