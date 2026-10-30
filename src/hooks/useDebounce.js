import { useEffect, useState } from "react"

const useDebounce = (value,delay)=>{
    const [debouncevalue,setDebouncevalue] = useState(value)
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebouncevalue(value)
        },delay)

        return ()=>clearTimeout(timer)
    },[value,delay])

    return debouncevalue
}

export default useDebounce