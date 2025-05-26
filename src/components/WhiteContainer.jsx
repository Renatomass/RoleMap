export default function WhiteContainer ({children}){
    return (
        <div className="bg-white p-8 rounded-lg h-100 w-full max-w-sm shadow-xl justify-center">
            {children}
        </div>
    );
}