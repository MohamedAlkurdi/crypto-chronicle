import { useEffect } from "react";

export default function ErrorFallback({ error, resetErrorBoundary }) {
    
    useEffect(()=>{
        console.log("error boundary:",error);
    },[])

    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <button onClick={resetErrorBoundary}>reset</button>
        </div>
    )
}