

export const shortenAddress = (address?:string) =>{
    if(!address) return null
    return `${address?.substring(0,6)}...${address?.substring(address.length -4, address.length)}`
}


export const createQueryString = (search: any, name: string, value: string) => {
    const params = new URLSearchParams(search.toString());
    params.set(name, value);

    return params.toString();
};