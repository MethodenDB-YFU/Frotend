export const utils = {
    filterByName,
    addAttribute,
    delAttribute,
    mapKeyToAttribute,
    sortByName,
};

const filterByName = (searchText, data) => {
    return data.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
};

const addAttribute = (list, attribute) => [...list, attribute];

const delAttribute = (list, attribute) => {
    const removedIndex = list.findIndex(item => item.id === attribute.id);
    return [
        ...list.slice(0, removedIndex),
        ...list.slice(removedIndex+1)
    ];
};

const mapKeyToAttribute = (list, key) => {
    return list.find(item => item.id === key);
};

const sortByName = (list) => {
    return list.sort((a, b) => a.name < b.name ? -1 : 1);
};

