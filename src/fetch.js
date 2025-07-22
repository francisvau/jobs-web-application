
const mainRoute = "https://groep35.webdev.ilabt.imec.be/"

async function fetchMain() {
    try {
        const res = await fetch(mainRoute)
        const data = await res.json()
        return data
    } catch (error) {
        console.error("Error fetching main data", error)
        throw error
    }
};

export async function fetchField(fieldName) {
    try {
        const main = await fetchMain()
        const res = await fetch(main[fieldName])
        const data = await res.json()
        return data
    } catch (error) {
        console.error(`Error fetching ${fieldName}`, error)
        throw error
    }
}

export async function addObject(fieldName, object) {
    try {
        const main = await fetchMain()
        const url = main[fieldName]
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/vnd.jobs+json'
            },
            body: JSON.stringify(object)
        })
        if (!res.ok) {
            const data = await res.json()
            alert(`Couldn't add to ${fieldName}: \n${data.message}`)
        }
    } catch (error) {
        console.error(`Error adding to ${fieldName}`, error)
        throw error
    }
}

export async function updateObject(url, object) {
    try {
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/vnd.jobs+json'
            },
            body: JSON.stringify(object)
        });
        if (!res.ok) {
            const data = await res.json()
            alert(`Couldn't edit object: \n${data.message}`)
        } else {
            alert("The object has been successfully saved")
        }
    } catch (error) {
        console.error("Error updating data")
        throw error
    }
}

export async function deleteObjectByUrl(url, setCurrentObj) {
    try {
        const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/vnd.jobs+json'
            }
        });
        if (!res.ok) {
            const data = await res.json()
            alert(`Couldn't delete object: \n${data.message}`)
        } else {
            setCurrentObj({})
        }
    } catch (error) {
        console.error("Error deleting json object", error)
        throw error
    }
}

export async function getObjectByUrl(url) {
    try {
        const res = await fetch(url)
        const data = await res.json()
        return data
    } catch (error) {
        console.error("Error fetching json object")
        throw error
    }
}

export async function setObjByUrl(url, setCurrentObj) {
    try {
        const res = await fetch(url)
        const data = await res.json()
        setCurrentObj(data)
    } catch (error) {
        console.error("Error fetching json object", error)
        throw error
    }
}
