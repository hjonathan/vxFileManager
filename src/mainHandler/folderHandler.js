import { generateRandomEntries } from './randomDataGenerator';
import { mapFolderSourceToFolderType } from './types';

export const expandHomeHandler = (event) => {
  const folderContents = generateRandomEntries(10, 0.5);
  
  const folderData = mapFolderSourceToFolderType(folderContents);

  console.log(folderData);
  
  return folderData;
};
