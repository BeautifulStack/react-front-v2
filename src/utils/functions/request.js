export const request = async (url, method, json = null) => {
    if (json) {
        var body = new FormData()

        Object.entries(json).forEach(([key, value]) => body.append(key, value))
    }

    const result = await fetch(url, {
        credentials: 'include',
        method: method,
        headers: {
            Accept: 'application/json',
            ...(localStorage.getItem('FAIRREPACK_TOKEN')
                ? { FAIRREPACK_TOKEN: localStorage.getItem('FAIRREPACK_TOKEN') }
                : {}),
        },
        ...(json ? { body } : {}),
    })

    return await result.json()
}
