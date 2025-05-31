export const generateRandomContent = (count = 5) => {
  return Array.from({ length: count }, () => {
  const id = Math.random().toString(36).substring(2, 15);
  const appUid = Math.random().toString(36).substring(2, 15);
  
  const extensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt', 'csv', 'jpg', 'png', 'zip'];
  const randomExt = extensions[Math.floor(Math.random() * extensions.length)];
  const fileName = `Random_File_${Math.floor(Math.random() * 1000)}.${randomExt}`;
  
  const createDate = new Date(Date.now() + Math.random() * (new Date('2025-12-31').getTime() - Date.now()))
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ');

  return {
    text: fileName,
    name: fileName,
    type: "File", 
    icon: `/images/documents/extension/${randomExt}.png`,
    appdocid: id,
    id: `${id}_1`,
    cls: "file",
    leaf: true,
    is_file: true,
    docVersion: 1,
    appUid: appUid,
    usrUid: "00000000000000000000000000000002",
    appDocType: "Input",
    appDocCreateDate: createDate,
    appDocPlugin: "",
    appDocTags: null,
    appDocTitle: "",
    qtip: "",
    appDocComment: "",
    appDocFileName: fileName,
    appLabel: `${Math.floor(Math.random() * 1000)} 'Random Document' (To do)`,
    proTitle: `${Math.floor(Math.random() * 10)}. Project - Document Request`,
    appDocVersionable: 0,
    owner: "guest",
    owner_firstname: "Guest",
    owner_lastname: " ",
    deletelabel: "Delete", 
    downloadLabelDOWNLOAD: "Download",
    downloadLinkDOWNLOAD: `../cases/cases_ShowDocument?a=${id}&v=1&p=1`,
    downloadLabel: "Download",
    downloadLink: `../cases/cases_ShowDocument?a=${id}&v=1&p=1`,
    downloadLabel1: "",
    downloadLink1: "",
    appDocUidVersion: `${id}_1`,
    is_readable: true,
    outDocGenerate: ""
  };
});
};