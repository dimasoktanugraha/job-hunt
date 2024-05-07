import { fetcher, parseCompanies } from "@/lib/utils"
import { JobType, companyType } from "@/types"
import { useCallback, useEffect, useMemo, useState } from "react"
import useSWR from "swr"

const useCompanies = (filter?: string[]) => {
    const paramsCategory = useMemo(() => {
        if(filter && filter.length >0 ){
            return filter.join(',')
        }
        return ""
    }, [filter])

    const { data, isLoading, error, mutate } = useSWR(`/api/company/filter?category=${paramsCategory}`, fetcher, { revalidateOnMount : false})

    const [ companies, setCompanies ] = useState<companyType[]>()

    const parsingCompany = useCallback(async() => {
        const parsedCompany = await parseCompanies(data, isLoading, error)
        setCompanies(parsedCompany)
    }, [data, isLoading, error])

    useEffect(() => {
        parsingCompany()
    }, [data, isLoading, error])

    return {
        companies,
        isLoading,
        mutate
    }
}

export default useCompanies