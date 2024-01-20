const request = {
    "url": "https://script.google.com/macros/s/AKfycbyrASzQCOKy6BhsJrJL7VCdLhlnGvJ5IWo3rOf1OrFDypA40N4NRL_v6jeVJzcIdAx-/exec",
}

const endpoints = {
    "get-json": request.url + '?exec=getJSON',
    "set-json": request.url + '?exec=setJSON',
    "get-tags": request.url + '?exec=allTags',
    "get-all-tasks": request.url + '?exec=allTasks',
    "add-task": request.url + '?exec=add',
    "delete-task": request.url + '?exec=delete',
    "update-task": request.url + '?exec=update'
}


export default endpoints;