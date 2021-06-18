export const request = async (url, method, json = null) => {
    if (json) {
        var body = new FormData()

        Object.entries(json).forEach(([key, value]) => body.append(key, value))
    }

    const headers = {
        Accept: 'application/json',
        ...(localStorage.getItem('FAIRREPACK_TOKEN')
            ? { token: localStorage.getItem('FAIRREPACK_TOKEN') }
            : {}),
    }


    const result = await fetch(url, {

        method: method,
        headers,
        ...(json ? { body } : {}),
    })

    return await result.json()
}
