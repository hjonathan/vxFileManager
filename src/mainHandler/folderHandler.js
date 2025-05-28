export const expandFolderHandler = (event) => {
  const  id  = event?.id || event?.name
  
  // Generate mock folder contents based on folder ID
  const folderContents = []
  
  // Generate 5-10 random items
  const numItems = Math.floor(Math.random() * 6) + 5
  
  for (let i = 0; i < 3; i++) {
    folderContents.push({
      id: `${id}-${i}`,
      name: `${['Documents', 'Photos', 'Projects', 'Backups', 'Archives', 'Reports', 'Resources', 'Data', 'Assets', 'Temp'][Math.floor(Math.random() * 10)]} ${i + 1}`,
      type: 'folder', // 70% files, 30% folders
      total: 0, // For folders
    })
  }

  // Update total count for any folders
  folderContents.forEach((item, index) => {
    if (item.type === 'folder') {
      if(index == 1) {
        item.total = 0
      } else {
        item.total = Math.floor(Math.random() * 2) + 1 // 1-8 items
      }
    }
  })
  return folderContents
}
