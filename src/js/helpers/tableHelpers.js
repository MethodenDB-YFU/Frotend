export const tableHelpers = {
    filterByName
};

function filterByName(searchText, data) {
    return data.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
}
