import { useEffect, useState } from "react"

const useBuyer = email => {
    const [isBuyer, setIsBuyer] = useState(false);
    const [isBuyerLoading, setIsBuyerLoading] = useState(true);     
    useEffect(() => {
        if (email) {
            fetch(`https://lantabur-tv-buy-sell-portal-server-asadaman42.vercel.app/user/Buyer/${email}`)
                .then(res => res.json())
                .then(data => {                    
                    setIsBuyer(data.isBuyer);
                    setIsBuyerLoading(false);
                })
        }
    }, [email])
    return [isBuyer, isBuyerLoading]
}

export default useBuyer;