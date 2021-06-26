export const request = async (url, method, json = null, files = null, img_name = null) => {
    if (json || files) {
        var body = new FormData()

        Object.entries(json).forEach(([key, value]) => body.append(key, value))
        if (files) {
            for (var i = 0, numFiles = files.length; i < numFiles; i++) {
                body.append(img_name, files[i])
            }
        }

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
