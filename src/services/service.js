const _allReposAPI = "https://api.github.com/users/kozant/repos"; 
const _repoAPI = "https://api.github.com/repos/kozant/"

export const getAllRepos = async () => {
    const res = await fetch(_allReposAPI);
    return await res.json()
}

export const getRepo = async(name) => {
    const res = await fetch(`${_repoAPI}${name}`);
    return await res.json();
}