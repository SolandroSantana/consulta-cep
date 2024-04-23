export async function getAddress(address: string) {
    const res = await fetch(`https://viacep.com.br/ws/${address}/json/`)

    return res.json()
}