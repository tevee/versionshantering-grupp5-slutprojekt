export async function getUserData(type) {
    const url = `https://version-control-fe23-105e9-default-rtdb.europe-west1.firebasedatabase.app/${type}/.json`

    const response = await fetch(url)
    const data = await response.json();
    
    if(response.ok && data !== null) return data;
    else if(data === null) throw 'no result'
    else throw 'error'
}

export async function postUserData(type, postObj) {
    const post = {
        method: "POST",
        body: JSON.stringify(postObj),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }
    const url = `https://version-control-fe23-105e9-default-rtdb.europe-west1.firebasedatabase.app/${type}/.json`

    const response = await fetch(url, post)
    const data = await response.json()

    if(response.ok && data !== null) return data;
    else if(data === null) throw 'no result'
    else throw 'error'
}

export async function deleteUserData(type, key, property) {
    const deleteObj = {
        method: "DELETE",
        body: JSON.stringify(key),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }

    let url;
    if(property === '' || property === undefined) url = `https://version-control-fe23-105e9-default-rtdb.europe-west1.firebasedatabase.app/${type}/${key}/.json`
    else url = `https://version-control-fe23-105e9-default-rtdb.europe-west1.firebasedatabase.app/${type}/${key}/${property}/.json`

    const response = await fetch(url, deleteObj)
    const data = await response.json()

    if(response.ok) return `successfully removed ${key}`
    else throw 'error'
}