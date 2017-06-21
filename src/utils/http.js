class HttpError extends Error {
    static fromResponse(response) {
        return new this(response.status, response.statusText)
    }

    constructor(status, statusText) {
        super(statusText)
        this.status = status
    }
}

const getJsonHeaders = (hs = {}) => {
    const headers = new Headers()

    Object.keys(hs)
        .forEach(h => {
            headers.append(h, hs[h])
        })

    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')

    return headers
}

const normalizeRequest = (request, opts) => {
    if (typeof request === 'string') {
        request = new Request(request, opts)
    } else {
        Object.assign(request, opts)
    }

    return request
}

export const http = async (request) => {
    try {
        const response = await fetch(request)

        if (!response.ok) {
            throw HttpError.fromResponse(response)
        }

        const data = await response.json()
        return data
    } catch (error) {
        throw error
    }
}

export const getJson = async (url, headers) => {
    const request = new Request(url, {
        method: 'GET',
        headers: getJsonHeaders(headers)
    })

    return await http(request)
}

export const postJson = async (url, json) => {
    const request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(json),
        headers:  getJsonHeaders()
    })

    return await http(request)
}
