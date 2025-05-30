/**
 * Generates a UUID v4 string
 * @returns {string} UUID v4 string with hyphens removed
 */
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  }).replace(/-/g, '');
};


/**
 * Generates a random date within a specified range
 * @param {Date} start - Start date
 * @param {Date} end - End date
 * @returns {string} Formatted date string
 */
const getRandomDate = (start = new Date(2020, 0, 1), end = new Date()) => {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().slice(0, 19).replace('T', ' ');
};

/**
 * Generates a random folder or file entry
 * @param {boolean} isFile - Whether to generate a file or folder
 * @returns {Object} Random folder/file entry
 */
const generateRandomEntry = (isFile = false) => {
    const id = generateUUID();
    const name = `Random ${isFile ? 'File' : 'Folder'} ${Math.floor(Math.random() * 1000)}`;
    const createDate = getRandomDate();

    return {
        text: name,
        id: id,
        folderID: isFile ? generateUUID().replace(/-/g, '') : id,
        cls: isFile ? 'file' : 'folder',
        draggable: true,
        name: name,
        type: isFile ? 'File' : 'Directory',
        is_file: isFile,
        appDocCreateDate: createDate,
        qtip: `<strong>${isFile ? 'File' : 'Directory'}: </strong>${name}<br /><strong>Create Date:</strong> ${createDate}`,
        is_writable: true,
        is_chmodable: true,
        is_readable: true,
        is_deletable: true,
    };
};

/**
 * Generates an array of random entries
 * @param {number} count - Number of entries to generate
 * @param {number} fileRatio - Ratio of files to folders (0-1)
 * @returns {Array} Array of random entries
 */
const generateRandomEntries = (count = 10, fileRatio = 0.5) => {
    const entries = [];
    for (let i = 0; i < count; i++) {
        const isFile = Math.random() < fileRatio;
        entries.push(generateRandomEntry(isFile));
    }
    return entries;
};

export {
    generateRandomEntry,
    generateRandomEntries
}; 