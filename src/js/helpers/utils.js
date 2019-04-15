export const filterByName = (searchText, data) => {
    return data.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
};

export const updateAttribute = (list, attribute) => {
    const index = list.findIndex(item => item.id === attribute.id);
    return [
        ...list.slice(0, index),
        attribute,
        ...list.slice(index+1)
    ];
};

export const getAttribute = (list, key) => {
    const index = list.findIndex(item => item.id === key);
    return list[index];
};

export const containsAttribute = (list, key) => {
    return list.findIndex(item => item.id === key) !== -1;
};

export const addAttribute = (list, attribute) => [...list, attribute];

export const delAttribute = (list, attribute) => {
    const removedIndex = list.findIndex(item => item.id === attribute.id);
    return [
        ...list.slice(0, removedIndex),
        ...list.slice(removedIndex+1)
    ];
};

export const mapKeyToAttribute = (list, key) => {
    return list.find(item => item.id === key);
};

export const sortByName = (list) => {
    return list.sort((a, b) => a.name < b.name ? -1 : 1);
};

